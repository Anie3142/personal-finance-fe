import { useState, useEffect } from 'react';
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

// Sample transactions data
const transactionsData: {
  id: string;
  merchant: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  category: string;
  categoryColor: string;
}[] = [
  { id: '1', merchant: 'Shoprite Ikeja', description: 'Groceries', amount: 15000, type: 'debit', date: '2024-01-05', category: 'Food & Dining', categoryColor: 'bg-orange-500' },
  { id: '2', merchant: 'Salary - Tech Corp', description: 'January Salary', amount: 650000, type: 'credit', date: '2024-01-05', category: 'Salary', categoryColor: 'bg-green-500' },
  { id: '3', merchant: 'Uber', description: 'Trip to Lekki', amount: 3500, type: 'debit', date: '2024-01-04', category: 'Transportation', categoryColor: 'bg-blue-500' },
  { id: '4', merchant: 'Netflix', description: 'Monthly subscription', amount: 4400, type: 'debit', date: '2024-01-04', category: 'Entertainment', categoryColor: 'bg-purple-500' },
  { id: '5', merchant: 'PHCN', description: 'Electricity bill', amount: 12000, type: 'debit', date: '2024-01-03', category: 'Bills & Utilities', categoryColor: 'bg-yellow-500' },
  { id: '6', merchant: 'Chicken Republic', description: 'Lunch', amount: 4500, type: 'debit', date: '2024-01-03', category: 'Food & Dining', categoryColor: 'bg-orange-500' },
  { id: '7', merchant: 'POS Withdrawal', description: 'Cash withdrawal', amount: 50000, type: 'debit', date: '2024-01-02', category: 'Cash', categoryColor: 'bg-gray-500' },
  { id: '8', merchant: 'MTN Airtime', description: 'Data bundle', amount: 5000, type: 'debit', date: '2024-01-02', category: 'Bills & Utilities', categoryColor: 'bg-yellow-500' },
  { id: '9', merchant: 'Jumia', description: 'Electronics', amount: 45000, type: 'debit', date: '2024-01-01', category: 'Shopping', categoryColor: 'bg-pink-500' },
  { id: '10', merchant: 'Freelance Payment', description: 'Web design project', amount: 150000, type: 'credit', date: '2024-01-01', category: 'Freelance', categoryColor: 'bg-green-500' },
];

// Group transactions by date
const groupByDate = (transactions: typeof transactionsData) => {
  const groups: { [key: string]: typeof transactionsData } = {};
  transactions.forEach((tx) => {
    const date = tx.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(tx);
  });
  return groups;
};

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [selectedTx, setSelectedTx] = useState<typeof transactionsData[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: 'this-month',
    account: 'all',
    category: 'all',
    type: 'all',
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // For demo purposes - toggle this to see empty state
  const showEmptyState = false;
  const transactions = showEmptyState ? [] : transactionsData;

  const grouped = groupByDate(transactions);

  const handleTransactionClick = (tx: typeof transactionsData[0]) => {
    setSelectedTx(tx);
    setDrawerOpen(true);
  };

  const toggleSelect = (id: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedTransactions.length === transactionsData.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactionsData.map((t) => t.id));
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
          <p className="text-muted-foreground">{transactions.length} transactions</p>
        </div>
        <Link href="/transactions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </Link>
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          icon={<Receipt className="h-8 w-8" />}
          title="No transactions yet"
          description="Your transactions will appear here once you connect a bank or add them manually."
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
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.account} onValueChange={(v) => setFilters({ ...filters, account: v })}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                <SelectItem value="gtbank">GTBank Savings</SelectItem>
                <SelectItem value="access">Access Current</SelectItem>
                <SelectItem value="zenith">Zenith Salary</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={(v) => setFilters({ ...filters, category: v })}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="bills">Bills & Utilities</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
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
            <Checkbox checked={selectedTransactions.length === transactionsData.length} onCheckedChange={selectAll} />
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
        {Object.entries(grouped).map(([date, transactions]) => (
          <div key={date}>
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm py-2 mb-3 z-10">
              <h3 className="text-sm font-medium text-muted-foreground">{formatDate(date)}</h3>
            </div>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {transactions.map((tx) => (
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
                      <p className="font-medium truncate">{tx.merchant}</p>
                      <p className="text-sm text-muted-foreground truncate">{tx.description}</p>
                    </div>
                    <Badge variant="secondary" className={`${tx.categoryColor} text-white`}>
                      {tx.category}
                    </Badge>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.type === 'credit' ? 'text-success' : ''}`}>
                        {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
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
      <div className="mt-8 text-center">
        <Button variant="outline">Load more transactions</Button>
        <p className="text-sm text-muted-foreground mt-2">Showing 1-10 of 1,234 transactions</p>
      </div>
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
