export type MatchType =
  | "exact_product"
  | "probable_product"
  | "category_estimate"
  | "material_estimate";

export type EstimateType =
  | "exact"
  | "inferred"
  | "modeled"
  | "category_based"
  | "material_based";

export type SourceType =
  | "epa"
  | "epd"
  | "manufacturer"
  | "open_product_data"
  | "emission_factor_dataset"
  | "internal_estimate";

export interface CategorySummary {
  id: string;
  name: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  brand?: string;
  image_url?: string | null;
  match_type: MatchType;
  confidence_score: number;
  category?: CategorySummary;
}

export interface SourceSummary {
  id: string;
  name: string;
  source_type: SourceType;
  reference_url?: string | null;
  dataset_version?: string | null;
  published_at?: string | null;
}

export interface ImpactMetric {
  metric_type: string;
  label: string;
  value?: number | null;
  unit?: string | null;
  scope: "product" | "category" | "material";
  estimate_type: EstimateType;
  confidence_score?: number | null;
  methodology?: string | null;
  source?: SourceSummary;
}

export interface HistoryItem {
  id: string;
  lookup_type: string;
  query_value?: string;
  item: ProductSummary;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
}

export interface ItemDetail extends ProductSummary {
  description?: string | null;
  metrics: ImpactMetric[];
  materials: { name: string; percentage?: number | null }[];
  disposal_guidance: { type: string; label: string; details?: string | null }[];
  hazard_flags: { code: string; label: string; severity?: string | null }[];
  sources: SourceSummary[];
  last_updated_at: string;
}
