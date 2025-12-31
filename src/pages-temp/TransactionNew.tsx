import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const categories = {
  expense: [
    { value: 'food', label: '🍕 Food & Dining' },
    { value: 'transport', label: '🚗 Transportation' },
    { value: 'shopping', label: '🛍️ Shopping' },
    { value: 'bills', label: '💡 Bills & Utilities' },
    { value: 'entertainment', label: '🎬 Entertainment' },
    { value: 'health', label: '🏥 Healthcare' },
    { value: 'education', label: '📚 Education' },
  ],
  income: [
    { value: 'salary', label: '💰 Salary' },
    { value: 'freelance', label: '💻 Freelance' },
    { value: 'investment', label: '📈 Investments' },
    { value: 'gift', label: '🎁 Gifts Received' },
    { value: 'refund', label: '💵 Refunds' },
    { value: 'other', label: '📥 Other Income' },
  ],
};

const accounts = [
  { value: 'gtbank', label: 'GTBank Savings' },
  { value: 'access', label: 'Access Current' },
  { value: 'zenith', label: 'Zenith Salary' },
  { value: 'cash', label: 'Cash Wallet' },
];

export default function TransactionNew() {
  const router = useRouter();
  const [type, setType] = useState<'expense' | 'income' | 'transfer'>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [payee, setPayee] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to API
    router.push('/transactions');
  };

  return (
    <div className="container py-6 max-w-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/transactions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Add Transaction</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>Record a manual transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type toggle */}
            <div className="space-y-2">
              <Label>Type</Label>
              <ToggleGroup
                type="single"
                value={type}
                onValueChange={(v) => v && setType(v as 'expense' | 'income' | 'transfer')}
                className="justify-start"
              >
                <ToggleGroupItem value="expense" className="flex-1 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground">
                  Expense
                </ToggleGroupItem>
                <ToggleGroupItem value="income" className="flex-1 data-[state=on]:bg-success data-[state=on]:text-success-foreground">
                  Income
                </ToggleGroupItem>
                <ToggleGroupItem value="transfer" className="flex-1 data-[state=on]:bg-info data-[state=on]:text-info-foreground">
                  Transfer
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg font-semibold"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Payee */}
            <div className="space-y-2">
              <Label htmlFor="payee">{type === 'income' ? 'Payer' : 'Payee'} / Merchant</Label>
              <Input
                id="payee"
                placeholder={type === 'income' ? 'e.g., Tech Corp' : 'e.g., Shoprite'}
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
              />
            </div>

            {/* Category */}
            {type !== 'transfer' && (
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[type === 'income' ? 'income' : 'expense'].map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Account */}
            <div className="space-y-2">
              <Label>{type === 'transfer' ? 'From Account' : 'Account'}</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc.value} value={acc.value}>
                      {acc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Account for transfers */}
            {type === 'transfer' && (
              <div className="space-y-2">
                <Label>To Account</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.value} value={acc.value}>
                        {acc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full h-12" size="lg">
              Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
