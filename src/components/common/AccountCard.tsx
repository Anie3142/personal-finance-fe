import { RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatRelativeDate } from '@/lib/format';
import { Button } from '@/components/ui/button';
import type { Account, Connection } from '@/types/api';

interface AccountCardProps {
  account: Account;
  connection?: Connection;
  onSync?: () => void;
  onClick?: () => void;
  syncing?: boolean;
}

export function AccountCard({ account, connection, onSync, onClick, syncing }: AccountCardProps) {
  const needsReconnection = connection?.status === 'needs_reconnection';

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-xl border bg-card p-4 transition-all',
        onClick && 'cursor-pointer hover:shadow-md',
        needsReconnection && 'border-warning/50 bg-warning/5'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {connection?.institution_logo ? (
            <img
              src={connection.institution_logo}
              alt={connection.institution_name}
              className="h-10 w-10 rounded-lg object-contain"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <span className="text-lg font-bold text-muted-foreground">
                {account.name[0]}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium">{account.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
          </div>
        </div>
        
        {/* Status */}
        {needsReconnection ? (
          <div className="flex items-center gap-1 text-warning">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">Reconnect</span>
          </div>
        ) : (
          <CheckCircle2 className="h-4 w-4 text-success" />
        )}
      </div>

      {/* Balance */}
      <div>
        <p className="text-sm text-muted-foreground">Balance</p>
        <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
        {account.available_balance !== account.balance && (
          <p className="text-sm text-muted-foreground">
            Available: {formatCurrency(account.available_balance)}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t pt-3">
        <p className="text-xs text-muted-foreground">
          Updated {formatRelativeDate(account.last_synced_at)}
        </p>
        {onSync && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onSync();
            }}
            disabled={syncing}
          >
            <RefreshCw className={cn('h-3 w-3', syncing && 'animate-spin')} />
            Sync
          </Button>
        )}
      </div>
    </div>
  );
}
