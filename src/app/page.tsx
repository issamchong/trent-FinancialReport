import { DollarSign, Users, CreditCard, Activity, Sparkles } from "lucide-react"

import { financialData } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { InsightGenerator } from "@/components/dashboard/insight-generator"
import { PdfExportButton } from "@/components/pdf-export-button"
import { Logo } from "@/components/icons"
import Link from "next/link"

export default function Home() {
  const { monthlyRevenue, conversionRate, averageOrderValue, profitability, expenseSummary, revenueTrend } = financialData

  const totalExpenses = Object.values(expenseSummary).reduce((sum, value) => sum + value, 0)

  const expenseData = Object.entries(expenseSummary).map(([name, value], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: `var(--chart-${index + 1})`,
  }))

  const aiInput = {
    monthlyRevenue,
    conversionRate,
    averageOrderValue,
    profitability,
    expenseSummary: `Total expenses: $${totalExpenses.toLocaleString()}. Breakdown: ${JSON.stringify(
      expenseSummary
    )}`,
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6 no-print">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">InsightBoard</span>
        </Link>
        <div className="ml-auto">
          <PdfExportButton />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={`$${monthlyRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            change="+20.1% from last month"
            icon={DollarSign}
          />
          <MetricCard
            title="Profitability"
            value={`$${profitability.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            change="+18.1% from last month"
            icon={Activity}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${(conversionRate * 100).toFixed(1)}%`}
            change="+5.2% from last month"
            icon={Users}
          />
          <MetricCard
            title="Avg. Order Value"
            value={`$${averageOrderValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
            change="+8.3% from last month"
            icon={CreditCard}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-5 print-break-after">
          <Card className="lg:col-span-3 print-card">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <OverviewChart data={revenueTrend} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 print-card">
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseChart data={expenseData} />
            </CardContent>
          </Card>
        </div>

        <Card className="print-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Trend Analysis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <InsightGenerator data={aiInput} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
