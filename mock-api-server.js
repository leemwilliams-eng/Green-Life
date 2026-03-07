const http = require("http");
const { URL } = require("url");

const port = process.env.PORT || 4000;

const sources = [
  {
    id: "src_epd_1",
    name: "EPD Database",
    source_type: "epd",
    reference_url: "https://example.com/epd/bottle",
    dataset_version: "2026-01",
    published_at: "2026-01-12T00:00:00Z"
  },
  {
    id: "src_epa_1",
    name: "EPA Material Factors",
    source_type: "epa",
    reference_url: "https://example.com/epa/materials",
    dataset_version: "2026-02",
    published_at: "2026-02-02T00:00:00Z"
  }
];

const products = [
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

const items = {
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
      }
    ],
    materials: [{ name: "Stainless Steel", percentage: 88 }],
    disposal_guidance: [{ type: "recycle", label: "Check local metal recycling rules before disposal." }],
    hazard_flags: [],
    sources,
    last_updated_at: "2026-03-05T10:00:00Z"
  },
  prod_2: {
    ...products[1],
    description: "Concentrated liquid detergent with category-level impact.",
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
    materials: [{ name: "Stainless Steel", percentage: 80 }],
    disposal_guidance: [{ type: "recycle", label: "Separate lid components where possible." }],
    hazard_flags: [],
    sources: [sources[0]],
    last_updated_at: "2026-03-05T10:00:00Z"
  }
};

const history = [
  { id: "hist_1", lookup_type: "barcode", item: products[0], created_at: "2026-03-05T08:12:00Z" },
  { id: "hist_2", lookup_type: "search", query_value: "detergent", item: products[1], created_at: "2026-03-05T08:03:00Z" },
  { id: "hist_3", lookup_type: "image", item: products[2], created_at: "2026-03-04T18:30:00Z" }
];

const savedItems = [products[0], products[3]];
const profile = { id: "user_1", email: "demo@greenlife.app" };

function send(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify({ data: payload, meta: {}, error: null }));
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    send(res, 404, {});
    return;
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${port}`);

  if (url.pathname === "/api/v1/me/history") {
    send(res, 200, { history });
    return;
  }

  if (url.pathname === "/api/v1/me/saved-items" && req.method === "GET") {
    send(res, 200, { items: savedItems });
    return;
  }

  if (url.pathname === "/api/v1/me/profile") {
    send(res, 200, profile);
    return;
  }

  if (url.pathname === "/api/v1/search") {
    const q = (url.searchParams.get("q") || "").toLowerCase();
    const results = products.filter((product) => `${product.name} ${product.brand || ""} ${product.category?.name || ""}`.toLowerCase().includes(q));
    send(res, 200, { results });
    return;
  }

  if (url.pathname === "/api/v1/lookup/barcode") {
    send(res, 200, { result: products[0] });
    return;
  }

  if (url.pathname === "/api/v1/lookup/image") {
    send(res, 200, { candidates: [products[0], products[3], products[2]] });
    return;
  }

  if (url.pathname.startsWith("/api/v1/items/")) {
    const id = url.pathname.split("/").pop();
    send(res, 200, { item: items[id] || items.prod_1 });
    return;
  }

  if (url.pathname.startsWith("/api/v1/sources/")) {
    const id = url.pathname.split("/").pop();
    const source = sources.find((entry) => entry.id === id) || sources[0];
    send(res, 200, { source: { ...source, ingested_at: "2026-03-01T12:00:00Z", methodology_notes: "Mock source record for UI development." } });
    return;
  }

  if (url.pathname === "/api/v1/me/saved-items" && req.method === "POST") {
    send(res, 200, { success: true });
    return;
  }

  if (url.pathname.startsWith("/api/v1/me/saved-items/") && req.method === "DELETE") {
    send(res, 200, { success: true });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: null, meta: {}, error: { code: "NOT_FOUND", message: "Route not found" } }));
});

server.listen(port, () => {
  console.log(`Green Life mock API listening on http://localhost:${port}/api/v1`);
});
