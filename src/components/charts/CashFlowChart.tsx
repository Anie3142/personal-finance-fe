import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
}

interface CashFlowChartProps {
  data: CashFlowData[];
  height?: number;
}

export function CashFlowChart({ data, height = 250 }: CashFlowChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
          tickFormatter={(value) => `₦${(value / 1000)}K`}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--popover))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            color: 'hsl(var(--popover-foreground))',
          }}
          formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="1"
          stroke="hsl(var(--success))"
          fill="hsl(var(--success))"
          fillOpacity={0.3}
          name="Income"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="2"
          stroke="hsl(var(--destructive))"
          fill="hsl(var(--destructive))"
          fillOpacity={0.3}
          name="Expenses"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
