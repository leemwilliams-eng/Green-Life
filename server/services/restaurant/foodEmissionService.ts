// FILE: src/services/restaurant/foodEmissionService.ts
// Green Life — Food emission factor lookup service
//
// Lookup chain:
//   1. Exact name match in food_emission_factors table
//   2. Alias array containment match
//   3. PostgreSQL trigram similarity (pg_trgm) fuzzy match
//   4. Category-level fallback (returns the category average)
//
// Returns data in the existing ImpactMetric shape used by /api/v1 responses.

import { Pool } from 'pg';

// ─── Types matching existing Green Life API response shapes ──────────────────

export type EstimateType =
  | 'exact'
  | 'inferred'
  | 'modeled'
  | 'category_based'
  | 'material_based';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface FoodImpactResult {
  /** Matched food name (may differ from query if fuzzy-matched) */
  matched_name: string;
  /** Original query string */
  query: string;
  /** How the match was made */
  match_method: 'exact' | 'alias' | 'fuzzy' | 'category_fallback' | 'not_found';
  /** kg CO₂e per kg of food */
  kg_co2e_per_kg: number;
  /** kg CO₂e for one typical serving */
  kg_co2e_per_serving: number;
  /** Serving size used (grams) */
  serving_size_g: number;
  /** Sustainability category */
  food_category: string;
  /** Confidence label for UI badge */
  confidence: ConfidenceLevel;
  /** Maps to existing impact_metrics.estimate_type */
  estimate_type: EstimateType;
  /** Optional land use */
  land_use_m2_per_kg?: number;
  /** Optional water use */
  water_use_l_per_kg?: number;
  /** Where the data came from */
  source_citation?: string;
  /** Human-readable impact tier for UI ("High", "Medium", "Low") */
  impact_tier: 'high' | 'medium' | 'low';
}

// Thresholds for impact tier labels (kg CO₂e per serving)
const IMPACT_THRESHOLDS = {
  high: 3.0,    // > 3 kg CO₂e per serving → red / high impact
  medium: 0.8,  // 0.8–3 kg CO₂e per serving → amber / medium
  // below 0.8 → green / low
};

// ─── Service class ────────────────────────────────────────────────────────────

export class FoodEmissionService {
  constructor(private readonly db: Pool) {}

  /**
   * Look up the carbon impact of a food item by name.
   * Handles both exact names ("salmon") and natural language ("grilled salmon filet").
   *
   * @param query - Food name from Vision API label or user text input
   * @param servingSizeOverrideG - Optional custom serving size
   */
  async lookup(
    query: string,
    servingSizeOverrideG?: number
  ): Promise<FoodImpactResult | null> {
    const normalized = query.toLowerCase().trim();

    // 1. Exact match
    const exact = await this.exactMatch(normalized);
    if (exact) return this.toResult(exact, normalized, 'exact', servingSizeOverrideG);

    // 2. Alias containment (any alias in the array matches)
    const alias = await this.aliasMatch(normalized);
    if (alias) return this.toResult(alias, normalized, 'alias', servingSizeOverrideG);

    // 3. Fuzzy trigram match (requires pg_trgm extension)
    const fuzzy = await this.fuzzyMatch(normalized);
    if (fuzzy) return this.toResult(fuzzy, normalized, 'fuzzy', servingSizeOverrideG);

    // 4. Category fallback — extract a likely category keyword and return average
    const fallback = await this.categoryFallback(normalized);
    if (fallback) return this.toResult(fallback, normalized, 'category_fallback', servingSizeOverrideG);

    return null;
  }

  // ─── Private query methods ──────────────────────────────────────────────────

  private async exactMatch(name: string) {
    const result = await this.db.query<DbRow>(
      `SELECT * FROM food_emission_factors WHERE food_name = $1 LIMIT 1`,
      [name]
    );
    return result.rows[0] ?? null;
  }

  private async aliasMatch(name: string) {
    // Check if the query string appears anywhere in the aliases array
    const result = await this.db.query<DbRow>(
      `SELECT * FROM food_emission_factors
       WHERE $1 = ANY(aliases)
       ORDER BY confidence DESC
       LIMIT 1`,
      [name]
    );
    if (result.rows[0]) return result.rows[0];

    // Also check if the query contains any alias as a substring (partial match)
    const result2 = await this.db.query<DbRow>(
      `SELECT * FROM food_emission_factors
       WHERE EXISTS (
         SELECT 1 FROM unnest(aliases) AS a
         WHERE $1 ILIKE '%' || a || '%' OR a ILIKE '%' || $1 || '%'
       )
       ORDER BY confidence DESC
       LIMIT 1`,
      [name]
    );
    return result2.rows[0] ?? null;
  }

  private async fuzzyMatch(name: string) {
    // Requires: CREATE EXTENSION IF NOT EXISTS pg_trgm;
    // Similarity threshold: 0.3 (adjustable)
    try {
      const result = await this.db.query<DbRow>(
        `SELECT *, similarity(food_name, $1) AS sim
         FROM food_emission_factors
         WHERE similarity(food_name, $1) > 0.25
            OR EXISTS (
              SELECT 1 FROM unnest(aliases) a
              WHERE similarity(a, $1) > 0.35
            )
         ORDER BY similarity(food_name, $1) DESC
         LIMIT 1`,
        [name]
      );
      return result.rows[0] ?? null;
    } catch {
      // pg_trgm not installed — skip gracefully
      return null;
    }
  }

  private async categoryFallback(query: string) {
    // Try to identify a category keyword in the query and return the avg for that category
    const categoryKeywords: Record<string, string> = {
      beef: 'beef', steak: 'beef', burger: 'beef',
      lamb: 'lamb', mutton: 'lamb',
      pork: 'pork', bacon: 'pork', ham: 'pork',
      chicken: 'poultry', turkey: 'poultry', duck: 'poultry',
      fish: 'seafood', seafood: 'seafood', shrimp: 'seafood',
      pasta: 'grain', rice: 'grain', bread: 'grain',
      salad: 'vegetable', vegetable: 'vegetable',
      dessert: 'dessert', cake: 'dessert',
      coffee: 'beverage', wine: 'beverage', beer: 'beverage',
    };

    let matchedCategory: string | undefined;
    for (const [keyword, category] of Object.entries(categoryKeywords)) {
      if (query.includes(keyword)) {
        matchedCategory = category;
        break;
      }
    }

    if (!matchedCategory) return null;

    const result = await this.db.query<DbRow>(
      `SELECT
         $1::text AS food_name,
         AVG(kg_co2e_per_kg)::numeric(8,3) AS kg_co2e_per_kg,
         AVG(serving_size_g)::integer       AS serving_size_g,
         category,
         'low'::text                        AS confidence,
         NULL                               AS land_use_m2_per_kg,
         NULL                               AS water_use_l_per_kg,
         'Category average (Agribalyse)'    AS source_citation
       FROM food_emission_factors
       WHERE category = $2`,
      [`${matchedCategory} (category average)`, matchedCategory]
    );

    return result.rows[0] ?? null;
  }

  // ─── Result mapper ──────────────────────────────────────────────────────────

  private toResult(
    row: DbRow,
    query: string,
    method: FoodImpactResult['match_method'],
    servingSizeOverrideG?: number
  ): FoodImpactResult {
    const servingG = servingSizeOverrideG ?? row.serving_size_g;
    const kgPerServing = (row.kg_co2e_per_kg * servingG) / 1000;
    const confidence = row.confidence as ConfidenceLevel;

    const estimateType: EstimateType =
      confidence === 'high' ? 'exact'
        : confidence === 'medium' ? 'inferred'
          : 'category_based';

    const impactTier: FoodImpactResult['impact_tier'] =
      kgPerServing >= IMPACT_THRESHOLDS.high ? 'high'
        : kgPerServing >= IMPACT_THRESHOLDS.medium ? 'medium'
          : 'low';

    return {
      matched_name: row.food_name,
      query,
      match_method: method,
      kg_co2e_per_kg: parseFloat(String(row.kg_co2e_per_kg)),
      kg_co2e_per_serving: Math.round(kgPerServing * 1000) / 1000,
      serving_size_g: servingG,
      food_category: row.category,
      confidence,
      estimate_type: estimateType,
      land_use_m2_per_kg: row.land_use_m2_per_kg
        ? parseFloat(String(row.land_use_m2_per_kg))
        : undefined,
      water_use_l_per_kg: row.water_use_l_per_kg
        ? parseFloat(String(row.water_use_l_per_kg))
        : undefined,
      source_citation: row.source_citation ?? undefined,
      impact_tier: impactTier,
    };
  }
}

// ─── Internal DB row type ─────────────────────────────────────────────────────
interface DbRow {
  food_name: string;
  aliases: string[];
  category: string;
  kg_co2e_per_kg: number | string;
  serving_size_g: number;
  land_use_m2_per_kg?: number | string | null;
  water_use_l_per_kg?: number | string | null;
  confidence: string;
  source_citation?: string | null;
}
