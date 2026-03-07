# Green Life API Specification

## 1. API Principles
- All results must include confidence metadata.
- All environmental metrics must include provenance where available.
- The API must distinguish exact product data from category/material estimates.
- Missing metrics should return partial success, not hard failure.

Base path:
`/api/v1`

Auth:
- Bearer token for signed-in users
- Guest access allowed for lookup endpoints if desired

Response format:
```json
{
  "data": {},
  "meta": {},
  "error": null
}
```

Error format:
```json
{
  "data": null,
  "meta": {},
  "error": {
    "code": "NOT_FOUND",
    "message": "No matching product found."
  }
}
```

## 2. Core Domain Models

### ProductSummary
```json
{
  "id": "prod_123",
  "name": "Reusable Water Bottle",
  "brand": "Example Brand",
  "image_url": "https://...",
  "match_type": "exact_product",
  "confidence_score": 0.96,
  "category": {
    "id": "cat_10",
    "name": "Drinkware"
  }
}
```

### ImpactMetric
```json
{
  "metric_type": "carbon_footprint",
  "label": "Carbon Footprint",
  "value": 2.4,
  "unit": "kg_co2e",
  "scope": "product",
  "estimate_type": "exact",
  "confidence_score": 0.91,
  "methodology": "EPD reported cradle-to-gate value",
  "source": {
    "id": "src_55",
    "name": "EPD Database",
    "source_type": "epd",
    "reference_url": "https://...",
    "dataset_version": "2026-01",
    "published_at": "2026-01-12"
  }
}
```

### ResultDetail
```json
{
  "id": "prod_123",
  "name": "Reusable Water Bottle",
  "brand": "Example Brand",
  "description": "Stainless steel insulated bottle",
  "image_url": "https://...",
  "match_type": "exact_product",
  "confidence_score": 0.96,
  "metrics": [],
  "materials": [],
  "disposal_guidance": [],
  "hazard_flags": [],
  "sources": [],
  "last_updated_at": "2026-03-05T10:00:00Z"
}
```

## 3. Public/User Endpoints

### POST `/lookup/barcode`
Resolve an item by barcode.

Request:
```json
{
  "barcode": "012345678905"
}
```

Response:
```json
{
  "data": {
    "result": {
      "id": "prod_123",
      "name": "Reusable Water Bottle",
      "brand": "Example Brand",
      "match_type": "exact_product",
      "confidence_score": 0.96
    }
  },
  "meta": {},
  "error": null
}
```

Behavior:
- Exact match if known barcode exists
- If no exact match, return `NOT_FOUND` with optional fallback suggestions in `meta`

### GET `/search`
Search products, brands, categories, and materials.

Query Params:
- `q` required
- `type` optional: `product|brand|category|material`
- `limit` optional
- `cursor` optional

Example:
`GET /api/v1/search?q=stainless+steel+bottle&type=product`

Response:
```json
{
  "data": {
    "results": [
      {
        "id": "prod_123",
        "name": "Reusable Water Bottle",
        "brand": "Example Brand",
        "match_type": "probable_product",
        "confidence_score": 0.84,
        "category": {
          "id": "cat_10",
          "name": "Drinkware"
        }
      }
    ]
  },
  "meta": {
    "next_cursor": null
  },
  "error": null
}
```

### POST `/lookup/image`
Upload an image reference for OCR-assisted or vision-assisted matching.

Request:
```json
{
  "image_url": "https://storage.example.com/uploads/abc.jpg"
}
```

Alternative multipart upload can be supported separately.

Response:
```json
{
  "data": {
    "candidates": [
      {
        "id": "prod_123",
        "name": "Reusable Water Bottle",
        "brand": "Example Brand",
        "match_type": "probable_product",
        "confidence_score": 0.72
      },
      {
        "id": "cat_10",
        "name": "Drinkware",
        "match_type": "category_estimate",
        "confidence_score": 0.58
      }
    ]
  },
  "meta": {},
  "error": null
}
```

### GET `/items/{id}`
Return full product/result detail.

Response:
```json
{
  "data": {
    "item": {
      "id": "prod_123",
      "name": "Reusable Water Bottle",
      "brand": "Example Brand",
      "match_type": "exact_product",
      "confidence_score": 0.96,
      "metrics": [
        {
          "metric_type": "carbon_footprint",
          "label": "Carbon Footprint",
          "value": 2.4,
          "unit": "kg_co2e",
          "scope": "product",
          "estimate_type": "exact",
          "confidence_score": 0.91,
          "source": {
            "id": "src_55",
            "name": "EPD Database",
            "source_type": "epd"
          }
        }
      ],
      "materials": [
        {
          "name": "Stainless Steel",
          "percentage": 88
        }
      ],
      "disposal_guidance": [
        {
          "type": "recycle",
          "label": "Check local metal recycling rules"
        }
      ],
      "hazard_flags": [],
      "sources": [
        {
          "id": "src_55",
          "name": "EPD Database",
          "source_type": "epd",
          "reference_url": "https://..."
        }
      ],
      "last_updated_at": "2026-03-05T10:00:00Z"
    }
  },
  "meta": {},
  "error": null
}
```

### GET `/sources/{id}`
Return expanded provenance for a source.

Response:
```json
{
  "data": {
    "source": {
      "id": "src_55",
      "name": "EPD Database",
      "source_type": "epd",
      "reference_url": "https://...",
      "dataset_version": "2026-01",
      "published_at": "2026-01-12",
      "ingested_at": "2026-02-01T08:00:00Z",
      "methodology_notes": "Cradle-to-gate declaration"
    }
  },
  "meta": {},
  "error": null
}
```

## 4. User Account Endpoints

### GET `/me/history`
Return recent scanned/searched items.

### POST `/me/saved-items`
Save an item.

Request:
```json
{
  "item_id": "prod_123"
}
```

### GET `/me/saved-items`
List saved items.

### DELETE `/me/saved-items/{itemId}`
Remove saved item.

### GET `/me/profile`
Return user profile/account metadata.

## 5. Admin Endpoints

### GET `/admin/products`
Search products and inspect mappings.

### GET `/admin/products/{id}`
View full product record with linked sources and metrics.

### GET `/admin/source-records`
List ingested source records.

### GET `/admin/match-review`
Return low-confidence or ambiguous matches.

### POST `/admin/mappings/override`
Create or update manual mapping override.

Request:
```json
{
  "source_record_id": "sr_101",
  "target_type": "product",
  "target_id": "prod_123",
  "reason": "Verified by admin review"
}
```

## 6. Status and Enumerations

### Match Types
```json
[
  "exact_product",
  "probable_product",
  "category_estimate",
  "material_estimate"
]
```

### Metric Types
```json
[
  "carbon_footprint",
  "recycled_content",
  "recyclability",
  "material_composition",
  "water_use",
  "hazard_indicator",
  "disposal_guidance"
]
```

### Source Types
```json
[
  "epa",
  "epd",
  "manufacturer",
  "open_product_data",
  "emission_factor_dataset",
  "internal_estimate"
]
```

## 7. Recommended API Behavior Rules
- `match_type` is required on every lookup result.
- `confidence_score` is required on every lookup result and metric when inferred.
- `estimate_type` should indicate whether a metric is exact, inferred, modeled, or category-based.
- `sources` should be included whenever user-facing values are shown.
- Partial records are allowed.
- The API should never fabricate precision when only category estimates are available.

## 8. Suggested First Build Order
1. `POST /lookup/barcode`
2. `GET /search`
3. `GET /items/{id}`
4. `POST /me/saved-items`
5. `GET /me/saved-items`
6. `GET /me/history`
7. `GET /sources/{id}`
8. admin review endpoints
9. `POST /lookup/image`

## 9. OpenAPI Draft
```yaml
openapi: 3.1.0
info:
  title: Green Life API
  version: 1.0.0
  description: API for product lookup, environmental impact retrieval, saved items, and admin review.
servers:
  - url: https://api.greenlife.app/api/v1

tags:
  - name: Lookup
  - name: Items
  - name: Sources
  - name: User
  - name: Admin

paths:
  /lookup/barcode:
    post:
      tags: [Lookup]
      summary: Resolve an item by barcode
  /lookup/image:
    post:
      tags: [Lookup]
      summary: Resolve likely candidates from an uploaded image
  /search:
    get:
      tags: [Lookup]
      summary: Search products, brands, categories, and materials
  /items/{id}:
    get:
      tags: [Items]
      summary: Get full item detail and environmental metrics
  /sources/{id}:
    get:
      tags: [Sources]
      summary: Get expanded source provenance
  /me/profile:
    get:
      tags: [User]
      summary: Get current user profile
  /me/history:
    get:
      tags: [User]
      summary: Get recent lookup history
  /me/saved-items:
    get:
      tags: [User]
      summary: List saved items
    post:
      tags: [User]
      summary: Save an item
  /me/saved-items/{itemId}:
    delete:
      tags: [User]
      summary: Remove saved item
  /admin/products:
    get:
      tags: [Admin]
      summary: Search products for admin review
  /admin/products/{id}:
    get:
      tags: [Admin]
      summary: Get product record with linked sources and metrics
  /admin/source-records:
    get:
      tags: [Admin]
      summary: List ingested source records
  /admin/match-review:
    get:
      tags: [Admin]
      summary: Get low-confidence and ambiguous matches
  /admin/mappings/override:
    post:
      tags: [Admin]
      summary: Create or update manual mapping override
```
