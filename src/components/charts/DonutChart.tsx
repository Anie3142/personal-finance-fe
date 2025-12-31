import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DonutChartProps {
  value: number;
  total: number;
  color?: string;
  bgColor?: string;
  size?: number;
}

export function DonutChart({ 
  value, 
  total, 
  color = 'hsl(var(--primary))', 
  bgColor = 'hsl(var(--muted))',
  size = 120 
}: DonutChartProps) {
  const percentage = Math.min((value / total) * 100, 100);
  const remaining = Math.max(100 - percentage, 0);

  const data = [
    { name: 'used', value: percentage },
    { name: 'remaining', value: remaining },
  ];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill={bgColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold">{Math.round(percentage)}%</span>
      </div>
    </div>
  );
}
