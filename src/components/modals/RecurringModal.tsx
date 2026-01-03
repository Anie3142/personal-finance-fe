import { useState, useEffect } from 'react';
import { Calendar, Repeat, Bell, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface RecurringTransaction {
  id?: string;
  name: string;
  icon: string;
  amount: number;
  frequency: 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';
  nextDate: string;
  category?: string;
  account?: string;
  reminderDays?: number;
  type: 'bill' | 'income';
}

interface RecurringModalProps {
  recurring?: RecurringTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (recurring: RecurringTransaction) => void;
}

const icons = ['🎬', '📺', '🎵', '🏠', '💡', '📱', '🌐', '💰', '💻', '🚗', '🏋️', '📦'];

export function RecurringModal({ recurring, open, onOpenChange, onSave }: RecurringModalProps) {
  const [name, setName] = useState(recurring?.name || '');
  const [icon, setIcon] = useState(recurring?.icon || '📦');
  const [amount, setAmount] = useState(recurring?.amount?.toString() || '');
  const [frequency, setFrequency] = useState<RecurringTransaction['frequency']>(recurring?.frequency || 'Monthly');
  const [nextDate, setNextDate] = useState<Date | undefined>(
    recurring?.nextDate ? new Date(recurring.nextDate) : undefined
  );
  const [category, setCategory] = useState(recurring?.category || '');
  const [account, setAccount] = useState(recurring?.account || '');
  const [reminderDays, setReminderDays] = useState(recurring?.reminderDays?.toString() || '3');
  const [type, setType] = useState<'bill' | 'income'>(recurring?.type || 'bill');

  // Fetch real categories from API
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
    enabled: open,
  });

  // Fetch real accounts from API
  const { data: accountsData } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.getAccounts(),
    enabled: open,
  });

  const categories = categoriesData?.categories || [];
  const accounts = accountsData?.accounts || [];

  // Reset form when modal opens/closes or recurring changes
  useEffect(() => {
    if (open) {
      let cleanName = recurring?.name || '';
      let detectedType = recurring?.type || 'bill';

      // Workaround: Detect type from name prefix because backend doesn't persist type
      if (cleanName.startsWith('[Income] ')) {
        cleanName = cleanName.replace('[Income] ', '');
        detectedType = 'income';
      }

      setName(cleanName);
      setIcon(recurring?.icon || '📦');
      setAmount(recurring?.amount?.toString() || '');
      setFrequency(recurring?.frequency || 'Monthly');
      setNextDate(recurring?.nextDate ? new Date(recurring.nextDate) : undefined);
      setCategory(recurring?.category || '');
      setAccount(recurring?.account || '');
      setReminderDays(recurring?.reminderDays?.toString() || '3');
      setType(detectedType);
    }
  }, [open, recurring]);

  const handleSave = () => {
    if (!name || !amount || !nextDate) return;

    const newRecurring: RecurringTransaction = {
      id: recurring?.id,
      name,
      icon,
      amount: parseFloat(amount),
      frequency,
      nextDate: nextDate.toISOString().split('T')[0],
      category,  // This is now the actual UUID from the API
      account,   // This is now the actual UUID from the API
      reminderDays: parseInt(reminderDays) || 3,
      type,
    };

    onSave?.(newRecurring);
    onOpenChange(false);
  };

  const isEditing = !!recurring?.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Recurring Transaction' : 'Add Recurring Transaction'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your recurring transaction details' : 'Set up a recurring bill or income'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Type Toggle */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === 'bill' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setType('bill')}
            >
              Bill / Subscription
            </Button>
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setType('income')}
            >
              Income
            </Button>
          </div>

          {/* Name with Icon */}
          <div className="space-y-2">
            <Label>Name</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-14 text-xl">
                    {icon}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-6 gap-2">
                    {icons.map((e) => (
                      <button
                        key={e}
                        onClick={() => setIcon(e)}
                        className={cn(
                          'h-10 w-10 rounded-lg text-xl flex items-center justify-center hover:bg-secondary transition-colors',
                          icon === e && 'bg-primary/20'
                        )}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Input
                placeholder="e.g., Netflix"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
              <Input
                type="number"
                placeholder="4,400"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select value={frequency} onValueChange={(v) => setFrequency(v as RecurringTransaction['frequency'])}>
              <SelectTrigger>
                <Repeat className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Next Date */}
          <div className="space-y-2">
            <Label>Next Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !nextDate && 'text-muted-foreground'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {nextDate ? format(nextDate, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={nextDate}
                  onSelect={setNextDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category & Account Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reminder */}
          <div className="space-y-2">
            <Label>Remind me before</Label>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={reminderDays}
                onChange={(e) => setReminderDays(e.target.value)}
                className="w-20"
                min={0}
                max={30}
              />
              <span className="text-sm text-muted-foreground">days before due date</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name || !amount || !nextDate}>
            {isEditing ? 'Save Changes' : 'Add Recurring'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
