import { apiFetch } from "@/api/client";
import type { ApiEnvelope } from "@/types/api";
import type { SourceSummary } from "@/types/domain";

export function getSourceDetail(sourceId: string) {
  return apiFetch<ApiEnvelope<{ source: SourceSummary & { ingested_at?: string; methodology_notes?: string } }>>(`/sources/${sourceId}`);
}
