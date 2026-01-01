'use client';

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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function TransactionNew() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [type, setType] = useState<'expense' | 'income' | 'transfer'>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [payee, setPayee] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [notes, setNotes] = useState('');

  // Fetch real categories from API
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.getCategories(),
  });

  // Fetch real accounts from API
  const { data: accountsData } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.getAccounts(),
  });

  const categories = categoriesData?.categories || [];
  const accounts = accountsData?.accounts || [];

  // Filter categories based on type (income vs expense)
  const expenseCategories = categories.filter(c => 
    !['Salary', 'Freelance', 'Investments', 'Gifts Received', 'Refunds', 'Other Income'].includes(c.name)
  );
  const incomeCategories = categories.filter(c => 
    ['Salary', 'Freelance', 'Investments', 'Gifts Received', 'Refunds', 'Other Income'].includes(c.name)
  );

  // Create transaction mutation
  const createTransactionMutation = useMutation({
    mutationFn: (data: any) => api.createManualTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: 'Transaction created',
        description: 'Your transaction has been recorded.',
      });
      router.push('/transactions');
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create transaction',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !account || !date) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    createTransactionMutation.mutate({
      type: type === 'income' ? 'credit' : 'debit',
      amount: parseFloat(amount),
      date,
      description: payee || 'Manual transaction',
      category_id: category || undefined,
      account_id: account,
      notes,
    });
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
                onValueChange={(v) => {
                  if (v) {
                    setType(v as 'expense' | 'income' | 'transfer');
                    setCategory(''); // Reset category when type changes
                  }
                }}
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
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₦</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg font-semibold"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
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
                    {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
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
            )}

            {/* Account */}
            <div className="space-y-2">
              <Label>{type === 'transfer' ? 'From Account' : 'Account'} *</Label>
              <Select value={account} onValueChange={setAccount} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
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

            <Button 
              type="submit" 
              className="w-full h-12" 
              size="lg"
              disabled={createTransactionMutation.isPending}
            >
              {createTransactionMutation.isPending ? 'Creating...' : 'Add Transaction'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
