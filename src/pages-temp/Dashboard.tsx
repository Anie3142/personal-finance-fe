import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Wallet,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Lightbulb,
  X,
  CreditCard,
  ArrowRightLeft,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SparklineChart, DonutChart, HorizontalBarChart, CashFlowChart } from '@/components/charts';
import { formatCurrency, formatRelativeDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { EmptyState, LoadingSkeleton } from '@/components/common';
import { MonoConnectModal } from '@/components/modals';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Budget, CategorySpending } from '@/types/api';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getBudgetStatus(spent: number, limit: number) {
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return { color: 'bg-purple-500', status: 'Over' };
  if (percentage >= 90) return { color: 'bg-destructive', status: 'Critical' };
  if (percentage >= 70) return { color: 'bg-warning', status: 'Warning' };
  return { color: 'bg-success', status: 'On Track' };
}

function getAccountColor(index: number) {
  const colors = ['bg-orange-500', 'bg-blue-500', 'bg-red-500', 'bg-emerald-500', 'bg-purple-500'];
  return colors[index % colors.length];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export default function Dashboard() {
  const router = useRouter();
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  const [monoModalOpen, setMonoModalOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  // Queries
  const { data: accountsData, isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.getAccounts(),
  });

  const { data: netWorthData, isLoading: netWorthLoading } = useQuery({
    queryKey: ['net-worth'],
    queryFn: () => api.getNetWorth(),
  });

  const { data: cashFlowData, isLoading: cashFlowLoading } = useQuery({
    queryKey: ['cash-flow', 'monthly'],
    queryFn: () => api.getCashFlow('monthly'),
  });

  const { data: budgetsData, isLoading: budgetsLoading } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => api.getBudgets(),
  });

  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ['recent-transactions'],
    queryFn: () => api.getTransactions({ limit: 7 }),
  });

  const { data: insightsData, isLoading: insightsLoading } = useQuery({
    queryKey: ['insights'],
    queryFn: () => api.getInsights(),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  })

  const { data: monthlyReport } = useQuery({
    queryKey: ['monthly-report'],
    queryFn: () => {
      const now = new Date();
      return api.getMonthlyReport(now.getFullYear(), now.getMonth() + 1);
    }
  });

  const accounts = accountsData?.accounts || [];
  const budgets = budgetsData?.budgets || [];
  const transactions = transactionsData?.transactions || [];
  const insights = insightsData?.insights || [];

  const visibleInsights = insights.filter(i => !dismissedInsights.includes(i.id));

  // Calculating total budget metrics
  const totalBudget = budgets.reduce((acc, b) => acc + Number(b.amount), 0);
  const totalSpent = budgets.reduce((acc, b) => acc + Number(b.spent || 0), 0);

  // Calculate days remaining in month
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysRemaining = endOfMonth.getDate() - today.getDate();

  const handleSyncAll = () => {
    toast({
      title: 'Syncing all accounts',
      description: 'Your accounts will be synced in the background.',
    });
    // Trigger sync for all accounts logic here (or via API)
  };

  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id]);
    // Optional: Call API to dismiss
    api.dismissInsight(id);
  };

  // Loading State
  if (accountsLoading || netWorthLoading) { // Critical data loading
    return (
      <div className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{getGreeting()}! 👋</h1>
          <p className="text-muted-foreground">Loading your financial overview...</p>
        </div>
        <LoadingSkeleton variant="card" count={3} />
      </div>
    )
  }

  // Value Processing for Charts
  const sparklineData = netWorthData?.data_points?.map(p => ({ value: p.net_worth })) || [];
  const cashFlowChartData = cashFlowData?.cash_flow || [];

  // Category Spending for Bar Chart
  // We can use monthlyReport data if available, or derive from budgets/transactions
  const categorySpendingData = monthlyReport?.spending_by_category?.map(c => ({
    name: c.category_name,
    value: c.amount,
    color: c.category_color
  })).slice(0, 5) || [];


  // Empty state when no accounts connected
  if (accounts.length === 0 && !accountsLoading) {
    return (
      <div className="container py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{getGreeting()}! 👋</h1>
          <p className="text-muted-foreground">Welcome to NairaTrack</p>
        </div>

        <Card className="mb-6 bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
          <CardContent className="py-12">
            <EmptyState
              icon={<Building2 className="h-8 w-8" />}
              title="Connect your first bank to get started"
              description="Link your Nigerian bank account to automatically sync transactions and start tracking your money."
              action={
                <Button onClick={() => setMonoModalOpen(true)} size="lg" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Bank
                </Button>
              }
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <Wallet className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-medium mb-1">Track Spending</h3>
              <p className="text-sm text-muted-foreground">See where your money goes with automatic categorization</p>
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-medium mb-1">Set Budgets</h3>
              <p className="text-sm text-muted-foreground">Create budgets and get alerts when you're overspending</p>
            </CardContent>
          </Card>
          <Card className="border-dashed">
            <CardContent className="p-6 text-center">
              <Lightbulb className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-medium mb-1">Get Insights</h3>
              <p className="text-sm text-muted-foreground">Receive personalized tips to improve your finances</p>
            </CardContent>
          </Card>
        </div>

        <MonoConnectModal
          open={monoModalOpen}
          onOpenChange={setMonoModalOpen}
          onSuccess={() => {
            setMonoModalOpen(false);
            toast({ title: 'Bank connected successfully!' });
          }}
        />
      </div>
    );
  }

  return (
    <div className="container py-6 pb-24 lg:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{getGreeting()}! 👋</h1>
        <p className="text-muted-foreground">Here's your financial overview</p>
      </div>

      {/* Net Worth Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
              <p className="text-4xl font-bold tracking-tight">
                {formatCurrency(netWorthData?.current_net_worth || 0)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className={cn(
                  "border-0",
                  (netWorthData?.change_percent || 0) >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                )}>
                  {(netWorthData?.change_percent || 0) >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                  {netWorthData?.change_percent}%
                </Badge>
                <span className="text-xs text-muted-foreground">this month</span>
              </div>
            </div>
            <div className="w-full lg:w-48 h-12">
              <SparklineChart data={sparklineData} color="#10b981" />
            </div>
          </div>
          <Link href="/reports" className="inline-flex items-center text-sm text-primary mt-4 hover:underline">
            View Net Worth Details <ChevronRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Account Summary - Horizontal Scroll */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Accounts</h2>
          <Link href="/accounts" className="text-sm text-primary hover:underline flex items-center">
            View all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-2">
            {accounts.map((account, index) => (
              <Card key={account.id} className="min-w-[200px] shrink-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold text-sm', getAccountColor(index))}>
                      {getInitials(account.name)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{account.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(account.balance)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeDate(new Date(account.last_synced_at))}
                    </span>
                    <Button size="icon" variant="ghost" className="h-6 w-6">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="min-w-[200px] shrink-0 border-dashed flex items-center justify-center">
              <Link href="/accounts" className="flex flex-col items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors">
                <Plus className="h-8 w-8" />
                <span className="text-sm font-medium">Connect Bank</span>
              </Link>
            </Card>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Spending & Categories Row */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Spending Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Spending This Month</CardTitle>
          </CardHeader>
          <CardContent>
            {totalBudget > 0 ? (
              <div className="flex items-center gap-6">
                <DonutChart value={totalSpent} total={totalBudget} />
                <div className="flex-1">
                  <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                  <p className="text-sm text-muted-foreground">of {formatCurrency(totalBudget)} budgeted</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className={cn(
                      totalBudget - totalSpent < 0 ? "text-destructive border-destructive/30" : "text-success border-success/30"
                    )}>
                      {formatCurrency(Math.abs(totalBudget - totalSpent))} {totalBudget - totalSpent < 0 ? 'over' : 'remaining'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{daysRemaining} days left</span>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No Budget Set"
                description="Create a budget to track your spending"
                icon={<Wallet className="h-8 w-8 text-muted-foreground" />}
                action={<Link href="/budgets"><Button variant="outline" size="sm">Set Budget</Button></Link>}
              />
            )}
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Top Categories</CardTitle>
              <Link href="/categories" className="text-sm text-primary hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent>
            {categorySpendingData.length > 0 ? (
              <HorizontalBarChart data={categorySpendingData} height={160} />
            ) : (
              <p className="text-center text-muted-foreground py-8">No spending data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Health Cards */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Budget Health</h2>
          <Link href="/budgets" className="text-sm text-primary hover:underline flex items-center">
            Manage <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.slice(0, 3).map((budget) => { // Show top 3 budgets
            const percentage = Math.min((budget.spent / budget.amount) * 100, 100);
            const { color, status } = getBudgetStatus(budget.spent, budget.amount);
            const isOver = budget.spent > budget.amount;

            return (
              <Card key={budget.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push('/budgets')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{budget.category_icon || '💰'}</span>
                      <span className="font-medium">{budget.category_name}</span>
                    </div>
                    <Badge variant="outline" className={cn(
                      'text-xs',
                      isOver ? 'text-purple-400 border-purple-400/30' : ''
                    )}>
                      {status}
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-2 mb-2" indicatorClassName={color} />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                    </span>
                    <span className={cn(
                      'font-medium',
                      isOver ? 'text-purple-400' : 'text-success'
                    )}>
                      {isOver ? `+${formatCurrency(budget.spent - budget.amount)}` : formatCurrency(budget.amount - budget.spent)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {budgets.length === 0 && (
            <Card className="col-span-full border-dashed p-6 text-center">
              <p className="text-muted-foreground">No budgets set</p>
              <Link href="/budgets"><Button variant="link">Create a budget</Button></Link>
            </Card>
          )}
        </div>
      </div>

      {/* Cash Flow Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Cash Flow</CardTitle>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success" /> Income
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-destructive" /> Expenses
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CashFlowChart data={cashFlowChartData} />
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
            <Link href="/transactions" className="text-sm text-primary hover:underline">View all</Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-6 py-3 hover:bg-muted/50 transition-colors">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  tx.type === 'debit' ? 'bg-destructive/10' : 'bg-success/10'
                )}>
                  {tx.type === 'debit' ? (
                    <ArrowDownRight className="h-5 w-5 text-destructive" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{tx.merchant_name || tx.description}</p>
                  <Badge variant="secondary" className={cn('text-xs mt-1 text-white')} style={{ backgroundColor: tx.category_color || '#999' }}>
                    {tx.category_name || 'Uncategorized'}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'font-semibold',
                    tx.type === 'debit' ? 'text-destructive' : 'text-success'
                  )}>
                    {tx.type === 'debit' ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatRelativeDate(new Date(tx.date))}</p>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="p-6 text-center text-muted-foreground">No recent transactions</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Insights Carousel */}
      {visibleInsights.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Insights</h2>
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-2">
              {visibleInsights.map((insight) => (
                <Card key={insight.id} className={cn(
                  'min-w-[280px] shrink-0',
                  insight.severity === 'warning' && 'border-warning/30 bg-warning/5',
                  insight.severity === 'success' && 'border-success/30 bg-success/5',
                  insight.severity === 'info' && 'border-primary/30 bg-primary/5'
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{insight.type === 'budget' ? '⚠️' : '📈'}</span>
                      <div>
                        <p className="font-semibold text-sm mb-1">{insight.title}</p>
                        <p className="text-xs flex-1 whitespace-normal text-muted-foreground">{insight.message}</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 shrink-0"
                        onClick={() => dismissInsight(insight.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}

      {/* Mobile FAB with Action Menu */}
      <div className="fixed bottom-20 right-4 lg:hidden">
        <DropdownMenu open={fabOpen} onOpenChange={setFabOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="lg" className="h-14 w-14 rounded-full shadow-lg">
              <Plus className={cn("h-6 w-6 transition-transform", fabOpen && "rotate-45")} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-48 mb-2">
            <DropdownMenuItem onClick={() => router.push('/transactions/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/transactions/new?type=transfer')}>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transfer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSyncAll}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <MonoConnectModal
        open={monoModalOpen}
        onOpenChange={setMonoModalOpen}
        onSuccess={() => {
          setMonoModalOpen(false);
          toast({ title: 'Bank connected successfully!' });
          // Invalidate queries
          api.getAccounts().then(() => { });
        }}
      />
    </div>
  );
}
