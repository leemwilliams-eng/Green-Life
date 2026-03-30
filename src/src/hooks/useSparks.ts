// src/hooks/useSparks.ts
// Green Life — Sparks state management
// "Every Spark starts a fire." 🔥
//
// Two layers:
//   useSparksStore  — Zustand: fast local state for the Home screen badge
//   useSparksSummary — TanStack Query: server sync for ProfileScreen history
//
// On app start, useSparksSummary fetches from server and hydrates the store.
// On each scan, the mutation's onSuccess calls setTotal() immediately (optimistic).

import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import { fetchSparksSummary } from "@/api/restaurantLookup";
import type { UserSparkSummary } from "@/types/restaurant";

// ── Zustand store: instant badge reads ───────────────────────────────────────

interface SparksState {
  total: number;
  isFirstScanDone: boolean;
  setTotal: (total: number) => void;
  increment: (amount: number) => void;
  markFirstScanDone: () => void;
}

export const useSparksStore = create<SparksState>((set) => ({
  total: 0,
  isFirstScanDone: false,
  setTotal: (total) => set({ total }),
  increment: (amount) => set((s) => ({ total: s.total + amount })),
  markFirstScanDone: () => set({ isFirstScanDone: true }),
}));

/** Quick accessor for the badge — no loading state, instant. */
export function useSparkTotal() {
  return useSparksStore((s) => s.total);
}

// ── TanStack Query: server sync ───────────────────────────────────────────────

/**
 * Fetches full Sparks summary from server and hydrates the Zustand store.
 * Use on ProfileScreen and as a background sync from HomeScreen.
 */
export function useSparksSummary() {
  const setTotal = useSparksStore((s) => s.setTotal);

  return useQuery<UserSparkSummary>({
    queryKey: ["sparks", "summary"],
    queryFn: async () => {
      const response = await fetchSparksSummary();
      if (response.data?.total_sparks != null) {
        setTotal(response.data.total_sparks);
      }
      return response.data;
    },
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}
