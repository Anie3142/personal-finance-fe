import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatDate } from '@/lib/format';
import { GoalModal, DeleteConfirmationModal } from '@/components/modals';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const goal = { id: '1', name: 'Emergency Fund', emoji: '🛡️', target: 1000000, current: 450000, deadline: '2025-06-30' };

const contributions = [
  { id: '1', amount: 50000, date: '2024-01-15' },
  { id: '2', amount: 100000, date: '2024-01-01' },
  { id: '3', amount: 75000, date: '2023-12-15' },
  { id: '4', amount: 50000, date: '2023-12-01' },
  { id: '5', amount: 75000, date: '2023-11-15' },
  { id: '6', amount: 100000, date: '2023-11-01' },
];

// Timeline data for chart
const timelineData = [
  { month: 'Nov', actual: 100000, projected: 100000 },
  { month: 'Dec', actual: 225000, projected: 200000 },
  { month: 'Jan', actual: 450000, projected: 350000 },
  { month: 'Feb', actual: null, projected: 500000 },
  { month: 'Mar', actual: null, projected: 650000 },
  { month: 'Apr', actual: null, projected: 800000 },
  { month: 'May', actual: null, projected: 900000 },
  { month: 'Jun', actual: null, projected: 1000000 },
];

export default function GoalDetail() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const percent = (goal.current / goal.target) * 100;

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/goals">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <span className="text-3xl">{goal.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold">{goal.name}</h1>
            <p className="text-muted-foreground">Target by {formatDate(goal.deadline)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setEditModalOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="text-destructive" onClick={() => setDeleteModalOpen(true)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <p className="text-3xl font-bold">{formatCurrency(goal.current)}</p>
            <p className="text-muted-foreground">of {formatCurrency(goal.target)}</p>
          </div>
          <Progress value={percent} className="h-3 mb-4" />
          <Button className="w-full"><Plus className="h-4 w-4 mr-2" />Add Funds</Button>
        </CardContent>
      </Card>

      {/* Timeline Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Progress Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
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
                  formatter={(value: number | null, name: string) => [
                    value ? formatCurrency(value) : 'N/A',
                    name === 'actual' ? 'Actual' : 'Projected'
                  ]}
                />
                <ReferenceLine 
                  y={goal.target} 
                  stroke="hsl(var(--success))" 
                  strokeDasharray="5 5" 
                  label={{ value: 'Target', position: 'right', fill: 'hsl(var(--success))', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" /> Actual
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-6 border-t-2 border-dashed border-muted-foreground" /> Projected
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Contributions</CardTitle></CardHeader>
        <CardContent>
          {contributions.map((c) => (
            <div key={c.id} className="flex justify-between py-2 border-b last:border-0">
              <span className="text-muted-foreground">{formatDate(c.date)}</span>
              <span className="font-medium text-success">+{formatCurrency(c.amount)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <GoalModal 
        open={editModalOpen} 
        onOpenChange={setEditModalOpen}
        goal={{ id: goal.id, name: goal.name, emoji: goal.emoji, target: goal.target, current: goal.current, deadline: goal.deadline }}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Goal"
        description={`Are you sure you want to delete "${goal.name}"? This action cannot be undone.`}
        onConfirm={() => console.log('Goal deleted')}
      />
    </div>
  );
}
