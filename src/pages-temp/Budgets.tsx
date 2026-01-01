'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, AlertCircle, CheckCircle2, TrendingUp, Edit, Trash2, Wallet } from 'lucide-react';
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
import api from '@/lib/api';
import type { Budget, Category } from '@/types/api';

export default function Budgets() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  
  // Form state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');

  // Fetch budgets from API
  const { data: budgetsData, isLoading } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => api.getBudgets(),
  });

  // Fetch categories for dropdown
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
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
        data: { amount: parseFloat(amount), period },
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

  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, b) => sum + Number(b.amount), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + Number(b.spent || 0), 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over_budget': return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'warning': return <TrendingUp className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle2 className="h-5 w-5 text-success" />;
    }
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-destructive';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-success';
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

      {budgets.length === 0 ? (
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Budgeted</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className={`text-2xl font-bold ${totalBudgeted - totalSpent < 0 ? 'text-destructive' : 'text-success'}`}>
                  {formatCurrency(totalBudgeted - totalSpent)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Budget List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => (
              <Card key={budget.id} className="group">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${budget.category_color}20` }}
                      >
                        {budget.category_icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{budget.category_name}</CardTitle>
                        <CardDescription className="capitalize">{budget.period}</CardDescription>
                      </div>
                    </div>
                    {getStatusIcon(budget.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress 
                      value={Math.min(budget.percentage || 0, 100)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {formatCurrency(Number(budget.spent || 0))} spent
                      </span>
                      <span className="font-medium">
                        {formatCurrency(Number(budget.amount))}
                      </span>
                    </div>
                    <p className={`text-sm ${budget.remaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {budget.remaining < 0 
                        ? `${formatCurrency(Math.abs(Number(budget.remaining)))} over budget`
                        : `${formatCurrency(Number(budget.remaining))} remaining`
                      }
                    </p>
                  </div>
                  {/* Edit/Delete buttons */}
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(budget)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(budget.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
