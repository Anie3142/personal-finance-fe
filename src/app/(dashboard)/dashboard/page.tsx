'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from 'react';
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
  ArrowRightLeft,
  Building2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SparklineChart, DonutChart, HorizontalBarChart, CashFlowChart } from '@/components/charts';
import { formatCurrency, formatRelativeDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/common';
import { MonoConnectModal } from '@/components/modals';
import { toast } from '@/hooks/use-toast';
import {
  useAccounts,
  useTransactions,
  useBudgets,
  useInsights,
  useNetWorth,
  useCashFlow,
  useSyncConnection,
} from '@/hooks/useApi';
import type { Transaction, Budget, Insight } from '@/types/api';

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

// Get insight icon based on severity
function getInsightIcon(severity: string) {
  switch (severity) {
    case 'warning': return '⚠️';
    case 'success': return '✅';
    default: return '💡';
  }
}

// Loading skeleton components
function DashboardSkeleton() {
  return (
    <div className="container py-6 pb-24 lg:pb-6 space-y-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      {/* Net Worth Card Skeleton */}
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-6 w-32 mt-2" />
        </CardContent>
      </Card>

      {/* Accounts Skeleton */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="min-w-[200px] shrink-0">
            <CardContent className="p-4">
              <Skeleton className="h-10 w-10 rounded-lg mb-3" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  const [monoModalOpen, setMonoModalOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  // Fetch data from API
  const { data: accountsData, isLoading: accountsLoading, error: accountsError } = useAccounts();
  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions({ limit: 10 });
  const { data: budgetsData, isLoading: budgetsLoading } = useBudgets();
  const { data: insightsData } = useInsights();
  const { data: netWorthData } = useNetWorth('6months');
  const { data: cashFlowData } = useCashFlow();
  const syncConnection = useSyncConnection();

  // Computed values
  const accounts = accountsData?.accounts || [];
  const transactions: Transaction[] = transactionsData?.transactions || [];
  const budgets: Budget[] = budgetsData?.budgets || [];
  const insights: Insight[] = (insightsData?.insights && insightsData.insights.length > 0) ? insightsData.insights : [
    // Fallback Mock Insights if API returns empty
    { id: 'mock-1', title: 'Spending Alert', message: 'You\'ve spent 80% of your dining budget.', severity: 'warning', type: 'spending', data: {}, created_at: new Date().toISOString() },
    { id: 'mock-2', title: 'Savings Goal', message: 'You\'re on track to reach your savings goal!', severity: 'success', type: 'goal', data: {}, created_at: new Date().toISOString() },
  ];

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      'food': 'bg-orange-500 text-white',
      'dining': 'bg-orange-500 text-white',
      'transportation': 'bg-blue-500 text-white',
      'entertainment': 'bg-purple-500 text-white',
      'shopping': 'bg-pink-500 text-white',
      'utilities': 'bg-yellow-500 text-white',
      'bills': 'bg-yellow-500 text-white',
      'health': 'bg-red-500 text-white',
      'healthcare': 'bg-red-500 text-white',
      'income': 'bg-green-500 text-white',
      'salary': 'bg-green-500 text-white',
      'freelance': 'bg-teal-500 text-white',
      'business': 'bg-indigo-500 text-white',
      'groceries': 'bg-emerald-500 text-white',
      'personal': 'bg-violet-500 text-white',
      'investment': 'bg-cyan-500 text-white',
      'education': 'bg-amber-500 text-white',
    };
    return map[category?.toLowerCase()] || 'bg-muted text-foreground';
  };

  const getBankColor = (name: string) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('access')) return 'bg-[#FF7A00] text-white';
    if (n.includes('gtb') || n.includes('guaranty')) return 'bg-[#DD4F05] text-white';
    if (n.includes('zenith')) return 'bg-[#CC0000] text-white';
    if (n.includes('u ba') || n.includes('uba')) return 'bg-[#D32E12] text-white';
    if (n.includes('first') || n.includes('firstbank')) return 'bg-[#003B65] text-white';
    if (n.includes('kuda')) return 'bg-[#40196D] text-white';
    if (n.includes('opay')) return 'bg-[#00B46A] text-white';
    if (n.includes('palmpay')) return 'bg-[#6C3BC9] text-white';
    if (n.includes('stanbic')) return 'bg-[#0032A0] text-white';
    return 'bg-primary text-white';
  };

  // Calculate totals
  const totalBalance = useMemo(() =>
    accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0),
    [accounts]
  );

  const totalBudgetSpent = useMemo(() =>
    budgets.reduce((sum, b) => sum + (b.spent || 0), 0),
    [budgets]
  );

  const totalBudgetLimit = useMemo(() =>
    budgets.reduce((sum, b) => sum + (b.amount || 0), 0),
    [budgets]
  );

  // Category spending breakdown from budgets
  const categorySpending = useMemo(() => {
    const colors = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return budgets.slice(0, 5).map((b, i) => ({
      name: b.category_name || 'Uncategorized',
      value: b.spent || 0,
      color: colors[i % colors.length],
    }));
  }, [budgets]);

  // Net worth sparkline data
  const netWorthSparkline = useMemo(() => {
    if (netWorthData?.data_points && netWorthData.data_points.length > 0) {
      return netWorthData.data_points.map(d => ({ value: d.net_worth }));
    }
    // Fallback to single point
    return [{ value: totalBalance }];
  }, [netWorthData, totalBalance]);

  // Cash flow data from API
  const cashFlowChartData = useMemo(() => {
    if (cashFlowData?.cash_flow && cashFlowData.cash_flow.length > 0) {
      return cashFlowData.cash_flow;
    }
    // Fallback to empty data
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    return months.map(month => ({
      month,
      income: 0,
      expenses: 0,
    }));
  }, [cashFlowData]);

  const daysRemaining = useMemo(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return endOfMonth.getDate() - now.getDate();
  }, []);

  const visibleInsights = insights.filter(i => !dismissedInsights.includes(i.id));

  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id]);
  };

  const handleSyncAll = async () => {
    toast({
      title: 'Syncing all accounts',
      description: 'Your accounts will be synced in the background.',
    });
    // Sync each connected account
    for (const account of accounts) {
      if (account.connection_id) {
        try {
          await syncConnection.mutateAsync(account.connection_id);
        } catch (error) {
          console.error('Error syncing account:', error);
        }
      }
    }
  };

  // Loading state
  const isLoading = accountsLoading || transactionsLoading || budgetsLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  // Error state
  if (accountsError) {
    return (
      <div className="container py-6 pb-24 lg:pb-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">Error loading dashboard</h3>
              <p className="text-sm text-muted-foreground">
                {accountsError instanceof Error ? accountsError.message : 'Failed to load data'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  // Empty state when no accounts connected
  if (accounts.length === 0) {
    return (
      <div className="container py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{greeting}! 👋</h1>
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
              <p className="text-sm text-muted-foreground">Create budgets and get alerts when you&apos;re overspending</p>
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
        <h1 className="text-2xl font-bold">{greeting}! 👋</h1>
        <p className="text-muted-foreground">Here&apos;s your financial overview</p>
      </div>

      {/* Net Worth Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
              <p className="text-4xl font-bold tracking-tight">{formatCurrency(netWorthData?.current_net_worth || totalBalance)}</p>
              {netWorthData?.change_percent !== undefined && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className={cn(
                    "border-0",
                    netWorthData.change_percent >= 0 ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                  )}>
                    <TrendingUp className={cn("h-3 w-3 mr-1", netWorthData.change_percent < 0 && "rotate-180")} />
                    {netWorthData.change_percent >= 0 ? '+' : ''}{netWorthData.change_percent.toFixed(1)}%
                  </Badge>
                  <span className="text-xs text-muted-foreground">this month</span>
                </div>
              )}
            </div>
            <div className="w-full lg:w-48 h-12">
              {netWorthSparkline.length > 1 && <SparklineChart data={netWorthSparkline} />}
            </div>
          </div>
          <Link href="/reports/net-worth" className="inline-flex items-center text-sm text-primary mt-4 hover:underline">
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
            {accounts.map((account) => (
              <Card key={account.id} className="min-w-[200px] shrink-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-sm",
                      getBankColor(account.name)
                    )}>
                      {account.name?.substring(0, 2).toUpperCase() || 'AC'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{account.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(account.balance || 0)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {account.last_synced_at ? formatRelativeDate(new Date(account.last_synced_at)) : 'Not synced'}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6"
                      onClick={() => account.connection_id && syncConnection.mutate(account.connection_id)}
                    >
                      <RefreshCw className={cn("h-3 w-3", syncConnection.isPending && "animate-spin")} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="min-w-[200px] shrink-0 border-dashed flex items-center justify-center">
              <button
                onClick={() => setMonoModalOpen(true)}
                className="flex flex-col items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-8 w-8" />
                <span className="text-sm font-medium">Connect Bank</span>
              </button>
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
            <div className="flex items-center gap-6">
              <DonutChart value={totalBudgetSpent} total={totalBudgetLimit || 1} />
              <div className="flex-1">
                <p className="text-2xl font-bold">{formatCurrency(totalBudgetSpent)}</p>
                <p className="text-sm text-muted-foreground">
                  of {formatCurrency(totalBudgetLimit)} budgeted
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className={cn(
                    totalBudgetSpent <= totalBudgetLimit ? "text-success border-success/30" : "text-destructive border-destructive/30"
                  )}>
                    {totalBudgetSpent <= totalBudgetLimit
                      ? `${formatCurrency(totalBudgetLimit - totalBudgetSpent)} remaining`
                      : `${formatCurrency(totalBudgetSpent - totalBudgetLimit)} over budget`
                    }
                  </Badge>
                  <span className="text-xs text-muted-foreground">{daysRemaining} days left</span>
                </div>
              </div>
            </div>
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
            {categorySpending.length > 0 ? (
              <HorizontalBarChart data={categorySpending} height={160} />
            ) : (
              <div className="h-40 flex items-center justify-center text-muted-foreground">
                No spending data yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget Health Cards */}
      {budgets.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Budget Health</h2>
            <Link href="/budgets" className="text-sm text-primary hover:underline flex items-center">
              Manage <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {budgets.slice(0, 6).map((budget) => {
              const spent = budget.spent || 0;
              const limit = budget.amount || 1;
              const percentage = Math.min((spent / limit) * 100, 100);
              const { color, status } = getBudgetStatus(spent, limit);
              const isOver = spent > limit;

              return (
                <Card key={budget.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{budget.category_icon || '📊'}</span>
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
                        {formatCurrency(spent)} / {formatCurrency(limit)}
                      </span>
                      <span className={cn(
                        'font-medium',
                        isOver ? 'text-purple-400' : 'text-success'
                      )}>
                        {isOver ? `+${formatCurrency(spent - limit)}` : formatCurrency(limit - spent)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

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
          {transactions.length > 0 ? (
            <div className="divide-y">
              {transactions.slice(0, 7).map((tx: Transaction) => {
                const isDebit = tx.type === 'debit' || tx.amount < 0;
                return (
                  <div key={tx.id} className="flex items-center gap-4 px-6 py-3 hover:bg-muted/50 transition-colors">
                    <div className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full shrink-0 bg-muted/50'
                    )}>
                      {isDebit ? (
                        <ArrowDownRight className="h-5 w-5 text-destructive" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{tx.description || tx.merchant_name || 'Transaction'}</p>
                      {tx.category_name && (
                        <div className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full mt-1 w-fit font-medium",
                          getCategoryColor(tx.category_name)
                        )}>
                          {tx.category_name}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        'font-semibold',
                        isDebit ? 'text-destructive' : 'text-success'
                      )}>
                        {isDebit ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.date ? formatRelativeDate(new Date(tx.date)) : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No transactions yet
            </div>
          )}
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
            <div className="flex gap-4 pb-4">
              {visibleInsights.map((insight) => (
                <Card key={insight.id} className={cn(
                  'min-w-[280px] w-[320px] shrink-0',
                  insight.severity === 'warning' && 'border-warning/30 bg-warning/5',
                  insight.severity === 'success' && 'border-success/30 bg-success/5'
                )}>
                  <CardContent className="p-4 relative">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                      onClick={() => dismissInsight(insight.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {insight.severity === 'warning' ? '⚠️' : insight.severity === 'success' ? '🎯' : '💡'}
                        </span>
                        <h3 className="font-semibold whitespace-normal">{insight.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-normal pr-4">{insight.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div >
      )
      }

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
        }}
      />
    </div >
  );
}
