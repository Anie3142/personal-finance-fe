import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/format';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const categoryColors = {
  food: '#f97316',
  transport: '#3b82f6',
  shopping: '#ec4899',
  bills: '#eab308',
  entertainment: '#8b5cf6',
};

const trendData = [
  { month: 'Aug', food: 72000, transport: 38000, shopping: 45000, bills: 42000, entertainment: 15000 },
  { month: 'Sep', food: 65000, transport: 35000, shopping: 32000, bills: 45000, entertainment: 18000 },
  { month: 'Oct', food: 78000, transport: 42000, shopping: 55000, bills: 43000, entertainment: 22000 },
  { month: 'Nov', food: 68000, transport: 40000, shopping: 38000, bills: 48000, entertainment: 12000 },
  { month: 'Dec', food: 85000, transport: 45000, shopping: 62000, bills: 50000, entertainment: 28000 },
  { month: 'Jan', food: 65000, transport: 42000, shopping: 38000, bills: 48000, entertainment: 12000 },
];

const categories = [
  { key: 'food', name: 'Food & Dining', emoji: '🍕', color: categoryColors.food },
  { key: 'transport', name: 'Transportation', emoji: '🚗', color: categoryColors.transport },
  { key: 'shopping', name: 'Shopping', emoji: '🛍️', color: categoryColors.shopping },
  { key: 'bills', name: 'Bills & Utilities', emoji: '💡', color: categoryColors.bills },
  { key: 'entertainment', name: 'Entertainment', emoji: '🎬', color: categoryColors.entertainment },
];

export default function CategoryTrends() {
  const [visibleCategories, setVisibleCategories] = useState<string[]>(categories.map(c => c.key));

  const toggleCategory = (key: string) => {
    setVisibleCategories(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

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
          <h1 className="text-2xl font-bold">Category Trends</h1>
          <p className="text-muted-foreground">Spending patterns over time</p>
        </div>
      </div>

      {/* Category Toggles */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <div key={category.key} className="flex items-center gap-2">
                <Checkbox
                  id={category.key}
                  checked={visibleCategories.includes(category.key)}
                  onCheckedChange={() => toggleCategory(category.key)}
                />
                <Label 
                  htmlFor={category.key} 
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.emoji}</span>
                  <span className="text-sm">{category.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">6 Month Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
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
                  tickFormatter={(value) => `₦${(value / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => {
                    const category = categories.find(c => c.key === name);
                    return [formatCurrency(value), category?.name || name];
                  }}
                />
                {categories.map((category) => (
                  visibleCategories.includes(category.key) && (
                    <Line
                      key={category.key}
                      type="monotone"
                      dataKey={category.key}
                      stroke={category.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5, fill: category.color }}
                    />
                  )
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Averages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => {
              const values = trendData.map(d => d[category.key as keyof typeof d] as number);
              const average = values.reduce((a, b) => a + b, 0) / values.length;
              const latest = values[values.length - 1];
              const change = ((latest - average) / average) * 100;

              return (
                <div key={category.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <span 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.emoji}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(average)}</p>
                    <p className={`text-sm ${change > 0 ? 'text-destructive' : 'text-success'}`}>
                      {change > 0 ? '+' : ''}{change.toFixed(1)}% vs avg
                    </p>
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
