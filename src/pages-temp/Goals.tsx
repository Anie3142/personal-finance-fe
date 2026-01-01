'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Target, ChevronRight, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/format';
import { GoalModal } from '@/components/modals';
import { EmptyState, LoadingSkeleton } from '@/components/common';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Goal } from '@/types/api';

export default function Goals() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Fetch goals from API
  const { data: goalsData, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => api.getGoals(),
  });

  // Create goal mutation
  const createGoalMutation = useMutation({
    mutationFn: (data: any) => api.createGoal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setModalOpen(false);
      setEditingGoal(null);
    },
  });

  // Update goal mutation
  const updateGoalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setModalOpen(false);
      setEditingGoal(null);
    },
  });

  // Delete goal mutation
  const deleteGoalMutation = useMutation({
    mutationFn: (id: string) => api.deleteGoal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const goals = goalsData?.goals || [];
  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  const handleSave = (goalData: any) => {
    if (editingGoal) {
      updateGoalMutation.mutate({
        id: editingGoal.id,
        data: {
          name: goalData.name,
          emoji: goalData.emoji,
          target_amount: goalData.target,
          target_date: goalData.deadline,
        },
      });
    } else {
      createGoalMutation.mutate({
        name: goalData.name,
        emoji: goalData.emoji,
        target_amount: goalData.target,
        target_date: goalData.deadline,
        linked_account_id: goalData.linkedAccount,
      });
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteGoalMutation.mutate(id);
    }
  };

  // Calculate totals
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.current_amount), 0);
  const totalTarget = goals.reduce((sum, g) => sum + Number(g.target_amount), 0);

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Goals</h1>
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
          <h1 className="text-2xl font-bold">Goals</h1>
          <p className="text-muted-foreground">Track your savings goals</p>
        </div>
        <Button onClick={() => {
          setEditingGoal(null);
          setModalOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <EmptyState
          icon={<Target className="h-8 w-8" />}
          title="No goals yet"
          description="Create your first savings goal to start tracking your progress."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
          }
        />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Saved</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(totalSaved)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Target</p>
                <p className="text-2xl font-bold">{formatCurrency(totalTarget)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">
                  {totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Active Goals ({activeGoals.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeGoals.map((goal) => (
                  <Card key={goal.id} className="group hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{goal.emoji}</span>
                          <div>
                            <CardTitle className="text-base">{goal.name}</CardTitle>
                            {goal.target_date && (
                              <CardDescription>
                                Target: {new Date(goal.target_date).toLocaleDateString()}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                        <Link href={`/goals/${goal.id}`}>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Progress value={goal.percentage} className="h-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-success font-medium">
                            {formatCurrency(Number(goal.current_amount))}
                          </span>
                          <span className="text-muted-foreground">
                            {formatCurrency(Number(goal.target_amount))}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {goal.percentage}% complete • {formatCurrency(Number(goal.target_amount) - Number(goal.current_amount))} to go
                        </p>
                        {goal.monthly_contribution_needed > 0 && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Save {formatCurrency(Number(goal.monthly_contribution_needed))}/month to reach your goal
                          </p>
                        )}
                      </div>
                      {/* Edit/Delete buttons */}
                      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(goal)}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(goal.id)}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Completed Goals ({completedGoals.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedGoals.map((goal) => (
                  <Card key={goal.id} className="bg-success/5 border-success/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{goal.emoji}</span>
                        <div>
                          <CardTitle className="text-base">{goal.name}</CardTitle>
                          <CardDescription className="text-success">Completed! 🎉</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold text-success">
                        {formatCurrency(Number(goal.target_amount))}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Goal Modal */}
      <GoalModal
        goal={editingGoal ? {
          id: editingGoal.id,
          name: editingGoal.name,
          emoji: editingGoal.emoji,
          target: Number(editingGoal.target_amount),
          current: Number(editingGoal.current_amount),
          deadline: editingGoal.target_date || undefined,
        } : null}
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setEditingGoal(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
