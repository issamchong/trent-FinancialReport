'use client'

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltipContent } from "@/components/ui/chart"

type OverviewChartProps = {
  data: { name: string; revenue: number; aov: number }[]
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            content={<ChartTooltipContent />}
            cursor={{ fill: 'hsl(var(--muted))', radius: 4 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4, fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          />
           <Line
            type="monotone"
            dataKey="aov"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            yAxisId="right"
            dot={{ r: 4, fill: 'hsl(var(--accent))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--accent))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
