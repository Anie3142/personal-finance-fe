import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';

interface SparklineChartProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

export function SparklineChart({ data, color = 'hsl(var(--primary))', height = 40 }: SparklineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <YAxis hide domain={['dataMin', 'dataMax']} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
