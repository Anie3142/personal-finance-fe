import { useState } from 'react';
import Link from 'next/link';
import { PieChart, BarChart3, TrendingUp, LineChart, Users, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CashFlowChart } from '@/components/charts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reports = [
  { id: 'monthly', title: 'Monthly Report', description: 'Comprehensive monthly overview', icon: BarChart3, href: '/reports/monthly' },
  { id: 'spending', title: 'Spending by Category', description: 'See where your money goes', icon: PieChart, href: '/reports/monthly' },
  { id: 'income', title: 'Income vs Expenses', description: 'Track your cash flow', icon: TrendingUp, href: '/reports/monthly' },
  { id: 'networth', title: 'Net Worth Over Time', description: 'Watch your wealth grow', icon: LineChart, href: '/reports/net-worth' },
  { id: 'merchants', title: 'Top Merchants', description: 'Your most frequent transactions', icon: Users, href: '/reports/monthly' },
  { id: 'trends', title: 'Category Trends', description: 'Spending patterns over time', icon: Layers, href: '/reports/categories' },
];

const mockMonthlyData = [
  { month: 'Jan', income: 450000, expenses: 320000 },
  { month: 'Feb', income: 480000, expenses: 350000 },
  { month: 'Mar', income: 450000, expenses: 290000 },
  { month: 'Apr', income: 520000, expenses: 410000 },
  { month: 'May', income: 490000, expenses: 380000 },
  { month: 'Jun', income: 550000, expenses: 420000 },
];

const mockYearlyData = [
  { month: '2019', income: 4200000, expenses: 3500000 },
  { month: '2020', income: 4800000, expenses: 3900000 },
  { month: '2021', income: 5500000, expenses: 4100000 },
  { month: '2022', income: 6200000, expenses: 5000000 },
  { month: '2023', income: 7500000, expenses: 6000000 },
];

export default function Reports() {
  const [period, setPeriod] = useState('monthly');
  const [year, setYear] = useState('2024');

  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analysis</h1>
          <p className="text-muted-foreground">Deep dive into your financial health</p>
        </div>

        <div className="flex items-center gap-2">
          {period === 'monthly' && (
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Chart Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cash Flow Overview</CardTitle>
          <CardDescription>
            {period === 'monthly' ? `Income and expenses for ${year}` : 'Year-over-year comparison'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <CashFlowChart data={period === 'monthly' ? mockMonthlyData : mockYearlyData} height={300} />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Reports Grid */}
      <h2 className="text-lg font-semibold mb-4">Detailed Reports</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Link key={report.id} href={report.href}>
            <Card className="hover:border-primary/50 transition-colors h-full">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <report.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
