import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'stat' | 'transaction';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ variant = 'card', count = 1, className }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === 'stat') {
    return (
      <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
        {items.map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6">
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="mb-2 h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'transaction') {
    return (
      <div className={cn('space-y-2', className)}>
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full max-w-[200px]" />
              <Skeleton className="h-3 w-full max-w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Card variant
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {items.map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-4">
          <div className="mb-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="mb-2 h-6 w-32" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}
