'use server';

/**
 * @fileOverview A business insights AI agent.
 *
 * - generateBusinessInsights - A function that handles the business insights generation process.
 * - GenerateBusinessInsightsInput - The input type for the generateBusinessInsights function.
 * - GenerateBusinessInsightsOutput - The return type for the generateBusinessInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessInsightsInputSchema = z.object({
  monthlyRevenue: z.number().describe('The monthly revenue.'),
  conversionRate: z.number().describe('The conversion rate.'),
  averageOrderValue: z.number().describe('The average order value.'),
  profitability: z.number().describe('The profitability.'),
  expenseSummary: z.string().describe('The expense summary.'),
});
export type GenerateBusinessInsightsInput = z.infer<
  typeof GenerateBusinessInsightsInputSchema
>;

const GenerateBusinessInsightsOutputSchema = z.object({
  insights: z.string().describe('Actionable insights for business improvements.'),
});
export type GenerateBusinessInsightsOutput = z.infer<
  typeof GenerateBusinessInsightsOutputSchema
>;

export async function generateBusinessInsights(
  input: GenerateBusinessInsightsInput
): Promise<GenerateBusinessInsightsOutput> {
  return generateBusinessInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBusinessInsightsPrompt',
  input: {schema: GenerateBusinessInsightsInputSchema},
  output: {schema: GenerateBusinessInsightsOutputSchema},
  prompt: `You are a business consultant specializing in providing actionable insights based on financial data.

  Analyze the following financial data and provide actionable insights and suggestions for improving business performance.

  Monthly Revenue: {{monthlyRevenue}}
  Conversion Rate: {{conversionRate}}
  Average Order Value: {{averageOrderValue}}
  Profitability: {{profitability}}
  Expense Summary: {{expenseSummary}}

  Provide insights and suggestions in a concise and clear manner.
`,
});

const generateBusinessInsightsFlow = ai.defineFlow(
  {
    name: 'generateBusinessInsightsFlow',
    inputSchema: GenerateBusinessInsightsInputSchema,
    outputSchema: GenerateBusinessInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
