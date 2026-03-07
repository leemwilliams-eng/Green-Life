import { apiFetch } from "@/api/client";
import type { ApiEnvelope } from "@/types/api";
import type { ItemDetail } from "@/types/domain";

export function getItemDetail(itemId: string) {
  return apiFetch<ApiEnvelope<{ item: ItemDetail }>>(`/items/${itemId}`);
}
