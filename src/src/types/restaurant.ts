// src/types/restaurant.ts
// Green Life — Restaurant use case types
// Extends the base domain types for food and material scanning.

export type FoodConfidence = "high" | "medium" | "low";
export type FoodMatchMethod = "exact" | "alias" | "fuzzy" | "category_fallback" | "not_found";
export type ImpactTier = "high" | "medium" | "low";
export type SustainabilityRating = "critical" | "moderate" | "good";
export type SparkScanType =
  | "food_photo"
  | "food_menu"
  | "material_scan"
  | "table_scan"
  | "barcode"
  | "first_scan";

// ── Food impact ──────────────────────────────────────────────────────────────

export interface FoodImpactResult {
  matched_name: string;
  query: string;
  match_method: FoodMatchMethod;
  kg_co2e_per_kg: number;
  kg_co2e_per_serving: number;
  serving_size_g: number;
  food_category: string;
  confidence: FoodConfidence;
  estimate_type: string;
  land_use_m2_per_kg?: number;
  water_use_l_per_kg?: number;
  source_citation?: string;
  impact_tier: ImpactTier;
  usda?: UsdaEnrichment;
}

export interface UsdaEnrichment {
  fdc_id: number;
  description: string;
  calories_per_100g?: number;
  protein_g_per_100g?: number;
  data_type: string;
}

export interface CarbonEquivalent {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export interface FoodLookupData {
  type: "food";
  food: FoodImpactResult;
  equivalents: CarbonEquivalent[];
}

// ── Material impact ───────────────────────────────────────────────────────────

export interface MaterialImpactResult {
  matched_name: string;
  query: string;
  match_method: string;
  material_type: string;
  item_type: string;
  kg_co2e_per_unit: number;
  recyclable: boolean;
  compostable: boolean;
  decomposition_label: string;
  recyclability_note: string;
  disposal_guidance: string;
  better_alternative: string;
  confidence: FoodConfidence;
  source_citation?: string;
  sustainability_rating: SustainabilityRating;
}

export interface MaterialLookupData {
  type: "material";
  material: MaterialImpactResult;
}

// ── Sparks ────────────────────────────────────────────────────────────────────

export interface SparkAwardResult {
  awarded: number;
  newTotal: number;
  isFirstScan: boolean;
  reason: string;
}

export interface RestaurantScanMeta {
  sparks: SparkAwardResult;
  scan_mode: "food" | "material";
  scanned_at: string;
}

export interface SparkHistoryItem {
  id: string;
  amount: number;
  reason: string;
  scan_type: SparkScanType;
  item_name: string | null;
  created_at: string;
}

export interface UserSparkSummary {
  total_sparks: number;
  scan_count: number;
  last_spark_at: string | null;
  recent: SparkHistoryItem[];
}

// ── Carbon equivalent calculator ──────────────────────────────────────────────

export function buildCarbonEquivalents(kgCo2e: number): CarbonEquivalent[] {
  const milesDriven        = kgCo2e / 0.404;
  const smartphoneCharges  = kgCo2e / 0.00822;
  const treeDaysAbsorbed   = kgCo2e / 0.0603;
  const hoursTVStreaming    = kgCo2e / 0.036;

  const out: CarbonEquivalent[] = [];

  if (milesDriven >= 0.1) {
    out.push({ label: "Miles driven", value: milesDriven.toFixed(1), unit: "miles", icon: "🚗" });
  }
  if (smartphoneCharges >= 1) {
    out.push({ label: "Phone charges", value: Math.round(smartphoneCharges).toString(), unit: "charges", icon: "📱" });
  }
  if (treeDaysAbsorbed >= 1) {
    out.push({ label: "Days for a tree to absorb", value: Math.round(treeDaysAbsorbed).toString(), unit: "days", icon: "🌳" });
  }
  if (hoursTVStreaming >= 1) {
    out.push({ label: "Hours of streaming", value: Math.round(hoursTVStreaming).toString(), unit: "hours", icon: "📺" });
  }

  return out;
}
