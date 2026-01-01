import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Calendar, TrendingUp, TrendingDown, ChevronRight, X, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency, formatDate } from '@/lib/format';
import { TransactionDetailDrawer } from '@/components/modals';
import { EmptyState, LoadingSkeleton } from '@/components/common';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Transaction, Category, Account } from '@/types/api';

// Group transactions by date
const groupByDate = (transactions: Transaction[]) => {
  const groups: { [key: string]: Transaction[] } = {};
  transactions.forEach((tx) => {
    const date = tx.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(tx);
  });
  return groups;
};

// Get date range based on selection
const getDateRange = (range: string): { from?: string; to?: string } => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  switch (range) {
    case 'this-month':
      return {
        from: new Date(year, month, 1).toISOString().split('T')[0],
        to: new Date(year, month + 1, 0).toISOString().split('T')[0],
      };
    case 'last-month':
      return {
        from: new Date(year, month - 1, 1).toISOString().split('T')[0],
        to: new Date(year, month, 0).toISOString().split('T')[0],
      };
    case 'last-3-months':
      return {
        from: new Date(year, month - 2, 1).toISOString().split('T')[0],
        to: today.toISOString().split('T')[0],
      };
    default:
      return {};
  }
};

export default function Transactions() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'this-month',
    account: 'all',
    category: 'all',
    type: 'all',
  });

  // Fetch transactions from API with filters
  const { data: transactionsData, isLoading, error } = useQuery({
    queryKey: ['transactions', filters, search],
    queryFn: async () => {
      const dateRange = getDateRange(filters.dateRange);
      return api.getTransactions({
        ...dateRange,
        account_id: filters.account !== 'all' ? filters.account : undefined,
        category_id: filters.category !== 'all' ? filters.category : undefined,
        type: filters.type !== 'all' ? (filters.type === 'income' ? 'credit' : 'debit') : undefined,
        search: search || undefined,
        limit: 100,
      });
    },
  });

  // Fetch categories for filter dropdown
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });

  // Fetch accounts for filter dropdown
  const { data: accountsData } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.getAccounts(),
  });

  // Bulk categorize mutation
  const bulkCategorizeMutation = useMutation({
    mutationFn: ({ ids, categoryId }: { ids: string[]; categoryId: string }) =>
      api.bulkCategorize(ids, categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      setSelectedTransactions([]);
    },
  });

  const transactions = transactionsData?.transactions || [];
  const categories = categoriesData?.categories || [];
  const accounts = accountsData?.accounts || [];
  const grouped = groupByDate(transactions);

  const handleTransactionClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setDrawerOpen(true);
  };

  const toggleSelect = (id: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions.map((t) => t.id));
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <LoadingSkeleton variant="transaction" count={8} />
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">{transactionsData?.total || 0} transactions</p>
        </div>
        <Link href="/transactions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </Link>
      </div>

      {transactions.length === 0 && !isLoading ? (
        <EmptyState
          icon={<Receipt className="h-8 w-8" />}
          title="No transactions found"
          description="No transactions match your current filters. Try adjusting your filters or add a new transaction."
          action={
            <Link href="/transactions/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filters.dateRange} onValueChange={(v) => setFilters({ ...filters, dateRange: v })}>
                  <SelectTrigger className="w-[160px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This month</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 months</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.account} onValueChange={(v) => setFilters({ ...filters, account: v })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All accounts</SelectItem>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.category} onValueChange={(v) => setFilters({ ...filters, category: v })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="income">Income only</SelectItem>
                    <SelectItem value="expenses">Expenses only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk actions */}
          {selectedTransactions.length > 0 && (
            <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox checked={selectedTransactions.length === transactions.length} onCheckedChange={selectAll} />
                <span className="text-sm font-medium">{selectedTransactions.length} selected</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Categorize</Button>
                <Button variant="outline" size="sm">Export</Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTransactions([])}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Transactions list */}
          <div className="space-y-6">
            {Object.entries(grouped).map(([date, txs]) => (
              <div key={date}>
                <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-2 mb-3 z-10">
                  <h3 className="text-sm font-medium text-muted-foreground">{formatDate(date)}</h3>
                </div>
                <Card>
                  <CardContent className="p-0 divide-y divide-border">
                    {txs.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => handleTransactionClick(tx)}
                      >
                        <Checkbox
                          checked={selectedTransactions.includes(tx.id)}
                          onCheckedChange={() => toggleSelect(tx.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          tx.type === 'credit' ? 'bg-success/10' : 'bg-destructive/10'
                        }`}>
                          {tx.type === 'credit' ? (
                            <TrendingUp className="h-5 w-5 text-success" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{tx.merchant_name || tx.description}</p>
                          <p className="text-sm text-muted-foreground truncate">{tx.description}</p>
                        </div>
                        {tx.category_name && (
                          <Badge variant="secondary" style={{ backgroundColor: tx.category_color || '#94a3b8', color: 'white' }}>
                            {tx.category_name}
                          </Badge>
                        )}
                        <div className="text-right">
                          <p className={`font-semibold ${tx.type === 'credit' ? 'text-success' : ''}`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatCurrency(Number(tx.amount))}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Load more */}
          {transactionsData?.has_more && (
            <div className="mt-8 text-center">
              <Button variant="outline">Load more transactions</Button>
              <p className="text-sm text-muted-foreground mt-2">
                Showing {transactions.length} of {transactionsData.total} transactions
              </p>
            </div>
          )}
        </>
      )}

      {/* Transaction Detail Drawer */}
      <TransactionDetailDrawer
        transaction={selectedTx}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
