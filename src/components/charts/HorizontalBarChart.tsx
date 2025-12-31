import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, LabelList } from 'recharts';

interface BarData {
  name: string;
  value: number;
  color: string;
}

interface HorizontalBarChartProps {
  data: BarData[];
  height?: number;
  showLabels?: boolean;
}

export function HorizontalBarChart({ data, height = 200, showLabels = true }: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 60 }}>
        <XAxis type="number" hide domain={[0, maxValue * 1.1]} />
        <YAxis 
          type="category" 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          width={100}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          {showLabels && (
            <LabelList 
              dataKey="value" 
              position="right"
              formatter={(val: number) => `₦${(val / 1000).toFixed(0)}K`}
              fill="hsl(var(--muted-foreground))"
              fontSize={12}
            />
          )}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
