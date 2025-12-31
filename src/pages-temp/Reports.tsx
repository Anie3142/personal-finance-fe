import Link from 'next/link';
import { PieChart, BarChart3, TrendingUp, LineChart, Users, Layers } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const reports = [
  { id: 'monthly', title: 'Monthly Report', description: 'Full breakdown of your month', icon: BarChart3, href: '/reports/monthly' },
  { id: 'spending', title: 'Spending by Category', description: 'See where your money goes', icon: PieChart, href: '/reports/monthly' },
  { id: 'income', title: 'Income vs Expenses', description: 'Track your cash flow', icon: TrendingUp, href: '/reports/monthly' },
  { id: 'networth', title: 'Net Worth Over Time', description: 'Watch your wealth grow', icon: LineChart, href: '/reports/net-worth' },
  { id: 'merchants', title: 'Top Merchants', description: 'Your most frequent transactions', icon: Users, href: '/reports/monthly' },
  { id: 'trends', title: 'Category Trends', description: 'Spending patterns over time', icon: Layers, href: '/reports/categories' },
];

export default function Reports() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Analyze your financial data</p>
      </div>
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
