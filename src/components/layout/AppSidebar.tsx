'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import {
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  PiggyBank,
  Target,
  Repeat,
  BarChart3,
  Lightbulb,
  Download,
  Tags,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Accounts', href: '/accounts', icon: CreditCard },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
];

const planningNav: NavItem[] = [
  { label: 'Budgets', href: '/budgets', icon: PiggyBank },
  { label: 'Goals', href: '/goals', icon: Target },
  { label: 'Recurring', href: '/recurring', icon: Repeat },
];

const analysisNav: NavItem[] = [
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Insights', href: '/insights', icon: Lightbulb },
  { label: 'Export', href: '/export', icon: Download },
];

const toolsNav: NavItem[] = [
  { label: 'Categories', href: '/categories', icon: Tags },
  { label: 'Settings', href: '/settings', icon: Settings },
];

function NavSection({
  title,
  items,
  collapsed,
}: {
  title: string;
  items: NavItem[];
  collapsed: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {!collapsed && (
        <h3 className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
          {title}
        </h3>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        const Icon = item.icon;

        const link = (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                : 'text-sidebar-foreground',
              collapsed && 'justify-center px-2'
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-current')} />
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-2">
                {item.label}
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          );
        }

        return link;
      })}
    </div>
  );
}

export function AppSidebar({ collapsed, onToggle }: SidebarProps) {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo - Links to Landing Page */}
      <div className={cn('flex h-16 items-center border-b border-sidebar-border px-4', collapsed && 'justify-center px-2')}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <PiggyBank className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">NairaTrack</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-6">
          <NavSection title="Main" items={mainNav} collapsed={collapsed} />
          <NavSection title="Planning" items={planningNav} collapsed={collapsed} />
          <NavSection title="Analysis" items={analysisNav} collapsed={collapsed} />
          
          <Separator className="bg-sidebar-border" />
          
          <NavSection title="Tools" items={toolsNav} collapsed={collapsed} />
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium w-full',
            'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-sidebar text-sidebar-foreground shadow-md hover:bg-sidebar-accent"
        onClick={onToggle}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </aside>
  );
}
