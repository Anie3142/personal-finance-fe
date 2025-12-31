import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle, X, Check, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

const insights = [
  { id: '1', type: 'warning', icon: TrendingUp, title: 'Food spending up', message: 'You spent ₦23,000 more on Food this month compared to last month. Consider meal planning.' },
  { id: '2', type: 'success', icon: TrendingDown, title: 'Electricity savings', message: 'Your electricity bill dropped 15% this month. Great job conserving energy!' },
  { id: '3', type: 'alert', icon: AlertTriangle, title: 'Budget warning', message: "You've used 90% of your Entertainment budget with 10 days remaining." },
  { id: '4', type: 'tip', icon: Lightbulb, title: 'Goal ahead of schedule', message: "At this rate, you'll reach your vacation goal 2 months early!" },
];

const spendingTrends = [
  { month: 'Aug', Food: 65000, Transport: 35000, Entertainment: 28000, Shopping: 42000 },
  { month: 'Sep', Food: 72000, Transport: 38000, Entertainment: 32000, Shopping: 35000 },
  { month: 'Oct', Food: 68000, Transport: 42000, Entertainment: 25000, Shopping: 48000 },
  { month: 'Nov', Food: 75000, Transport: 40000, Entertainment: 30000, Shopping: 38000 },
  { month: 'Dec', Food: 85000, Transport: 45000, Entertainment: 45000, Shopping: 55000 },
  { month: 'Jan', Food: 80000, Transport: 45000, Entertainment: 35000, Shopping: 40000 },
];

const anomalies = [
  { id: '1', merchant: 'POS WITHDRAWAL', amount: 150000, date: 'Jan 24, 2025', description: 'Unusually large cash withdrawal' },
  { id: '2', merchant: 'UNKNOWN TRANSFER', amount: 75000, date: 'Jan 22, 2025', description: 'Transfer to unrecognized account' },
];

export default function Insights() {
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([]);
  const [resolvedAnomalies, setResolvedAnomalies] = useState<string[]>([]);

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-muted-foreground">AI-powered financial insights</p>
      </div>

      {/* AI Insights */}
      <div className="space-y-4 max-w-2xl mb-8">
        {insights.filter(i => !dismissedInsights.includes(i.id)).map((insight) => (
          <Card key={insight.id} className={insight.type === 'alert' ? 'border-warning/50' : insight.type === 'success' ? 'border-success/50' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  insight.type === 'warning' ? 'bg-warning/10 text-warning' :
                  insight.type === 'success' ? 'bg-success/10 text-success' :
                  insight.type === 'alert' ? 'bg-destructive/10 text-destructive' :
                  'bg-primary/10 text-primary'
                }`}>
                  <insight.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.message}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDismissedInsights(p => [...p, insight.id])}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spending Trends Chart */}
      <Card className="mb-8">
        <CardHeader><CardTitle>Spending Trends</CardTitle></CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingTrends}>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₦${v/1000}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="Food" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Transport" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Entertainment" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Shopping" stroke="#ec4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <Card>
        <CardHeader><CardTitle>Unusual Activity</CardTitle></CardHeader>
        <CardContent>
          {anomalies.filter(a => !resolvedAnomalies.includes(a.id)).length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No unusual activity detected</p>
          ) : (
            <div className="space-y-4">
              {anomalies.filter(a => !resolvedAnomalies.includes(a.id)).map((anomaly) => (
                <div key={anomaly.id} className="flex items-center justify-between p-4 rounded-lg border border-warning/50 bg-warning/5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="font-medium">{anomaly.merchant}</span>
                      <span className="text-sm text-muted-foreground">• {anomaly.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                    <p className="text-lg font-bold text-warning mt-1">{formatCurrency(anomaly.amount)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setResolvedAnomalies(p => [...p, anomaly.id])}>
                      <Check className="h-4 w-4 mr-1" /> This is fine
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Flag className="h-4 w-4 mr-1" /> Flag as suspicious
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
