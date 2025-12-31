import { useState } from 'react';
import { X, Calendar, Tag, FileText, Repeat, Eye, Trash2, Split, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatDate } from '@/lib/format';

interface Transaction {
  id: string;
  merchant: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  category: string;
  categoryColor?: string;
  account?: string;
  isManual?: boolean;
}

interface TransactionDetailDrawerProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

const categories = [
  { id: 'food', name: 'Food & Dining', emoji: '🍕' },
  { id: 'transport', name: 'Transportation', emoji: '🚗' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
  { id: 'bills', name: 'Bills & Utilities', emoji: '💡' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬' },
  { id: 'healthcare', name: 'Healthcare', emoji: '🏥' },
  { id: 'salary', name: 'Salary', emoji: '💰' },
  { id: 'freelance', name: 'Freelance', emoji: '💻' },
];

export function TransactionDetailDrawer({
  transaction,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: TransactionDetailDrawerProps) {
  const [category, setCategory] = useState(transaction?.category || '');
  const [notes, setNotes] = useState('');
  const [markRecurring, setMarkRecurring] = useState(false);
  const [excludeFromReports, setExcludeFromReports] = useState(false);

  if (!transaction) return null;

  const handleSave = () => {
    if (onSave) {
      onSave({ ...transaction, category });
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Transaction Details</SheetTitle>
          <SheetDescription>View and edit transaction information</SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Transaction Summary */}
          <div className="text-center pb-4 border-b border-border">
            <p className="text-3xl font-bold mb-2">
              <span className={transaction.type === 'credit' ? 'text-success' : ''}>
                {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </p>
            <p className="text-lg font-medium">{transaction.merchant}</p>
            <p className="text-sm text-muted-foreground">{transaction.description}</p>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Date</span>
              </div>
              <span className="font-medium">{formatDate(transaction.date)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span className="text-sm">Account</span>
              </div>
              <span className="font-medium">{transaction.account || 'GTBank Savings'}</span>
            </div>
          </div>

          <Separator />

          {/* Category Selector */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    <span className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              placeholder="Add notes about this transaction..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-muted-foreground" />
                <Label className="cursor-pointer">Mark as recurring</Label>
              </div>
              <Switch checked={markRecurring} onCheckedChange={setMarkRecurring} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <Label className="cursor-pointer">Exclude from reports</Label>
              </div>
              <Switch checked={excludeFromReports} onCheckedChange={setExcludeFromReports} />
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Split className="h-4 w-4 mr-2" />
              Split Transaction
            </Button>
            
            {transaction.isManual && (
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={() => onDelete?.(transaction.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Transaction
              </Button>
            )}
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
