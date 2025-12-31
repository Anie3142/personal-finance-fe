import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, Trash2, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DeleteConfirmationModal } from '@/components/modals';
import { formatCurrency, formatDate } from '@/lib/format';
import { toast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const budget = {
  id: '1',
  category: 'Food & Dining',
  emoji: '🍕',
  budgeted: 80000,
  spent: 45000,
  color: '#f97316',
  period: 'Monthly',
  startDate: '2025-01-01',
};

const dailySpending = [
  { day: '1', amount: 3500 },
  { day: '5', amount: 8000 },
  { day: '8', amount: 5500 },
  { day: '12', amount: 7200 },
  { day: '15', amount: 4800 },
  { day: '18', amount: 6500 },
  { day: '22', amount: 9500 },
];

const transactions = [
  { id: '1', merchant: 'Shoprite', amount: 15000, date: '2024-01-22' },
  { id: '2', merchant: 'Chicken Republic', amount: 4500, date: '2024-01-20' },
  { id: '3', merchant: 'The Place', amount: 8500, date: '2024-01-18' },
  { id: '4', merchant: 'Dominos Pizza', amount: 7000, date: '2024-01-15' },
  { id: '5', merchant: 'Kilimanjaro', amount: 5000, date: '2024-01-12' },
  { id: '6', merchant: 'Cold Stone', amount: 5000, date: '2024-01-08' },
];

const categories = [
  { value: 'food', label: 'Food & Dining', emoji: '🍕' },
  { value: 'transport', label: 'Transportation', emoji: '🚗' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'bills', label: 'Bills & Utilities', emoji: '💡' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { value: 'healthcare', label: 'Healthcare', emoji: '🏥' },
];

export default function BudgetDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(budget.budgeted.toString());
  const [editPeriod, setEditPeriod] = useState(budget.period);
  
  const percent = Math.min(100, (budget.spent / budget.budgeted) * 100);
  const remaining = budget.budgeted - budget.spent;
  const dailyAverage = Math.round(budget.spent / 22);
  const projectedTotal = Math.round(dailyAverage * 30);

  const pieData = [
    { name: 'Spent', value: budget.spent, color: budget.color },
    { name: 'Remaining', value: Math.max(0, remaining), color: 'hsl(var(--muted))' },
  ];

  const handleEditSave = () => {
    toast({
      title: 'Budget updated',
      description: `${budget.category} budget has been updated to ${formatCurrency(Number(editAmount))}.`,
    });
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    toast({
      title: 'Budget deleted',
      description: `${budget.category} budget has been deleted.`,
    });
    router.push('/budgets');
  };

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/budgets">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{budget.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold">{budget.category}</h1>
              <p className="text-muted-foreground">{budget.period} budget</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setEditDialogOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-destructive" onClick={() => setDeleteModalOpen(true)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-8">
              <div className="w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Spent</p>
                  <p className="text-3xl font-bold">{formatCurrency(budget.spent)}</p>
                  <p className="text-muted-foreground">of {formatCurrency(budget.budgeted)}</p>
                </div>
                <Progress value={percent} className="h-3 mb-2" />
                <p className={`text-sm ${remaining < 0 ? 'text-destructive' : 'text-success'}`}>
                  {formatCurrency(Math.abs(remaining))} {remaining < 0 ? 'over budget' : 'remaining'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily average</span>
              <span className="font-medium">{formatCurrency(dailyAverage)}/day</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projected total</span>
              <span className={`font-medium ${projectedTotal > budget.budgeted ? 'text-warning' : ''}`}>
                {formatCurrency(projectedTotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days remaining</span>
              <span className="font-medium">8 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transactions</span>
              <span className="font-medium">{transactions.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Daily Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySpending}>
                <defs>
                  <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={budget.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={budget.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Spent']}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={budget.color}
                  strokeWidth={2}
                  fill="url(#spendingGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Transactions</CardTitle>
          <Link href="/transactions">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium">{tx.merchant}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(tx.date)}</p>
                  </div>
                </div>
                <span className="font-medium">-{formatCurrency(tx.amount)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Budget Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                <span className="text-xl">{budget.emoji}</span>
                <span className="font-medium">{budget.category}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
                <Input
                  id="amount"
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="pl-8"
                  placeholder="80000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select value={editPeriod} onValueChange={setEditPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Budget"
        description={`Are you sure you want to delete the ${budget.category} budget? This will not delete any transactions, but you'll lose your budget tracking for this category.`}
        confirmText="DELETE"
        requireConfirmation={true}
        onConfirm={handleDelete}
      />
    </div>
  );
}
