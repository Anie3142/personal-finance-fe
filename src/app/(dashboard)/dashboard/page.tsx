
'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
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
import { EmptyState } from '@/components/common';
import { MonoConnectModal } from '@/components/modals';
import { toast } from '@/hooks/use-toast';

// Sample Data
const netWorthData = Array.from({ length: 30 }, (_, i) => ({
  value: 2200000 + Math.random() * 300000 + i * 8000,
}));

const accounts = [
  { id: '1', name: 'GTBank Savings', bank: 'GTBank', balance: 850000, lastSync: new Date(Date.now() - 120000), initials: 'GT', color: 'bg-orange-500' },
  { id: '2', name: 'Access Current', bank: 'Access Bank', balance: 1250000, lastSync: new Date(Date.now() - 3600000), initials: 'AC', color: 'bg-blue-500' },
  { id: '3', name: 'Zenith Savings', bank: 'Zenith Bank', balance: 350000, lastSync: new Date(Date.now() - 7200000), initials: 'ZB', color: 'bg-red-500' },
];

const categorySpending = [
  { name: 'Food & Dining', value: 65000, color: 'hsl(var(--chart-1))' },
  { name: 'Transportation', value: 42000, color: 'hsl(var(--chart-2))' },
  { name: 'Shopping', value: 38000, color: 'hsl(var(--chart-3))' },
  { name: 'Bills & Utilities', value: 28000, color: 'hsl(var(--chart-4))' },
  { name: 'Entertainment', value: 12000, color: 'hsl(var(--chart-5))' },
];

const budgets = [
  { id: '1', category: 'Food & Dining', emoji: '🍕', spent: 65000, limit: 80000 },
  { id: '2', category: 'Transportation', emoji: '🚗', spent: 42000, limit: 50000 },
  { id: '3', category: 'Shopping', emoji: '🛍️', spent: 38000, limit: 35000 },
  { id: '4', category: 'Bills', emoji: '💡', spent: 28000, limit: 45000 },
  { id: '5', category: 'Entertainment', emoji: '🎬', spent: 12000, limit: 20000 },
  { id: '6', category: 'Healthcare', emoji: '🏥', spent: 5000, limit: 15000 },
];

const cashFlowData = [
  { month: 'Aug', income: 580000, expenses: 320000 },
  { month: 'Sep', income: 620000, expenses: 290000 },
  { month: 'Oct', income: 650000, expenses: 380000 },
  { month: 'Nov', income: 600000, expenses: 340000 },
  { month: 'Dec', income: 750000, expenses: 420000 },
  { month: 'Jan', income: 650000, expenses: 285000 },
];

const recentTransactions = [
  { id: '1', merchant: 'Shoprite Lekki', category: 'Food & Dining', categoryColor: 'bg-orange-500', amount: -12500, type: 'debit', date: new Date() },
  { id: '2', merchant: 'Uber Trip', category: 'Transportation', categoryColor: 'bg-blue-500', amount: -3500, type: 'debit', date: new Date() },
  { id: '3', merchant: 'Salary Credit', category: 'Income', categoryColor: 'bg-emerald-500', amount: 650000, type: 'credit', date: new Date(Date.now() - 86400000) },
  { id: '4', merchant: 'Netflix', category: 'Entertainment', categoryColor: 'bg-purple-500', amount: -4400, type: 'debit', date: new Date(Date.now() - 86400000) },
  { id: '5', merchant: 'MTN Airtime', category: 'Bills', categoryColor: 'bg-yellow-500', amount: -5000, type: 'debit', date: new Date(Date.now() - 86400000) },
  { id: '6', merchant: 'DSTV Premium', category: 'Entertainment', categoryColor: 'bg-purple-500', amount: -24500, type: 'debit', date: new Date(Date.now() - 172800000) },
  { id: '7', merchant: 'Bolt Ride', category: 'Transportation', categoryColor: 'bg-blue-500', amount: -2800, type: 'debit', date: new Date(Date.now() - 172800000) },
];

const insights = [
  { id: '1', icon: '📈', text: 'You spent 23% less on Food this month. Great job!', type: 'success' },
  { id: '2', icon: '⚠️', text: 'Shopping budget is 108% used with 10 days left.', type: 'warning' },
  { id: '3', icon: '🔔', text: 'Netflix subscription due in 5 days: ₦4,400', type: 'info' },
  { id: '4', icon: '🎯', text: "You're on track to save ₦165,000 this month!", type: 'success' },
];

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

export default function DashboardPage() {
  const router = useRouter();
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  const [monoModalOpen, setMonoModalOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  // Fix hydration error: use static initial greeting, update on client
  const [greeting, setGreeting] = useState('Hello');
  
  useEffect(() => {
    setGreeting(getGreeting());
  }, []);
  
  // For demo, toggle this to see empty state
  const showEmptyState = false;
  const connectedAccounts = showEmptyState ? [] : accounts;
  
  const totalSpent = 185000;
  const totalBudget = 300000;
  const daysRemaining = 10;

  const dismissInsight = (id: string) => {
    setDismissedInsights(prev => [...prev, id]);
  };

  const visibleInsights = insights.filter(i => !dismissedInsights.includes(i.id));

  const handleSyncAll = () => {
    toast({
      title: 'Syncing all accounts',
      description: 'Your accounts will be synced in the background.',
    });
  };

  // Empty state when no accounts connected
  if (connectedAccounts.length === 0) {
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
              <p className="text-4xl font-bold tracking-tight">₦2,450,000</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-success/20 text-success border-0">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +₦125,000
                </Badge>
                <span className="text-xs text-muted-foreground">this month</span>
              </div>
            </div>
            <div className="w-full lg:w-48 h-12">
              <SparklineChart data={netWorthData} />
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
            {accounts.map((account) => (
              <Card key={account.id} className="min-w-[200px] shrink-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold text-sm', account.color)}>
                      {account.initials}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.bank}</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(account.balance)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeDate(account.lastSync)}
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
            <div className="flex items-center gap-6">
              <DonutChart value={totalSpent} total={totalBudget} />
              <div className="flex-1">
                <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                <p className="text-sm text-muted-foreground">of {formatCurrency(totalBudget)} budgeted</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-success border-success/30">
                    {formatCurrency(totalBudget - totalSpent)} remaining
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
            <HorizontalBarChart data={categorySpending} height={160} />
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
          {budgets.map((budget) => {
            const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
            const { color, status } = getBudgetStatus(budget.spent, budget.limit);
            const isOver = budget.spent > budget.limit;

            return (
              <Card key={budget.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{budget.emoji}</span>
                      <span className="font-medium">{budget.category}</span>
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
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </span>
                    <span className={cn(
                      'font-medium',
                      isOver ? 'text-purple-400' : 'text-success'
                    )}>
                      {isOver ? `+${formatCurrency(budget.spent - budget.limit)}` : formatCurrency(budget.limit - budget.spent)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
          <CashFlowChart data={cashFlowData} />
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
            {recentTransactions.slice(0, 7).map((tx) => (
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
                  <p className="font-medium truncate">{tx.merchant}</p>
                  <Badge variant="secondary" className={cn('text-xs mt-1', tx.categoryColor, 'text-white')}>
                    {tx.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'font-semibold',
                    tx.type === 'debit' ? 'text-destructive' : 'text-success'
                  )}>
                    {tx.type === 'debit' ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatRelativeDate(tx.date)}</p>
                </div>
              </div>
            ))}
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
                  insight.type === 'warning' && 'border-warning/30 bg-warning/5',
                  insight.type === 'success' && 'border-success/30 bg-success/5'
                )}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{insight.icon}</span>
                      <p className="text-sm flex-1 whitespace-normal">{insight.text}</p>
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
        }}
      />
    </div>
  );
}
