import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/format';
import { Progress } from '@/components/ui/progress';
import type { Budget } from '@/types/api';

interface BudgetCardProps {
  budget: Budget;
  onClick?: () => void;
}

export function BudgetCard({ budget, onClick }: BudgetCardProps) {
  const percentage = Math.min(budget.percentage, 100);
  const isOverBudget = budget.percentage > 100;

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-4 transition-all',
        onClick && 'cursor-pointer hover:shadow-md',
        isOverBudget && 'border-destructive/30'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{budget.category_icon}</span>
          <span className="font-medium">{budget.category_name}</span>
        </div>
        <span
          className={cn(
            'text-xs font-medium rounded-full px-2 py-0.5',
            budget.status === 'on_track' && 'bg-success/10 text-success',
            budget.status === 'warning' && 'bg-warning/10 text-warning',
            budget.status === 'over_budget' && 'bg-destructive/10 text-destructive'
          )}
        >
          {budget.status === 'on_track' && 'On Track'}
          {budget.status === 'warning' && 'Warning'}
          {budget.status === 'over_budget' && 'Over Budget'}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <Progress
          value={percentage}
          className={cn(
            'h-2',
            isOverBudget && '[&>div]:bg-destructive',
            budget.status === 'warning' && '[&>div]:bg-warning'
          )}
        />
      </div>

      {/* Amounts */}
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">
          {formatCurrency(budget.spent)} spent
        </span>
        <span className="font-medium">
          {formatCurrency(budget.amount)}
        </span>
      </div>

      {/* Remaining */}
      {budget.remaining > 0 ? (
        <p className="mt-1 text-xs text-muted-foreground">
          {formatCurrency(budget.remaining)} remaining
        </p>
      ) : (
        <p className="mt-1 text-xs text-destructive">
          {formatCurrency(Math.abs(budget.remaining))} over budget
        </p>
      )}
    </div>
  );
}
