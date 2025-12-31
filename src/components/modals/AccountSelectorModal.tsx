import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/format';

interface Account {
  id: string;
  name: string;
  bank: string;
  balance: number;
  initials: string;
  color: string;
}

const accounts: Account[] = [
  { id: '1', name: 'GTBank Savings', bank: 'GTBank', balance: 850000, initials: 'GT', color: 'bg-orange-500' },
  { id: '2', name: 'Access Current', bank: 'Access Bank', balance: 1250000, initials: 'AC', color: 'bg-blue-500' },
  { id: '3', name: 'Zenith Savings', bank: 'Zenith Bank', balance: 350000, initials: 'ZB', color: 'bg-red-500' },
  { id: '4', name: 'First Bank Current', bank: 'First Bank', balance: 520000, initials: 'FB', color: 'bg-indigo-500' },
];

interface AccountSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (account: Account) => void;
  selectedId?: string;
  multiSelect?: boolean;
  selectedIds?: string[];
  onMultiSelect?: (accounts: Account[]) => void;
}

export function AccountSelectorModal({
  open,
  onOpenChange,
  onSelect,
  selectedId,
  multiSelect = false,
  selectedIds = [],
  onMultiSelect,
}: AccountSelectorModalProps) {
  const handleSelect = (account: Account) => {
    if (multiSelect && onMultiSelect) {
      const isSelected = selectedIds.includes(account.id);
      const newSelection = isSelected
        ? accounts.filter(a => selectedIds.includes(a.id) && a.id !== account.id)
        : [...accounts.filter(a => selectedIds.includes(a.id)), account];
      onMultiSelect(newSelection);
    } else {
      onSelect(account);
      onOpenChange(false);
    }
  };

  const isSelected = (id: string) => {
    return multiSelect ? selectedIds.includes(id) : selectedId === id;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {multiSelect ? 'Select Accounts' : 'Select Account'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-72">
          <div className="space-y-2">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelect(account)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
                  isSelected(account.id)
                    ? 'bg-primary/10 border border-primary/30'
                    : 'hover:bg-secondary/80'
                )}
              >
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg text-white font-semibold text-sm shrink-0',
                  account.color
                )}>
                  {account.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.bank}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{formatCurrency(account.balance)}</span>
                  {isSelected(account.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
