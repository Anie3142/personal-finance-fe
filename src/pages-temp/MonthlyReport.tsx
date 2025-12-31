import Link from 'next/link';
import { ArrowLeft, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const summary = { income: 800000, expenses: 285000, net: 515000, savingsRate: 64 };
const prevMonth = { income: 720000, expenses: 310000, net: 410000, savingsRate: 57 };

const categoryData = [
  { name: 'Food', amount: 80000, color: '#f97316' },
  { name: 'Transport', amount: 45000, color: '#3b82f6' },
  { name: 'Bills', amount: 65000, color: '#eab308' },
  { name: 'Shopping', amount: 40000, color: '#ec4899' },
  { name: 'Entertainment', amount: 35000, color: '#8b5cf6' },
  { name: 'Other', amount: 20000, color: '#6b7280' },
];

const incomeData = [
  { name: 'Salary', amount: 650000, color: '#10b981' },
  { name: 'Freelance', amount: 120000, color: '#06b6d4' },
  { name: 'Investments', amount: 30000, color: '#8b5cf6' },
];

const topMerchants = [
  { rank: 1, name: 'Shoprite', category: 'Food', count: 12, total: 45000 },
  { rank: 2, name: 'Shell', category: 'Transport', count: 8, total: 32000 },
  { rank: 3, name: 'Chicken Republic', category: 'Food', count: 15, total: 28000 },
  { rank: 4, name: 'DSTV', category: 'Bills', count: 1, total: 24500 },
  { rank: 5, name: 'Uber', category: 'Transport', count: 22, total: 18000 },
];

const budgetPerformance = [
  { name: 'Food', budget: 100000, spent: 80000 },
  { name: 'Transport', budget: 50000, spent: 45000 },
  { name: 'Entertainment', budget: 40000, spent: 35000 },
  { name: 'Shopping', budget: 30000, spent: 40000 },
];

function DeltaCard({ label, current, previous }: { label: string; current: number; previous: number }) {
  const delta = ((current - previous) / previous) * 100;
  const isPositive = delta > 0;
  const isExpense = label === 'Expenses';
  const good = isExpense ? !isPositive : isPositive;

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{formatCurrency(current)}</p>
        <div className={`flex items-center gap-1 text-sm ${good ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{Math.abs(delta).toFixed(1)}% vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MonthlyReport() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/reports"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-2xl font-bold">January 2025 Report</h1>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export PDF</Button>
      </div>

      {/* Summary with Deltas */}
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        <DeltaCard label="Income" current={summary.income} previous={prevMonth.income} />
        <DeltaCard label="Expenses" current={summary.expenses} previous={prevMonth.expenses} />
        <DeltaCard label="Net Savings" current={summary.net} previous={prevMonth.net} />
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Savings Rate</p>
            <p className="text-2xl font-bold text-primary">{summary.savingsRate}%</p>
            <p className="text-sm text-success">+{summary.savingsRate - prevMonth.savingsRate}% vs last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Spending by Category */}
        <Card>
          <CardHeader><CardTitle>Spending by Category</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={100} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Income by Source */}
        <Card>
          <CardHeader><CardTitle>Income by Source</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={100} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {incomeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Merchants */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Top Merchants</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Transactions</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topMerchants.map((m) => (
                <TableRow key={m.rank}>
                  <TableCell className="font-medium">{m.rank}</TableCell>
                  <TableCell>{m.name}</TableCell>
                  <TableCell><span className="rounded-full bg-secondary px-2 py-1 text-xs">{m.category}</span></TableCell>
                  <TableCell className="text-right">{m.count}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(m.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Budget Performance */}
      <Card>
        <CardHeader><CardTitle>Budget Performance</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetPerformance.map((b) => {
              const pct = (b.spent / b.budget) * 100;
              const over = pct > 100;
              return (
                <div key={b.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{b.name}</span>
                    <span className={over ? 'text-destructive' : 'text-muted-foreground'}>
                      {formatCurrency(b.spent)} / {formatCurrency(b.budget)}
                      {over && <span className="ml-2 text-xs">Over by {formatCurrency(b.spent - b.budget)}</span>}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${over ? 'bg-destructive' : 'bg-primary'}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
