'use server';

import { generateBusinessInsights, GenerateBusinessInsightsInput } from '@/ai/flows/generate-business-insights';
import { z } from 'zod';

const ActionInput = z.object({
  monthlyRevenue: z.number(),
  conversionRate: z.number(),
  averageOrderValue: z.number(),
  profitability: z.number(),
  expenseSummary: z.string(),
});

export async function getBusinessInsightsAction(input: GenerateBusinessInsightsInput) {
  const validatedInput = ActionInput.safeParse(input);
  if (!validatedInput.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const result = await generateBusinessInsights(validatedInput.data);
    return { insights: result.insights };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate insights. Please try again.' };
  }
}
