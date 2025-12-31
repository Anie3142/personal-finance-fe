import { cn } from '@/lib/utils';
import { formatCurrency, formatDate } from '@/lib/format';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Goal } from '@/types/api';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
  onContribute?: () => void;
}

export function GoalCard({ goal, onClick, onContribute }: GoalCardProps) {
  const isCompleted = goal.status === 'completed';

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-4 transition-all',
        onClick && 'cursor-pointer hover:shadow-md',
        isCompleted && 'bg-success/5 border-success/30'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{goal.emoji}</span>
          <div>
            <p className="font-medium">{goal.name}</p>
            {goal.target_date && (
              <p className="text-xs text-muted-foreground">
                Target: {formatDate(goal.target_date)}
              </p>
            )}
          </div>
        </div>
        {isCompleted && (
          <span className="text-lg">🎉</span>
        )}
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            {goal.percentage}% complete
          </span>
          <span className="text-sm font-medium">
            {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
          </span>
        </div>
        <Progress
          value={goal.percentage}
          className={cn('h-2', isCompleted && '[&>div]:bg-success')}
        />
      </div>

      {/* Monthly Contribution */}
      {!isCompleted && goal.monthly_contribution_needed > 0 && (
        <div className="mb-3 rounded-lg bg-muted/50 p-2 text-center text-sm">
          Save <span className="font-semibold">{formatCurrency(goal.monthly_contribution_needed)}</span>/month to reach your goal
        </div>
      )}

      {/* Action */}
      {!isCompleted && onContribute && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onContribute();
          }}
        >
          <Plus className="h-4 w-4" />
          Add Funds
        </Button>
      )}
    </div>
  );
}
