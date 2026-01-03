'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, AlertCircle, CheckCircle2, TrendingUp, Edit, Trash2, Wallet, PieChart as PieChartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/format';
import { EmptyState, LoadingSkeleton } from '@/components/common';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import api from '@/lib/api';
import type { Budget, CategorySpending } from '@/types/api';

export default function Budgets() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // Form state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Fetch budgets from API
  const { data: budgetsData, isLoading: isBudgetsLoading } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => api.getBudgets(),
  });

  // Fetch categories for dropdown
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });

  // Fetch monthly report for unbudgeted spending
  const { data: reportData, isLoading: isReportLoading } = useQuery({
    queryKey: ['monthly-report', currentYear, currentMonth],
    queryFn: () => api.getMonthlyReport(currentYear, currentMonth),
  });

  // Create budget mutation
  const createBudgetMutation = useMutation({
    mutationFn: (data: { category_id: string; amount: number; period: string }) =>
      api.createBudget(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      resetForm();
    },
  });

  // Update budget mutation
  const updateBudgetMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) =>
      api.updateBudget(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      resetForm();
    },
  });

  // Delete budget mutation
  const deleteBudgetMutation = useMutation({
    mutationFn: (id: string) => api.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });

  const budgets = budgetsData?.budgets || [];
  const categories = categoriesData?.categories || [];
  const spendingByCategory = reportData?.spending_by_category || [];
  const isLoading = isBudgetsLoading || isReportLoading;

  // Calculate unbudgeted spending
  const unbudgetedCategories = spendingByCategory.filter(category => {
    // Check if this category is already covered by a budget
    return !budgets.some(b => b.category_id === category.category_id);
  }).filter(c => c.amount > 0);

  // Filter out categories that already have budgets
  const availableCategories = categories.filter(
    cat => !budgets.some(b => b.category_id === cat.id) || editingBudget?.category_id === cat.id
  );

  const resetForm = () => {
    setSelectedCategory('');
    setAmount('');
    setPeriod('monthly');
    setEditingBudget(null);
    setIsDialogOpen(false);
  };

  const handleSave = () => {
    if (!selectedCategory || !amount) return;

    if (editingBudget) {
      updateBudgetMutation.mutate({
        id: editingBudget.id,
        data: { category_id: selectedCategory, amount: parseFloat(amount), period },
      });
    } else {
      createBudgetMutation.mutate({
        category_id: selectedCategory,
        amount: parseFloat(amount),
        period,
      });
    }
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setSelectedCategory(budget.category_id);
    setAmount(budget.amount.toString());
    setPeriod(budget.period);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      deleteBudgetMutation.mutate(id);
    }
  };

  const handleCreateBudgetForUnbudgeted = (category: CategorySpending) => {
    setSelectedCategory(category.category_id);
    setAmount(category.amount.toString()); // Pre-fill with spent amount as a suggestion
    setPeriod('monthly'); // Default period
    setEditingBudget(null); // Ensure it's a new budget
    setIsDialogOpen(true);
  };

  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent || 0), 0);
  const totalUnbudgetedSpent = unbudgetedCategories.reduce((sum, c) => sum + Number(c.amount), 0);

  // Chart Data
  const chartData = budgets
    .map(b => ({
      name: b.category_name,
      value: Number(b.spent || 0),
      color: b.category_color || '#cccccc'
    }))
    .filter(d => d.value > 0);

  const getStatus = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) {
      return { label: 'Over budget', icon: <AlertCircle className="h-5 w-5 text-destructive" />, textColor: 'text-destructive' };
    } else if (percentage >= 80) {
      return { label: 'Approaching limit', icon: <TrendingUp className="h-5 w-5 text-yellow-500" />, textColor: 'text-yellow-500' };
    } else {
      return { label: 'On track', icon: <CheckCircle2 className="h-5 w-5 text-success" />, textColor: 'text-success' };
    }
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
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="text-muted-foreground">Track spending by category</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBudget ? 'Edit Budget' : 'Create New Budget'}</DialogTitle>
              <DialogDescription>Set a spending limit for a category</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!!editingBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Budget Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                  <Input
                    type="number"
                    placeholder="80,000"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Select value={period} onValueChange={(v) => setPeriod(v as any)}>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button
                onClick={handleSave}
                disabled={!selectedCategory || !amount || createBudgetMutation.isPending || updateBudgetMutation.isPending}
              >
                {createBudgetMutation.isPending || updateBudgetMutation.isPending ? 'Saving...' : (editingBudget ? 'Save Changes' : 'Create Budget')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {budgets.length === 0 && unbudgetedCategories.length === 0 ? (
        <EmptyState
          icon={<Wallet className="h-8 w-8" />}
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
          {/* Summary Section: Pie Chart + Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Pie Chart Card - Takes up 2 columns for prominence */}
            <Card className="lg:col-span-2 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Spending Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                {chartData.length > 0 ? (
                  <div className="flex flex-col sm:flex-row items-center gap-8 h-full">
                    {/* Chart Side */}
                    <div className="relative h-[280px] w-full sm:flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-sm text-muted-foreground">Budgeted</span>
                        <span className="font-bold text-xl">{formatCurrency(totalSpent)}</span>
                      </div>
                    </div>

                    {/* Legend Side */}
                    <div className="w-full sm:w-[200px] flex flex-col gap-3">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Top Categories</h4>
                      {chartData.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex items-center justify-between group">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium truncate max-w-[100px]" title={item.name}>{item.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{formatCurrency(item.value)}</span>
                        </div>
                      ))}
                      {chartData.length > 5 && (
                        <p className="text-xs text-center text-muted-foreground mt-2">
                          + {chartData.length - 5} more
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                    <PieChartIcon className="h-12 w-12 mb-3 opacity-20" />
                    <p className="text-sm">No spending data yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary Metrics - Stacked vertically */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Wallet className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(totalBudgeted)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-destructive/10 rounded-full">
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(totalSpent + totalUnbudgetedSpent)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(((totalSpent + totalUnbudgetedSpent) / (totalBudgeted + totalUnbudgetedSpent)) * 100) || 0}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-success/10 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                  </div>
                  <p className={`text-xl font-bold ${totalBudgeted - totalSpent < 0 ? 'text-destructive' : 'text-success'}`}>
                    {formatCurrency(totalBudgeted - totalSpent)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    available to spend
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Budget List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {budgets.map((budget) => {
              const spent = Number(budget.spent || 0);
              const amount = Number(budget.amount || 0);
              const percentage = Math.min(100, (spent / amount) * 100);
              const remaining = amount - spent;
              const status = getStatus(spent, amount);

              return (
                <Card key={budget.id} className="group hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-lg flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${budget.category_color}20`, color: budget.category_color }}
                        >
                          {budget.category_icon || '📊'}
                        </div>
                        <div>
                          <CardTitle className="text-base">{budget.category_name}</CardTitle>
                          <CardDescription className="capitalize">{budget.period}</CardDescription>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${status.textColor === 'text-destructive' ? 'border-destructive/20 bg-destructive/10 text-destructive' : status.textColor === 'text-yellow-500' ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500' : 'border-success/20 bg-success/10 text-success'}`}>
                        {status.label}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          {Math.round(percentage)}%
                        </span>
                        <span className={remaining < 0 ? 'text-destructive' : 'text-success'}>
                          {remaining < 0 ? '-' : ''}{formatCurrency(Math.abs(remaining))} {remaining < 0 ? 'over' : 'left'}
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className="h-2"
                        indicatorClassName={status.textColor === 'text-destructive' ? 'bg-destructive' : status.textColor === 'text-yellow-500' ? 'bg-yellow-500' : 'bg-success'}
                      />

                      <div className="flex justify-between items-center pt-2">
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(spent)} of {formatCurrency(amount)}
                        </p>
                      </div>

                      {/* Edit/Delete buttons */}
                      <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => handleEdit(budget)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive" onClick={() => handleDelete(budget.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Unbudgeted spending */}
          {unbudgetedCategories.length > 0 && (
            <Card className="mt-6 mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Unbudgeted Spending</CardTitle>
                <CardDescription>You have spending in categories without a budget.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {unbudgetedCategories.map((item) => {
                  const category = categories.find(c => c.id === item.category_id);
                  return (
                    <div key={item.category_id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category?.icon || '📝'}</span>
                        <span>{item.category_name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{formatCurrency(item.amount)} spent</span>
                        <Button size="sm" variant="outline" onClick={() => handleCreateBudgetForUnbudgeted(item)}>
                          Add budget
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
