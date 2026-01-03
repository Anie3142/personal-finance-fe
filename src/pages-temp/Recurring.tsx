'use client';

import { useState } from 'react';
import { Plus, Calendar, Bell, Edit, Trash2, PauseCircle, PlayCircle, Repeat, MoreVertical, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatCurrency, formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';
import { RecurringModal } from '@/components/modals';
import { EmptyState, LoadingSkeleton } from '@/components/common';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { RecurringTransaction } from '@/types/api';

export default function Recurring() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecurring, setEditingRecurring] = useState<RecurringTransaction | null>(null);

  // Fetch recurring income
  const { data: incomeData, isLoading: isIncomeLoading } = useQuery({
    queryKey: ['recurring', 'income'],
    queryFn: () => api.getRecurring('income'),
  });

  // Fetch recurring expenses
  const { data: expenseData, isLoading: isExpenseLoading } = useQuery({
    queryKey: ['recurring', 'expense'],
    queryFn: () => api.getRecurring('expense'),
  });

  // Fetch upcoming
  const { data: upcomingData, isLoading: isUpcomingLoading } = useQuery({
    queryKey: ['recurring-upcoming'],
    queryFn: () => api.getRecurringUpcoming(),
  });

  // Create recurring mutation
  const createRecurringMutation = useMutation({
    mutationFn: (data: any) => api.createRecurring(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
      queryClient.invalidateQueries({ queryKey: ['recurring-upcoming'] });
      setModalOpen(false);
      setEditingRecurring(null);
    },
  });

  // Update recurring mutation
  const updateRecurringMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateRecurring(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
      queryClient.invalidateQueries({ queryKey: ['recurring-upcoming'] });
      setModalOpen(false);
      setEditingRecurring(null);
    },
  });

  // Delete recurring mutation
  const deleteRecurringMutation = useMutation({
    mutationFn: (id: string) => api.deleteRecurring(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
      queryClient.invalidateQueries({ queryKey: ['recurring-upcoming'] });
    },
  });

  // Helper to check if item is income (via type or name prefix workaround)
  const isIncome = (r: RecurringTransaction) => r.type === 'income' || r.name.startsWith('[Income] ');

  const recurringIncome = (incomeData?.recurring || []).filter(r => isIncome(r));
  // Include items with no type as expenses (legacy behavior) or explicit expense/bill types, BUT exclude detected income
  const recurringExpenses = (expenseData?.recurring || []).filter(r => (!r.type || r.type === 'expense' || r.type === 'bill') && !isIncome(r));

  // Merge for upcoming check if needed, or rely on upcoming endpoint
  // Filter out income from upcoming list (only show bills/expenses)
  const upcomingRaw = upcomingData?.upcoming || [];
  const upcoming = upcomingRaw.filter((item: RecurringTransaction) => !isIncome(item));
  const totalDue = upcomingData?.total_due_30_days || 0;

  const bills = recurringExpenses.filter(r => r.status === 'active');
  const incomeItems = recurringIncome.filter(r => r.status === 'active');

  // Paused items from both
  const paused = [...recurringIncome, ...recurringExpenses].filter(r => r.status === 'paused');

  const handleSave = (data: any) => {
    if (editingRecurring) {
      updateRecurringMutation.mutate({
        id: editingRecurring.id,
        data: {
          name: data.name,
          icon: data.icon,
          amount: data.amount,
          frequency: data.frequency.toLowerCase(),
          next_date: data.nextDate,
          category_id: data.category,
          account_id: data.account,
          reminder_days: data.reminderDays,
          type: data.type,
        },
      });
    } else {
      createRecurringMutation.mutate({
        name: data.name,
        icon: data.icon,
        amount: data.amount,
        frequency: data.frequency.toLowerCase(),
        start_date: new Date().toISOString().split('T')[0],
        category_id: data.category,
        account_id: data.account,
        reminder_days: data.reminderDays,
        type: data.type,
      });
    }
  };


  const handleEdit = (item: RecurringTransaction) => {
    setEditingRecurring(item);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this recurring transaction?')) {
      deleteRecurringMutation.mutate(id);
    }
  };

  const handleToggleStatus = (item: RecurringTransaction) => {
    updateRecurringMutation.mutate({
      id: item.id,
      data: { status: item.status === 'active' ? 'paused' : 'active' },
    });
  };

  const getDaysUntil = (date: string) => {
    const nextDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isLoading = isIncomeLoading || isExpenseLoading || isUpcomingLoading;

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Recurring</h1>
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
          <h1 className="text-2xl font-bold">Recurring</h1>
          <p className="text-muted-foreground">Manage subscriptions and bills</p>
        </div>
        <Button onClick={() => {
          setEditingRecurring(null);
          setModalOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Recurring
        </Button>
      </div>

      {recurringIncome.length === 0 && recurringExpenses.length === 0 ? (
        <EmptyState
          icon={<Repeat className="h-8 w-8" />}
          title="No recurring transactions"
          description="Add your subscriptions, bills, and recurring income to track them automatically."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Recurring
            </Button>
          }
        />
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Due Next 30 Days</p>
                <p className="text-2xl font-bold">{formatCurrency(totalDue)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                <p className="text-2xl font-bold">{bills.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Paused</p>
                <p className="text-2xl font-bold">{paused.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming This Month Timeline Card */}
          {upcoming.length > 0 && (
            <Card className="mb-8 bg-gradient-to-br from-warning/5 via-background to-background border-warning/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <CardTitle className="text-lg">Upcoming This Month</CardTitle>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(totalDue)} due</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcoming.map((item) => {
                    const daysUntil = getDaysUntil(item.next_date);
                    // Calculate progress based on a 30-day billing cycle assumption for visualization
                    // 0 days left = 100% (Urgent), 30 days left = 0%
                    const progress = Math.max(0, Math.min(100, ((30 - daysUntil) / 30) * 100));

                    let statusColor = "bg-primary";
                    let textColor = "text-primary";
                    if (daysUntil <= 3) {
                      statusColor = "bg-destructive";
                      textColor = "text-destructive";
                    } else if (daysUntil <= 7) {
                      statusColor = "bg-warning";
                      textColor = "text-warning";
                    }

                    return (
                      <div key={item.id} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10             rounded-lg bg-secondary flex items-center justify-center text-lg">
                              {item.icon || '📅'}
                            </div>
                            <div>
                              <p className="font-medium">{item.name.replace('[Income] ', '')}</p>
                              <p className="text-xs text-muted-foreground">Due {formatDate(item.next_date)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(Number(item.amount))}</p>
                            <p className={cn("text-xs font-medium", textColor)}>
                              {daysUntil <= 0 ? 'Due today' : `In ${daysUntil} days`}
                            </p>
                          </div>
                        </div>
                        <Progress value={progress} className="h-2" indicatorClassName={statusColor} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Income List */}
          {/* Tabs for Bills vs Income */}
          <Tabs defaultValue="bills" className="space-y-6">
            <TabsList>
              <TabsTrigger value="bills">Bills & Subscriptions</TabsTrigger>
              <TabsTrigger value="income">Recurring Income</TabsTrigger>
            </TabsList>

            <TabsContent value="income" className="mt-0">
              {incomeItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {incomeItems.map((item) => (
                    <Card key={item.id} className="group border-green-200 bg-green-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl">
                            {item.icon || '💰'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{item.name.replace('[Income] ', '')}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground capitalize">{item.frequency}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(item)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(item)}>
                                <PauseCircle className="h-4 w-4 mr-2" />
                                Pause
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-700">+{formatCurrency(Number(item.amount))}</span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatDate(item.next_date)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg border-dashed">
                  <p className="text-muted-foreground">No recurring income tracking active</p>
                  <Button variant="link" onClick={() => setModalOpen(true)}>Add Income</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bills" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bills
                  .concat(paused)
                  .sort((a, b) => (a.status === 'paused' ? 1 : -1))
                  .map((item) => (
                    <Card key={item.id} className={`group ${item.status === 'paused' ? 'opacity-60' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                            {item.icon || '📅'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{item.name.replace('[Income] ', '')}</h4>
                              {item.status === 'paused' && (
                                <Badge variant="secondary" className="text-xs h-5">Paused</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground capitalize">{item.frequency}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as paid
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(item)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(item)}>
                                {item.status === 'active' ? (
                                  <>
                                    <PauseCircle className="h-4 w-4 mr-2" />
                                    Pause
                                  </>
                                ) : (
                                  <>
                                    <PlayCircle className="h-4 w-4 mr-2" />
                                    Resume
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{formatCurrency(Number(item.amount))}</span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatDate(item.next_date)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {bills.length === 0 && paused.length === 0 && (
                  <div className="col-span-full text-center py-12 border rounded-lg border-dashed">
                    <p className="text-muted-foreground">No active subscriptions or bills</p>
                    <Button variant="link" onClick={() => setModalOpen(true)}>Add Bill</Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Modal */}
      <RecurringModal
        recurring={editingRecurring ? {
          id: editingRecurring.id,
          name: editingRecurring.name,
          icon: '📦',
          amount: Number(editingRecurring.amount),
          frequency: editingRecurring.frequency.charAt(0).toUpperCase() + editingRecurring.frequency.slice(1) as any,
          nextDate: editingRecurring.next_date,
          category: editingRecurring.category_id,
          account: editingRecurring.account_id,
          reminderDays: editingRecurring.reminder_days,
          type: 'bill',
        } : null}
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setEditingRecurring(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
