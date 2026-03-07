import type { ApiEnvelope } from "@/types/api";
import type { HistoryItem, ItemDetail, ProductSummary, UserProfile } from "@/types/domain";

const sources = [
  {
    id: "src_epd_1",
    name: "EPD Database",
    source_type: "epd" as const,
    reference_url: "https://example.com/epd/bottle",
    dataset_version: "2026-01",
    published_at: "2026-01-12T00:00:00Z"
  },
  {
    id: "src_epa_1",
    name: "EPA Material Factors",
    source_type: "epa" as const,
    reference_url: "https://example.com/epa/materials",
    dataset_version: "2026-02",
    published_at: "2026-02-02T00:00:00Z"
  }
];

const products: ProductSummary[] = [
  {
    id: "prod_1",
    name: "Reusable Water Bottle",
    brand: "Evergreen Goods",
    match_type: "exact_product",
    confidence_score: 0.96,
    category: { id: "cat_1", name: "Drinkware" }
  },
  {
    id: "prod_2",
    name: "Laundry Detergent",
    brand: "Clean Current",
    match_type: "probable_product",
    confidence_score: 0.82,
    category: { id: "cat_2", name: "Cleaning" }
  },
  {
    id: "prod_3",
    name: "Cardboard Shipping Box",
    brand: "Generic Packaging",
    match_type: "category_estimate",
    confidence_score: 0.74,
    category: { id: "cat_3", name: "Packaging" }
  },
  {
    id: "prod_4",
    name: "Stainless Steel Travel Mug",
    brand: "Trail North",
    match_type: "probable_product",
    confidence_score: 0.88,
    category: { id: "cat_1", name: "Drinkware" }
  }
];

const items: Record<string, ItemDetail> = {
  prod_1: {
    ...products[0],
    description: "Insulated stainless steel bottle with recycled metal shell.",
    metrics: [
      {
        metric_type: "carbon_footprint",
        label: "Carbon Footprint",
        value: 2.4,
        unit: "kg CO2e",
        scope: "product",
        estimate_type: "exact",
        confidence_score: 0.91,
        methodology: "Cradle-to-gate EPD declaration.",
        source: sources[0]
      },
      {
        metric_type: "recycled_content",
        label: "Recycled Content",
        value: 35,
        unit: "%",
        scope: "product",
        estimate_type: "inferred",
        confidence_score: 0.79,
        methodology: "Manufacturer disclosure mapped to normalized metric.",
        source: sources[1]
      },
      {
        metric_type: "recyclability",
        label: "Recyclability",
        value: 85,
        unit: "% likely recyclable",
        scope: "material",
        estimate_type: "material_based",
        confidence_score: 0.8,
        methodology: "Material-level estimate using local recycling assumptions.",
        source: sources[1]
      }
    ],
    materials: [
      { name: "Stainless Steel", percentage: 88 },
      { name: "Silicone", percentage: 7 },
      { name: "Plastic", percentage: 5 }
    ],
    disposal_guidance: [
      { type: "recycle", label: "Check local metal recycling rules before disposal." }
    ],
    hazard_flags: [],
    sources,
    last_updated_at: "2026-03-05T10:00:00Z"
  },
  prod_2: {
    ...products[1],
    description: "Concentrated liquid detergent with estimated category-level impact.",
    metrics: [
      {
        metric_type: "carbon_footprint",
        label: "Carbon Footprint",
        value: 4.8,
        unit: "kg CO2e / bottle",
        scope: "category",
        estimate_type: "category_based",
        confidence_score: 0.71,
        methodology: "Category estimate using packaging and surfactant factor blend.",
        source: sources[1]
      }
    ],
    materials: [{ name: "HDPE", percentage: 24 }],
    disposal_guidance: [{ type: "rinse", label: "Rinse container before recycling where accepted." }],
    hazard_flags: [{ code: "irritant", label: "Possible skin irritant", severity: "medium" }],
    sources: [sources[1]],
    last_updated_at: "2026-03-05T10:00:00Z"
  },
  prod_3: {
    ...products[2],
    description: "Corrugated box matched at material/category level.",
    metrics: [
      {
        metric_type: "carbon_footprint",
        label: "Carbon Footprint",
        value: 0.6,
        unit: "kg CO2e / unit",
        scope: "material",
        estimate_type: "material_based",
        confidence_score: 0.77,
        methodology: "Material factor for corrugated board.",
        source: sources[1]
      }
    ],
    materials: [{ name: "Corrugated Cardboard", percentage: 100 }],
    disposal_guidance: [{ type: "recycle", label: "Flatten and keep dry before recycling." }],
    hazard_flags: [],
    sources: [sources[1]],
    last_updated_at: "2026-03-05T10:00:00Z"
  },
  prod_4: {
    ...products[3],
    description: "Travel mug with inferred material mix.",
    metrics: [
      {
        metric_type: "carbon_footprint",
        label: "Carbon Footprint",
        value: 3.1,
        unit: "kg CO2e",
        scope: "product",
        estimate_type: "inferred",
        confidence_score: 0.83,
        methodology: "Matched against adjacent branded declaration and material profile.",
        source: sources[0]
      }
    ],
    materials: [
      { name: "Stainless Steel", percentage: 80 },
      { name: "Polypropylene", percentage: 20 }
    ],
    disposal_guidance: [{ type: "recycle", label: "Separate lid components where possible." }],
    hazard_flags: [],
    sources: [sources[0]],
    last_updated_at: "2026-03-05T10:00:00Z"
  }
};

const history: HistoryItem[] = [
  { id: "hist_1", lookup_type: "barcode", item: products[0], created_at: "2026-03-05T08:12:00Z" },
  { id: "hist_2", lookup_type: "search", query_value: "detergent", item: products[1], created_at: "2026-03-05T08:03:00Z" },
  { id: "hist_3", lookup_type: "image", item: products[2], created_at: "2026-03-04T18:30:00Z" }
];

const savedItems: ProductSummary[] = [products[0], products[3]];
const profile: UserProfile = { id: "user_1", email: "demo@greenlife.app" };

function wrap<T>(data: T): ApiEnvelope<T> {
  return { data, meta: {}, error: null };
}

export async function mockFetch(path: string, init?: RequestInit) {
  const url = new URL(`https://mock.local${path}`);
  const method = init?.method ?? "GET";

  if (url.pathname === "/search" && method === "GET") {
    const query = (url.searchParams.get("q") ?? "").toLowerCase();
    const results = products.filter((product) => {
      const haystack = `${product.name} ${product.brand ?? ""} ${product.category?.name ?? ""}`.toLowerCase();
      return haystack.includes(query);
    });
    return wrap({ results });
  }

  if (url.pathname === "/me/history" && method === "GET") {
    return wrap({ history });
  }

  if (url.pathname === "/me/saved-items" && method === "GET") {
    return wrap({ items: savedItems });
  }

  if (url.pathname === "/me/profile" && method === "GET") {
    return wrap(profile);
  }

  if (url.pathname === "/lookup/barcode" && method === "POST") {
    return wrap({ result: products[0] });
  }

  if (url.pathname === "/lookup/image" && method === "POST") {
    return wrap({ candidates: [products[0], products[3], products[2]] });
  }

  if (url.pathname.startsWith("/items/") && method === "GET") {
    const itemId = url.pathname.split("/").pop() ?? "";
    const item = items[itemId];
    if (!item) {
      throw new Error("Item not found");
    }
    return wrap({ item });
  }

  if (url.pathname.startsWith("/sources/") && method === "GET") {
    const sourceId = url.pathname.split("/").pop() ?? "";
    const source = sources.find((entry) => entry.id === sourceId);
    if (!source) {
      throw new Error("Source not found");
    }
    return wrap({ source: { ...source, ingested_at: "2026-03-01T12:00:00Z", methodology_notes: "Mock source record for app development." } });
  }

  if (url.pathname === "/me/saved-items" && method === "POST") {
    return wrap({ success: true });
  }

  if (url.pathname.startsWith("/me/saved-items/") && method === "DELETE") {
    return wrap({ success: true });
  }

  throw new Error(`No mock route for ${method} ${url.pathname}`);
}
