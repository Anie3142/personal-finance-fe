import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/format';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const netWorthData = [
  { month: 'Jan', value: 1850000 },
  { month: 'Feb', value: 1920000 },
  { month: 'Mar', value: 1980000 },
  { month: 'Apr', value: 2050000 },
  { month: 'May', value: 2100000 },
  { month: 'Jun', value: 2180000 },
  { month: 'Jul', value: 2220000 },
  { month: 'Aug', value: 2280000 },
  { month: 'Sep', value: 2320000 },
  { month: 'Oct', value: 2380000 },
  { month: 'Nov', value: 2420000 },
  { month: 'Dec', value: 2450000 },
];

const accountBreakdown = [
  { name: 'GTBank Savings', balance: 850000, change: 45000, changePercent: 5.6 },
  { name: 'Access Current', balance: 1250000, change: 65000, changePercent: 5.5 },
  { name: 'Zenith Savings', balance: 350000, change: 15000, changePercent: 4.5 },
];

export default function NetWorthReport() {
  const currentNetWorth = 2450000;
  const previousNetWorth = 2325000;
  const monthlyChange = currentNetWorth - previousNetWorth;
  const yearlyChange = currentNetWorth - 1850000;

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/reports">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Net Worth Over Time</h1>
          <p className="text-muted-foreground">Track your wealth growth</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Current Net Worth</p>
            <p className="text-2xl font-bold">{formatCurrency(currentNetWorth)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Monthly Change</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-success">+{formatCurrency(monthlyChange)}</p>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Yearly Change</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-success">+{formatCurrency(yearlyChange)}</p>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Net Worth Trend</CardTitle>
            <Tabs defaultValue="1y">
              <TabsList className="h-8">
                <TabsTrigger value="6m" className="text-xs px-3">6M</TabsTrigger>
                <TabsTrigger value="1y" className="text-xs px-3">1Y</TabsTrigger>
                <TabsTrigger value="all" className="text-xs px-3">All</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={netWorthData}>
                <defs>
                  <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Net Worth']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Account Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accountBreakdown.map((account) => (
              <div key={account.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {account.change > 0 ? '+' : ''}{formatCurrency(account.change)} ({account.changePercent}%)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatCurrency(account.balance)}</p>
                  {account.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-success inline" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive inline" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
