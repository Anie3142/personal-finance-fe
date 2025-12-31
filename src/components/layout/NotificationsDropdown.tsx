import { useState } from 'react';
import { Bell, Check, AlertTriangle, TrendingUp, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'alert' | 'insight' | 'reminder' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Budget Alert',
    message: 'Food & Dining budget is at 85% with 10 days left',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Bill Due Soon',
    message: 'Netflix subscription due in 3 days - ₦4,500',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'insight',
    title: 'Spending Insight',
    message: 'You spent 23% less on transportation this month!',
    time: '1 day ago',
    read: false,
  },
  {
    id: '4',
    type: 'success',
    title: 'Goal Milestone',
    message: 'Emergency Fund reached 50% of target!',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'alert',
    title: 'Large Transaction',
    message: 'Unusual transaction of ₦150,000 detected',
    time: '3 days ago',
    read: true,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case 'insight':
      return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    case 'reminder':
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case 'success':
      return <Check className="h-4 w-4 text-emerald-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 px-1 text-[10px]">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex cursor-pointer flex-col items-start gap-1 p-3',
                  !notification.read && 'bg-muted/50'
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full items-start gap-2">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
