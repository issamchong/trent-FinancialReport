'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { getBusinessInsightsAction } from '@/app/actions'
import type { GenerateBusinessInsightsInput } from '@/ai/flows/generate-business-insights'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

type InsightGeneratorProps = {
  data: GenerateBusinessInsightsInput
}

export function InsightGenerator({ data }: InsightGeneratorProps) {
  const [isPending, startTransition] = useTransition()
  const [insights, setInsights] = useState<string | null>(null)
  const { toast } = useToast()

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await getBusinessInsightsAction(data)
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        })
        setInsights(null)
      } else if (result.insights) {
        setInsights(result.insights)
      }
    })
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Click the button below to use AI to analyze your current financial metrics and receive actionable insights and suggestions for business improvements.
      </p>
      
      <Button onClick={handleGenerate} disabled={isPending}>
        {isPending ? 'Generating...' : 'Generate Insights'}
      </Button>

      {isPending && (
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {insights && !isPending && (
        <Alert className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Generated Insights</AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {insights}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
