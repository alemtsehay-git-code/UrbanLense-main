'use server';
/**
 * @fileOverview Optimized Genkit flow for generating travel itineraries.
 * Includes improved retry logic for rate limits (429) and transient errors (503).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTravelSuggestionInputSchema = z.object({
  cityName: z.string().describe('The name of the city.'),
  countryName: z.string().describe('The name of the country.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  weatherCondition: z.string().describe('The current weather condition.'),
  humidity: z.number().describe('The current humidity percentage.'),
  windSpeed: z.number().describe('The current wind speed in km/h.'),
  population: z.number().describe('The population of the city.'),
  currency: z.string().describe('The local currency.'),
});
export type GenerateTravelSuggestionInput = z.infer<typeof GenerateTravelSuggestionInputSchema>;

const ItineraryItemSchema = z.object({
  time: z.string().describe('Period (e.g., Morning).'),
  activity: z.string().describe('Name of activity.'),
  description: z.string().describe('Brief description (max 15 words).'),
  location: z.string().describe('Place name.'),
  type: z.enum(['sightseeing', 'dining', 'relaxation', 'culture', 'shopping']).describe('Category.'),
});

const GenerateTravelSuggestionOutputSchema = z.object({
  itineraryTitle: z.string().describe('Short title.'),
  itinerary: z.array(ItineraryItemSchema).max(4).describe('4 key activities.'),
  insiderTip: z.string().describe('One concise weather-specific tip.'),
});
export type GenerateTravelSuggestionOutput = z.infer<typeof GenerateTravelSuggestionOutputSchema>;

/**
 * Enhanced retry logic to handle 429 (Rate Limit) and 503 (Busy).
 */
async function callPromptWithRetry(input: GenerateTravelSuggestionInput, retries = 2): Promise<GenerateTravelSuggestionOutput> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      const {output} = await generateTravelSuggestionPrompt(input);
      if (output) return output;
    } catch (err: any) {
      lastError = err;
      const errorMsg = err.message || '';
      // If rate limited or service busy, wait and try again
      if (errorMsg.includes('429') || errorMsg.includes('503')) {
        const waitTime = errorMsg.includes('429') ? 3000 * (i + 1) : 1000 * (i + 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

export async function generateTravelSuggestion(input: GenerateTravelSuggestionInput): Promise<GenerateTravelSuggestionOutput> {
  return generateTravelSuggestionFlow(input);
}

const generateTravelSuggestionPrompt = ai.definePrompt({
  name: 'generateTravelSuggestionPrompt',
  input: {schema: GenerateTravelSuggestionInputSchema},
  output: {schema: GenerateTravelSuggestionOutputSchema},
  prompt: `You are a precision travel concierge. Generate a fast, 4-item itinerary for {{cityName}} based on these conditions:
- Weather: {{weatherCondition}}, {{temperature}}°C
- Context: {{population}} people, {{currency}} currency

Be extremely concise. Descriptions must be under 15 words. 
Focus: Efficiency and atmospheric relevance.`,
});

const generateTravelSuggestionFlow = ai.defineFlow(
  {
    name: 'generateTravelSuggestionFlow',
    inputSchema: GenerateTravelSuggestionInputSchema,
    outputSchema: GenerateTravelSuggestionOutputSchema,
  },
  async input => {
    return callPromptWithRetry(input);
  }
);
