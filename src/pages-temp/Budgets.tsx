import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, ChevronLeft, ChevronRight, PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { formatCurrency } from '@/lib/format';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { EmptyState, LoadingSkeleton } from '@/components/common';

const budgetsData = [
  { id: '1', category: 'Food & Dining', emoji: '🍕', budgeted: 80000, spent: 45000, color: '#f97316' },
  { id: '2', category: 'Transportation', emoji: '🚗', budgeted: 40000, spent: 35000, color: '#3b82f6' },
  { id: '3', category: 'Entertainment', emoji: '🎬', budgeted: 30000, spent: 28000, color: '#8b5cf6' },
  { id: '4', category: 'Bills & Utilities', emoji: '💡', budgeted: 50000, spent: 48000, color: '#eab308' },
  { id: '5', category: 'Shopping', emoji: '🛍️', budgeted: 25000, spent: 30000, color: '#ec4899' },
  { id: '6', category: 'Healthcare', emoji: '🏥', budgeted: 20000, spent: 5000, color: '#ef4444' },
];

const totalBudgeted = budgetsData.reduce((sum, b) => sum + b.budgeted, 0);
const totalSpent = budgetsData.reduce((sum, b) => sum + b.spent, 0);

const pieData = [
  { name: 'Spent', value: totalSpent, color: 'hsl(var(--primary))' },
  { name: 'Remaining', value: Math.max(0, totalBudgeted - totalSpent), color: 'hsl(var(--muted))' },
];

export default function Budgets() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<typeof budgetsData[0] | null>(null);
  const [period, setPeriod] = useState('January 2025');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // For demo purposes - toggle this to see empty state
  const showEmptyState = false;
  const budgets = showEmptyState ? [] : budgetsData;

  const getStatus = (spent: number, budgeted: number) => {
    const percent = (spent / budgeted) * 100;
    if (percent >= 100) return { color: 'bg-destructive', textColor: 'text-destructive', label: 'Over budget' };
    if (percent >= 90) return { color: 'bg-warning', textColor: 'text-warning', label: 'Warning' };
    if (percent >= 70) return { color: 'bg-warning', textColor: 'text-warning', label: 'Caution' };
    return { color: 'bg-success', textColor: 'text-success', label: 'On track' };
  };

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Budgets</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <LoadingSkeleton variant="stat" count={4} className="mb-6" />
        <LoadingSkeleton variant="card" count={6} />
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <div className="flex items-center gap-2 mt-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-muted-foreground">{period}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingBudget(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBudget ? 'Edit Budget' : 'Create Budget'}</DialogTitle>
              <DialogDescription>
                {editingBudget ? 'Update your budget settings' : 'Set a spending limit for a category'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue={editingBudget?.category.toLowerCase().replace(/ & /g, '-')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food-dining">🍕 Food & Dining</SelectItem>
                    <SelectItem value="transportation">🚗 Transportation</SelectItem>
                    <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                    <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                    <SelectItem value="bills-utilities">💡 Bills & Utilities</SelectItem>
                    <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input 
                    type="number" 
                    placeholder="50000" 
                    className="pl-8"
                    defaultValue={editingBudget?.budgeted}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="rollover" />
                <Label htmlFor="rollover">Rollover unused amount</Label>
              </div>
              <Button className="w-full" onClick={() => {
                setIsDialogOpen(false);
                setEditingBudget(null);
              }}>
                {editingBudget ? 'Save Changes' : 'Create Budget'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {budgets.length === 0 ? (
        <EmptyState
          icon={<PiggyBank className="h-8 w-8" />}
          title="No budgets yet"
          description="Create your first budget to start tracking your spending by category."
          action={
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          }
        />
      ) : (
        <>
          {/* Summary */}
          <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budgeted</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold text-success">
                    {formatCurrency(Math.max(0, totalBudgeted - totalSpent))}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {Math.round((totalSpent / totalBudgeted) * 100)}% of your budget used • 15 days remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percent = Math.min(100, (budget.spent / budget.budgeted) * 100);
          const remaining = budget.budgeted - budget.spent;
          const status = getStatus(budget.spent, budget.budgeted);

          return (
            <Link key={budget.id} href={`/budgets/${budget.id}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{budget.emoji}</span>
                      <div>
                        <h3 className="font-medium">{budget.category}</h3>
                        <p className={`text-sm ${status.textColor}`}>{status.label}</p>
                      </div>
                    </div>
                  </div>
                  <Progress
                    value={percent}
                    className="h-2 mb-3"
                    style={{
                      '--progress-background': budget.color,
                    } as React.CSSProperties}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.budgeted)}
                    </span>
                    <span className={remaining < 0 ? 'text-destructive' : 'text-foreground'}>
                      {remaining < 0 ? '-' : ''}{formatCurrency(Math.abs(remaining))} {remaining < 0 ? 'over' : 'left'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Unbudgeted spending */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Unbudgeted Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎁</span>
              <span>Gifts & Donations</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{formatCurrency(15000)} spent</span>
              <Button size="sm" variant="outline">Add budget</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </>
      )}
    </div>
  );
}
