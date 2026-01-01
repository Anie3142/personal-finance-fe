'use client';

import { useState } from 'react';
import { Plus, Calendar, Bell, Edit, Trash2, PauseCircle, PlayCircle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatDate } from '@/lib/format';
import { RecurringModal } from '@/components/modals';
import { EmptyState, LoadingSkeleton } from '@/components/common';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { RecurringTransaction } from '@/types/api';

export default function Recurring() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecurring, setEditingRecurring] = useState<RecurringTransaction | null>(null);

  // Fetch recurring transactions from API
  const { data: recurringData, isLoading } = useQuery({
    queryKey: ['recurring'],
    queryFn: () => api.getRecurring(),
  });

  // Fetch upcoming
  const { data: upcomingData } = useQuery({
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

  const recurring = recurringData?.recurring || [];
  const upcoming = upcomingData?.upcoming || [];
  const totalDue = upcomingData?.total_due_30_days || 0;

  const bills = recurring.filter(r => r.amount > 0 && r.status === 'active');
  const paused = recurring.filter(r => r.status === 'paused');

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
        },
      });
    } else {
      createRecurringMutation.mutate({
        name: data.name,
        icon: data.icon,
        amount: data.amount,
        frequency: data.frequency.toLowerCase(),
        start_date: data.nextDate,
        category_id: data.category,
        account_id: data.account,
        reminder_days: data.reminderDays,
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

      {recurring.length === 0 ? (
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

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcoming.slice(0, 5).map((item) => {
                    const daysUntil = getDaysUntil(item.next_date);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                            📅
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {daysUntil === 0 ? 'Due today' : daysUntil === 1 ? 'Due tomorrow' : `Due in ${daysUntil} days`}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">{formatCurrency(Number(item.amount))}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active ({bills.length})</TabsTrigger>
              <TabsTrigger value="paused">Paused ({paused.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bills.map((item) => (
                  <Card key={item.id} className="group">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                            📦
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground capitalize">{item.frequency}</p>
                          </div>
                        </div>
                        <p className="font-bold">{formatCurrency(Number(item.amount))}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Next: {formatDate(item.next_date)}</span>
                        </div>
                        {item.category_name && (
                          <Badge variant="secondary">{item.category_name}</Badge>
                        )}
                      </div>
                      {/* Actions */}
                      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleToggleStatus(item)}>
                          <PauseCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="paused">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paused.map((item) => (
                  <Card key={item.id} className="opacity-60 group">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                            📦
                          </div>
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <Badge variant="secondary">Paused</Badge>
                          </div>
                        </div>
                        <p className="font-bold">{formatCurrency(Number(item.amount))}</p>
                      </div>
                      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" onClick={() => handleToggleStatus(item)}>
                          <PlayCircle className="h-4 w-4 mr-1" />
                          Resume
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
