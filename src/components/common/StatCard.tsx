import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    label: string;
  };
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({ title, value, change, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('rounded-xl border bg-card p-6 shadow-soft', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                trend === 'up' && 'text-success',
                trend === 'down' && 'text-destructive',
                trend === 'neutral' && 'text-muted-foreground'
              )}
            >
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {change.value > 0 ? '+' : ''}{change.value}% {change.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
