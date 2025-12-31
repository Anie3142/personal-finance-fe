'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Plus,
  PiggyBank,
  MoreHorizontal,
  CreditCard,
  Target,
  Repeat,
  BarChart3,
  Lightbulb,
  Tags,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const moreItems: NavItem[] = [
  { label: 'Accounts', href: '/accounts', icon: CreditCard },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Recurring', href: '/recurring', icon: Repeat },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Insights', href: '/insights', icon: Lightbulb },
  { label: 'Categories', href: '/categories', icon: Tags },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {/* Home */}
        <Link
          href="/dashboard"
          className={cn(
            'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
            pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Home</span>
        </Link>

        {/* Transactions */}
        <Link
          href="/transactions"
          className={cn(
            'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
            pathname === '/transactions' || pathname.startsWith('/transactions/') ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <ArrowLeftRight className="h-5 w-5" />
          <span>Transactions</span>
        </Link>

        {/* FAB - Add */}
        <Link href="/transactions/new" className="-mt-6">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </Link>

        {/* Budgets */}
        <Link
          href="/budgets"
          className={cn(
            'flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors',
            pathname.startsWith('/budgets') ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <PiggyBank className="h-5 w-5" />
          <span>Budgets</span>
        </Link>

        {/* More Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground">
              <MoreHorizontal className="h-5 w-5" />
              <span>More</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {moreItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
