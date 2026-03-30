// FILE: src/types/restaurant.ts
// Green Life — Shared types for restaurant API layer
// These extend the existing ProductSummary / ImpactMetric / ResultDetail types
// from the base API spec.

import { FoodImpactResult } from '../services/restaurant/foodEmissionService';
import { MaterialImpactResult } from '../services/restaurant/materialImpactService';
import { SparkAwardResult } from '../services/restaurant/sparksService';

// ─── Request types ─────────────────────────────────────────────────────────────

/** Extended request body for POST /api/v1/lookup/image */
export interface ImageLookupRequest {
  /** Base64-encoded image data */
  image: string;
  /**
   * Lookup mode. Defaults to 'product' (existing barcode/logo behavior).
   * 'food'     — identifies food in the photo and returns carbon impact
   * 'material' — identifies disposable materials (straws, containers) and returns sustainability data
   */
  mode?: 'product' | 'food' | 'material';
  /** User ID injected by auth middleware */
  userId?: string;
  /** Optional: override serving size in grams (used when user specifies portion) */
  servingSizeOverrideG?: number;
}

/** Extended query params for GET /api/v1/search */
export interface SearchRequest {
  q: string;
  /**
   * Lookup mode. Defaults to 'product'.
   * 'food' — treats q as a food/dish name and returns carbon impact
   */
  mode?: 'product' | 'food';
  /** User ID injected by auth middleware */
  userId?: string;
}

// ─── Response types (fit into existing { data, meta, error } envelope) ─────────

/** Returned in data field when mode = 'food' */
export interface FoodLookupData {
  type: 'food';
  food: FoodImpactResult;
  /** Human-friendly equivalent comparisons for UI (e.g. "= driving 15 miles") */
  equivalents: CarbonEquivalent[];
}

/** Returned in data field when mode = 'material' */
export interface MaterialLookupData {
  type: 'material';
  material: MaterialImpactResult;
}

/** Attached to meta field on every successful restaurant scan */
export interface RestaurantScanMeta {
  sparks: SparkAwardResult;
  scan_mode: 'food' | 'material';
  /** ISO 8601 timestamp */
  scanned_at: string;
}

/** Fun carbon comparisons to show in the UI */
export interface CarbonEquivalent {
  label: string;          // e.g. "Miles driven"
  value: string;          // e.g. "6.2"
  unit: string;           // e.g. "miles"
  icon: string;           // emoji or icon name, e.g. "🚗"
}

// ─── Carbon equivalent calculator ──────────────────────────────────────────────

/**
 * Generate human-relatable carbon equivalents for a given CO₂e value.
 * These make abstract numbers meaningful in the UI.
 */
export function buildCarbonEquivalents(kgCo2e: number): CarbonEquivalent[] {
  // EPA conversion factors
  const milesDriven = kgCo2e / 0.404;           // avg US car: 404g CO₂e/mile
  const smartphoneCharges = kgCo2e / 0.00822;   // 8.22g CO₂e per charge
  const treeDaysAbsorbed = kgCo2e / 0.0603;     // avg tree absorbs ~22kg/year ÷ 365
  const hoursTVStreaming = kgCo2e / 0.036;       // 36g CO₂e/hour (typical streaming)

  const equivalents: CarbonEquivalent[] = [];

  if (milesDriven >= 0.1) {
    equivalents.push({
      label: 'Miles driven',
      value: milesDriven.toFixed(1),
      unit: 'miles',
      icon: '🚗',
    });
  }

  if (smartphoneCharges >= 1) {
    equivalents.push({
      label: 'Phone charges',
      value: Math.round(smartphoneCharges).toString(),
      unit: 'charges',
      icon: '📱',
    });
  }

  if (treeDaysAbsorbed >= 1) {
    equivalents.push({
      label: 'Days for a tree to absorb',
      value: Math.round(treeDaysAbsorbed).toString(),
      unit: 'days',
      icon: '🌳',
    });
  }

  if (hoursTVStreaming >= 1) {
    equivalents.push({
      label: 'Hours of streaming video',
      value: Math.round(hoursTVStreaming).toString(),
      unit: 'hours',
      icon: '📺',
    });
  }

  return equivalents;
}
