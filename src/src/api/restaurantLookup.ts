// src/api/restaurantLookup.ts
// Green Life — Restaurant lookup API calls
// Extends the existing apiFetch client. Uses the same base URL and auth pattern.

import { apiFetch } from "@/api/client";
import type { ApiEnvelope } from "@/types/api";
import type { FoodLookupData, MaterialLookupData, RestaurantScanMeta } from "@/types/restaurant";

// ── Response types ────────────────────────────────────────────────────────────

type FoodScanEnvelope     = ApiEnvelope<FoodLookupData>     & { meta: RestaurantScanMeta };
type MaterialScanEnvelope = ApiEnvelope<MaterialLookupData> & { meta: RestaurantScanMeta };

// ── Food photo scan ───────────────────────────────────────────────────────────

/**
 * Photograph food → carbon impact + Sparks.
 * @param imageBase64 - Raw base64 string (no "data:image/..." prefix)
 */
export function scanFoodPhoto(imageBase64: string, servingSizeG?: number) {
  return apiFetch<FoodScanEnvelope>("/lookup/image", {
    method: "POST",
    body: JSON.stringify({
      image: imageBase64,
      mode: "food",
      ...(servingSizeG ? { servingSizeOverrideG: servingSizeG } : {}),
    }),
  });
}

// ── Material scan ─────────────────────────────────────────────────────────────

/**
 * Photograph a restaurant material (straw, container, etc.) → sustainability info + Sparks.
 */
export function scanMaterial(imageBase64: string) {
  return apiFetch<MaterialScanEnvelope>("/lookup/image", {
    method: "POST",
    body: JSON.stringify({ image: imageBase64, mode: "material" }),
  });
}

// ── Menu item text search ─────────────────────────────────────────────────────

/**
 * Type a menu item name → carbon impact + Sparks.
 * Triggers on every successful lookup; 300ms debounce recommended in UI.
 */
export function searchMenuItem(query: string) {
  const params = new URLSearchParams({ q: query, mode: "food" });
  return apiFetch<FoodScanEnvelope>(`/search?${params.toString()}`);
}

// ── Sparks summary ────────────────────────────────────────────────────────────

export function fetchSparksSummary() {
  return apiFetch<ApiEnvelope<import("@/types/restaurant").UserSparkSummary>>("/user/sparks");
}
