import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDateShort } from '@/lib/format';
import type { Transaction } from '@/types/api';

interface TransactionCardProps {
  transaction: Transaction;
  onClick?: () => void;
  compact?: boolean;
}

export function TransactionCard({ transaction, onClick, compact }: TransactionCardProps) {
  const isDebit = transaction.type === 'debit';

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors',
        onClick && 'cursor-pointer hover:bg-muted/50',
        compact && 'p-2'
      )}
      onClick={onClick}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          isDebit ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
        )}
      >
        {isDebit ? (
          <ArrowDownRight className="h-5 w-5" />
        ) : (
          <ArrowUpRight className="h-5 w-5" />
        )}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {transaction.merchant_name || transaction.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatDateShort(transaction.date)}</span>
          {transaction.category_name && (
            <>
              <span>•</span>
              <span
                className="truncate"
                style={{ color: transaction.category_color || undefined }}
              >
                {transaction.category_name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right">
        <p
          className={cn(
            'font-semibold tabular-nums',
            isDebit ? 'text-foreground' : 'text-success'
          )}
        >
          {isDebit ? '-' : '+'}
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
      </div>
    </div>
  );
}
