import { apiFetch } from "@/api/client";
import type { ApiEnvelope } from "@/types/api";
import type { ProductSummary } from "@/types/domain";

export function getProfile() {
  return apiFetch<ApiEnvelope<{ id: string; email: string }>>("/me/profile");
}

export function getHistory() {
  return apiFetch<ApiEnvelope<{ history: { id: string; lookup_type: string; query_value?: string; item: ProductSummary; created_at: string }[] }>>("/me/history");
}

export function getSavedItems() {
  return apiFetch<ApiEnvelope<{ items: ProductSummary[] }>>("/me/saved-items");
}

export function saveItem(itemId: string) {
  return apiFetch<ApiEnvelope<{ success: boolean }>>("/me/saved-items", {
    method: "POST",
    body: JSON.stringify({ item_id: itemId })
  });
}

export function removeSavedItem(itemId: string) {
  return apiFetch<ApiEnvelope<{ success: boolean }>>(`/me/saved-items/${itemId}`, {
    method: "DELETE"
  });
}
