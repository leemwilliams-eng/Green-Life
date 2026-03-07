import type { ProductSummary } from "@/types/domain";

export type RootStackParamList = {
  Onboarding: undefined;
  Permissions: undefined;
  Auth: undefined;
  MainTabs: undefined;
  BarcodeScanner: undefined;
  PhotoCapture: undefined;
  CandidateResults: { candidates: ProductSummary[] };
  ItemDetail: { itemId: string };
  MetricDetail: { itemId: string; metricType: string };
  SourceDetail: { sourceId: string };
  NoMatch: { lookupType: "barcode" | "image" | "search"; queryValue?: string };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Saved: undefined;
  Profile: undefined;
};
