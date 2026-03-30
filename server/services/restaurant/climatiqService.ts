// FILE: src/services/restaurant/climatiqService.ts
// Green Life — Climatiq carbon estimation fallback service
//
// Used only when a food item cannot be matched in our static emission factor table
// AND USDA FoodData Central doesn't have it either.
// This is the last step in the lookup chain.
//
// Requires: CLIMATIQ_API_KEY in .env
// Sign up at: https://www.climatiq.io (free tier: 100 calls/month)
// Docs: https://www.climatiq.io/docs
//
// Note: Climatiq food activities are category-level estimates, not item-specific LCAs.
// Confidence is always 'low' for Climatiq results.

import { FoodImpactResult } from './foodEmissionService';

const CLIMATIQ_BASE = 'https://beta3.api.climatiq.io';
const CLIMATIQ_API_KEY = process.env.CLIMATIQ_API_KEY;

// Mapping from common food categories to Climatiq activity IDs
// Activity IDs from Climatiq's food emission library (verify against current API)
const CATEGORY_ACTIVITY_MAP: Record<string, string> = {
  beef:          'food-beef_and_veal-retail',
  lamb:          'food-lamb_and_mutton-retail',
  pork:          'food-pork-retail',
  poultry:       'food-poultry_products-retail',
  seafood:       'food-fish_freshwater-retail',
  eggs:          'food-eggs-retail',
  dairy:         'food-dairy_products-retail',
  legumes:       'food-pulses-retail',
  grain:         'food-cereals_and_cereal_products-retail',
  vegetable:     'food-vegetables-retail',
  mixed_dish:    'food-mixed_dishes-retail',
  beverage:      'food-beverages-retail',
};

export class ClimatiqService {
  /**
   * Estimate food carbon impact from Climatiq category-level data.
   * Returns a FoodImpactResult with estimate_type 'category_based' and confidence 'low'.
   * Returns null if API unavailable or food category not mappable.
   */
  async estimateFood(foodName: string): Promise<FoodImpactResult | null> {
    if (!CLIMATIQ_API_KEY) {
      console.warn('CLIMATIQ_API_KEY not set — skipping Climatiq fallback');
      return null;
    }

    const category = this.guessFoodCategory(foodName);
    const activityId = CATEGORY_ACTIVITY_MAP[category];
    if (!activityId) return null;

    const body = {
      emission_factor: {
        activity_id: activityId,
        source: 'EXIOBASE',
        region: 'US',
      },
      parameters: {
        money: 1,
        money_unit: 'usd',
      },
    };

    const response = await fetch(`${CLIMATIQ_BASE}/estimate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) return null;

    const json = await response.json() as ClimatiqResponse;
    if (!json.co2e) return null;

    // Climatiq returns per-dollar spend; rough kg/serving approximation
    // Average $15 restaurant meal, ~200g serving — very approximate
    const kgPerDollar = json.co2e; // in kg CO₂e per USD
    const estimatedPerServing = kgPerDollar * 15 * 0.3; // 30% of meal cost is this item

    return {
      matched_name: `${foodName} (estimated)`,
      query: foodName,
      match_method: 'category_fallback',
      kg_co2e_per_kg: estimatedPerServing / 0.2,     // back-calculate per kg (~200g serving)
      kg_co2e_per_serving: estimatedPerServing,
      serving_size_g: 200,
      food_category: category,
      confidence: 'low',
      estimate_type: 'category_based',
      source_citation: 'Climatiq EXIOBASE IO tables (category estimate)',
      impact_tier:
        estimatedPerServing >= 3 ? 'high'
          : estimatedPerServing >= 0.8 ? 'medium'
            : 'low',
    };
  }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private guessFoodCategory(name: string): string {
    const lower = name.toLowerCase();
    if (/beef|steak|burger|brisket/.test(lower)) return 'beef';
    if (/lamb|mutton/.test(lower)) return 'lamb';
    if (/pork|bacon|ham|rib/.test(lower)) return 'pork';
    if (/chicken|turkey|duck|poultry/.test(lower)) return 'poultry';
    if (/fish|salmon|tuna|shrimp|seafood|oyster|crab|lobster/.test(lower)) return 'seafood';
    if (/egg|omelette/.test(lower)) return 'eggs';
    if (/cheese|milk|dairy|cream/.test(lower)) return 'dairy';
    if (/bean|lentil|chickpea|legume/.test(lower)) return 'legumes';
    if (/rice|pasta|bread|grain|noodle/.test(lower)) return 'grain';
    if (/salad|vegetable|broccoli|spinach/.test(lower)) return 'vegetable';
    if (/coffee|wine|beer|beverage|drink/.test(lower)) return 'beverage';
    return 'mixed_dish';
  }
}

interface ClimatiqResponse {
  co2e?: number;
  co2e_unit?: string;
}
