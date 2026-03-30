// src/hooks/useRestaurantScan.ts
// Green Life — Restaurant scan hooks (TanStack React Query)
//
// useFoodPhotoScan  — mutation: photograph food
// useMaterialScan   — mutation: photograph restaurant materials
// useMenuSearch     — query: type a menu item name
//
// All hooks auto-update the Sparks total in the Zustand store on success.

import { useMutation, useQuery } from "@tanstack/react-query";
import { scanFoodPhoto, scanMaterial, searchMenuItem } from "@/api/restaurantLookup";
import { useSparksStore } from "@/hooks/useSparks";
import type { RestaurantScanMeta } from "@/types/restaurant";

// ── Helper: extract sparks from meta and sync store ──────────────────────────

function syncSparks(meta: unknown) {
  const sparks = (meta as RestaurantScanMeta)?.sparks;
  if (sparks?.newTotal != null) {
    useSparksStore.getState().setTotal(sparks.newTotal);
    if (sparks.isFirstScan) {
      useSparksStore.getState().markFirstScanDone();
    }
  }
}

// ── 1. Food photo scan ────────────────────────────────────────────────────────

/**
 * Mutation: photograph food and get its carbon impact.
 *
 * const { mutate, data, isPending, isSuccess } = useFoodPhotoScan();
 * mutate({ imageBase64: base64Str });
 */
export function useFoodPhotoScan() {
  return useMutation({
    mutationFn: ({ imageBase64, servingSizeG }: { imageBase64: string; servingSizeG?: number }) =>
      scanFoodPhoto(imageBase64, servingSizeG),
    onSuccess: (response) => syncSparks(response.meta),
  });
}

// ── 2. Material scan ──────────────────────────────────────────────────────────

/**
 * Mutation: photograph a restaurant material (straw, container, bag, etc.).
 *
 * const { mutate, data, isPending } = useMaterialScan();
 * mutate({ imageBase64: base64Str });
 */
export function useMaterialScan() {
  return useMutation({
    mutationFn: ({ imageBase64 }: { imageBase64: string }) => scanMaterial(imageBase64),
    onSuccess: (response) => syncSparks(response.meta),
  });
}

// ── 3. Menu item search ───────────────────────────────────────────────────────

/**
 * Query: look up a menu item by name.
 * Enabled only when query is ≥ 2 chars. Debounce the input before passing.
 *
 * const { data, isLoading } = useMenuSearch(debouncedQuery);
 */
export function useMenuSearch(query: string, enabled = true) {
  return useQuery({
    queryKey: ["restaurant", "menu-search", query],
    queryFn: async () => {
      const response = await searchMenuItem(query);
      syncSparks(response.meta);
      return response;
    },
    enabled: enabled && query.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
