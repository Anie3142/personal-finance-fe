import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/format';
import { GoalModal } from '@/components/modals';
import { EmptyState, LoadingSkeleton } from '@/components/common';

const goalsData = [
  { id: '1', name: 'Emergency Fund', emoji: '🛡️', target: 1000000, current: 450000, deadline: '2025-06-30', completed: false },
  { id: '2', name: 'New Laptop', emoji: '💻', target: 500000, current: 320000, deadline: '2025-03-15', completed: false },
  { id: '3', name: 'Vacation', emoji: '✈️', target: 300000, current: 75000, deadline: '2025-12-01', completed: false },
  { id: '4', name: 'House Down Payment', emoji: '🏠', target: 5000000, current: 850000, deadline: '2026-12-31', completed: false },
];

const completedGoalsData = [
  { id: '5', name: 'New Phone', emoji: '📱', target: 250000, current: 250000, deadline: '2024-12-01', completed: true },
  { id: '6', name: 'Gym Equipment', emoji: '🏋️', target: 150000, current: 150000, deadline: '2024-10-15', completed: true },
];

export default function Goals() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const totalTarget = goalsData.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = goalsData.reduce((sum, g) => sum + g.current, 0);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // For demo purposes - toggle this to see empty state
  const showEmptyState = false;
  const goals = showEmptyState ? [] : goalsData;
  const completedGoals = completedGoalsData;

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Savings Goals</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Savings Goals</h1>
          <p className="text-muted-foreground">Total saved: {formatCurrency(totalSaved)}</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />Create Goal
        </Button>
      </div>

      {goals.length === 0 ? (
        <EmptyState
          icon={<Target className="h-8 w-8" />}
          title="No savings goals yet"
          description="Set your first savings goal to start building wealth."
          action={
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />Create Goal
            </Button>
          }
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const percent = (goal.current / goal.target) * 100;
              return (
                <Link key={goal.id} href={`/goals/${goal.id}`}>
                  <Card className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{goal.emoji}</span>
                        <div>
                          <h3 className="font-medium">{goal.name}</h3>
                          <p className="text-sm text-muted-foreground">Target: {formatCurrency(goal.target)}</p>
                        </div>
                      </div>
                      <Progress value={percent} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm">
                        <span>{formatCurrency(goal.current)}</span>
                        <span className="text-muted-foreground">{Math.round(percent)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Completed Goals Section */}
          {completedGoals.length > 0 && (
            <Card className="mt-8">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-warning" />
                  <CardTitle className="text-lg">🎉 Achieved Goals</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {completedGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
                    >
                      <span className="text-2xl">{goal.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-medium">{goal.name}</h4>
                        <p className="text-sm text-muted-foreground">{formatCurrency(goal.target)}</p>
                      </div>
                      <Badge className="bg-success/20 text-success border-0">Completed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <GoalModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
