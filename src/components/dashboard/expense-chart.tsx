'use client'

import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts'
import { ChartTooltipContent } from '@/components/ui/chart'

type ExpenseChartProps = {
  data: { name: string; value: number; fill: string }[]
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<ChartTooltipContent />} />
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={10}
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
