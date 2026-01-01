import { useState, useEffect } from 'react';
import { Target, Calendar, Wallet, PiggyBank } from 'lucide-react';
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

interface Goal {
  id?: string;
  name: string;
  emoji: string;
  target: number;
  current: number;
  deadline?: string;
  linkedAccount?: string;
}

interface GoalModalProps {
  goal?: Goal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (goal: Goal) => void;
}

const emojis = ['🎯', '🛡️', '💻', '✈️', '🏠', '🚗', '📚', '💍', '🎓', '🏖️', '💰', '🎁'];

export function GoalModal({ goal, open, onOpenChange, onSave }: GoalModalProps) {
  const [name, setName] = useState(goal?.name || '');
  const [emoji, setEmoji] = useState(goal?.emoji || '🎯');
  const [target, setTarget] = useState(goal?.target?.toString() || '');
  const [initialAmount, setInitialAmount] = useState('0');
  const [deadline, setDeadline] = useState<Date | undefined>(
    goal?.deadline ? new Date(goal.deadline) : undefined
  );
  const [linkedAccount, setLinkedAccount] = useState(goal?.linkedAccount || '');

  // Fetch real accounts from API
  const { data: accountsData } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.getAccounts(),
    enabled: open,
  });

  const accounts = accountsData?.accounts || [];

  // Reset form when modal opens/closes or goal changes
  useEffect(() => {
    if (open) {
      setName(goal?.name || '');
      setEmoji(goal?.emoji || '🎯');
      setTarget(goal?.target?.toString() || '');
      setInitialAmount('0');
      setDeadline(goal?.deadline ? new Date(goal.deadline) : undefined);
      setLinkedAccount(goal?.linkedAccount || '');
    }
  }, [open, goal]);

  const handleSave = () => {
    if (!name || !target) return;

    const newGoal: Goal = {
      id: goal?.id,
      name,
      emoji,
      target: parseFloat(target),
      current: goal?.current || parseFloat(initialAmount) || 0,
      deadline: deadline?.toISOString().split('T')[0],
      linkedAccount: linkedAccount || undefined,  // This is now the actual UUID from the API
    };

    onSave?.(newGoal);
    onOpenChange(false);
  };

  const isEditing = !!goal?.id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Goal' : 'Create New Goal'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update your savings goal details' : 'Set up a new savings goal to track your progress'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Name with Emoji */}
          <div className="space-y-2">
            <Label>Goal Name</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-14 text-xl">
                    {emoji}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={cn(
                          'h-10 w-10 rounded-lg text-xl flex items-center justify-center hover:bg-secondary transition-colors',
                          emoji === e && 'bg-primary/20'
                        )}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Input
                placeholder="e.g., Emergency Fund"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label>Target Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
              <Input
                type="number"
                placeholder="1,000,000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Initial Contribution (only for new goals) */}
          {!isEditing && (
            <div className="space-y-2">
              <Label>Initial Contribution (Optional)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  type="number"
                  placeholder="0"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          )}

          {/* Target Date */}
          <div className="space-y-2">
            <Label>Target Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !deadline && 'text-muted-foreground'
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {deadline ? format(deadline, 'PPP') : 'Pick a target date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Link to Account */}
          <div className="space-y-2">
            <Label>Link to Account (Optional)</Label>
            <Select value={linkedAccount} onValueChange={setLinkedAccount}>
              <SelectTrigger>
                <Wallet className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No linked account</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name || !target}>
            <PiggyBank className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Create Goal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
