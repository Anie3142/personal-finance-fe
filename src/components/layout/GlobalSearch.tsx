import { useState, useEffect } from 'react';
import { Search, X, ArrowRight, CreditCard, Receipt, Tag, Target, PiggyBank } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

// Sample search data - would come from API in production
const searchData = {
  transactions: [
    { id: '1', name: 'Shoprite - Groceries', amount: -45000, date: '2024-01-15', category: 'Food & Dining' },
    { id: '2', name: 'MTN Airtime', amount: -5000, date: '2024-01-14', category: 'Utilities' },
    { id: '3', name: 'Salary - TechCorp', amount: 850000, date: '2024-01-01', category: 'Income' },
  ],
  accounts: [
    { id: '1', name: 'GTBank Savings', balance: 1250000, type: 'savings' },
    { id: '2', name: 'Access Bank Current', balance: 450000, type: 'checking' },
  ],
  categories: [
    { id: '1', name: 'Food & Dining', spent: 125000 },
    { id: '2', name: 'Transportation', spent: 45000 },
    { id: '3', name: 'Entertainment', spent: 35000 },
  ],
  budgets: [
    { id: '1', name: 'Monthly Groceries', spent: 85000, limit: 100000 },
    { id: '2', name: 'Entertainment', spent: 35000, limit: 50000 },
  ],
  goals: [
    { id: '1', name: 'Emergency Fund', current: 500000, target: 1000000 },
    { id: '2', name: 'New Laptop', current: 150000, target: 350000 },
  ],
};

function formatNaira(amount: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (type: string, id: string) => {
    setOpen(false);
    switch (type) {
      case 'transaction':
        router.push('/transactions');
        break;
      case 'account':
        router.push(`/accounts/${id}`);
        break;
      case 'category':
        router.push('/categories');
        break;
      case 'budget':
        router.push(`/budgets/${id}`);
        break;
      case 'goal':
        router.push(`/goals/${id}`);
        break;
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start bg-muted/50 text-sm text-muted-foreground sm:pr-12 md:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search transactions, accounts...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search transactions, accounts, categories..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Transactions">
            {searchData.transactions.map((tx) => (
              <CommandItem
                key={tx.id}
                onSelect={() => handleSelect('transaction', tx.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.category}</p>
                  </div>
                </div>
                <span className={tx.amount > 0 ? 'text-emerald-500' : 'text-foreground'}>
                  {formatNaira(tx.amount)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Accounts">
            {searchData.accounts.map((account) => (
              <CommandItem
                key={account.id}
                onSelect={() => handleSelect('account', account.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{account.type}</p>
                  </div>
                </div>
                <span className="text-emerald-500">{formatNaira(account.balance)}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Categories">
            {searchData.categories.map((category) => (
              <CommandItem
                key={category.id}
                onSelect={() => handleSelect('category', category.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-muted-foreground">{formatNaira(category.spent)} spent</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Budgets">
            {searchData.budgets.map((budget) => (
              <CommandItem
                key={budget.id}
                onSelect={() => handleSelect('budget', budget.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{budget.name}</span>
                </div>
                <span className="text-muted-foreground">
                  {formatNaira(budget.spent)} / {formatNaira(budget.limit)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Goals">
            {searchData.goals.map((goal) => (
              <CommandItem
                key={goal.id}
                onSelect={() => handleSelect('goal', goal.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{goal.name}</span>
                </div>
                <span className="text-emerald-500">
                  {Math.round((goal.current / goal.target) * 100)}%
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
