import { apiFetch } from "@/api/client";
import type { ApiEnvelope } from "@/types/api";
import type { ProductSummary } from "@/types/domain";

export function lookupBarcode(barcode: string) {
  return apiFetch<ApiEnvelope<{ result: ProductSummary }>>("/lookup/barcode", {
    method: "POST",
    body: JSON.stringify({ barcode })
  });
}

export function search(query: string, type?: string) {
  const params = new URLSearchParams({ q: query });
  if (type) {
    params.set("type", type);
  }
  return apiFetch<ApiEnvelope<{ results: ProductSummary[] }>>(`/search?${params.toString()}`);
}

export function lookupImage(imageUrl: string) {
  return apiFetch<ApiEnvelope<{ candidates: ProductSummary[] }>>("/lookup/image", {
    method: "POST",
    body: JSON.stringify({ image_url: imageUrl })
  });
}
