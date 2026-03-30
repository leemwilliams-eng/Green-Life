// FILE: src/services/restaurant/usdaService.ts
// Green Life — USDA FoodData Central enrichment service
//
// Free, no API key required for basic searches.
// Docs: https://fdc.nal.usda.gov/api-guide.html
//
// Purpose: Enriches food emission results with real nutritional data
// (calories, protein, serving size context) to make the impact card richer.
// This is an optional enrichment — the lookup succeeds without it.

const USDA_BASE = 'https://api.nal.usda.gov/fdc/v1';
// For higher rate limits, register a free key at https://fdc.nal.usda.gov/api-key-signup.html
// and set USDA_API_KEY in your .env
const USDA_API_KEY = process.env.USDA_API_KEY ?? 'DEMO_KEY';

export interface UsdaEnrichment {
  fdc_id: number;
  description: string;
  /** kcal per 100g */
  calories_per_100g?: number;
  /** grams of protein per 100g */
  protein_g_per_100g?: number;
  /** data type: 'Survey (FNDDS)' | 'Foundation' | 'SR Legacy' | 'Branded' */
  data_type: string;
}

export class UsdaService {
  /**
   * Enrich a food name with USDA nutritional data.
   * Returns null if no match found or API unavailable — caller should handle gracefully.
   */
  async enrich(foodName: string): Promise<UsdaEnrichment | null> {
    const url = new URL(`${USDA_BASE}/foods/search`);
    url.searchParams.set('query', foodName);
    url.searchParams.set('pageSize', '3');
    url.searchParams.set('dataType', 'Survey (FNDDS),Foundation');
    url.searchParams.set('api_key', USDA_API_KEY);

    const response = await fetch(url.toString(), {
      signal: AbortSignal.timeout(5000),  // 5s timeout
    });

    if (!response.ok) return null;

    const json = await response.json() as UsdaSearchResponse;
    const food = json.foods?.[0];
    if (!food) return null;

    const calories = food.foodNutrients?.find(n =>
      n.nutrientName?.toLowerCase().includes('energy') &&
      n.unitName?.toLowerCase() === 'kcal'
    );
    const protein = food.foodNutrients?.find(n =>
      n.nutrientName?.toLowerCase().includes('protein')
    );

    return {
      fdc_id: food.fdcId,
      description: food.description,
      calories_per_100g: calories?.value,
      protein_g_per_100g: protein?.value,
      data_type: food.dataType,
    };
  }
}

// ─── USDA API response types ──────────────────────────────────────────────────
interface UsdaSearchResponse {
  foods?: UsdaFood[];
}

interface UsdaFood {
  fdcId: number;
  description: string;
  dataType: string;
  foodNutrients?: { nutrientName?: string; value?: number; unitName?: string }[];
}
