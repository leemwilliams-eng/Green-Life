# Green Life — Restaurant API Integration

**Version:** 1.0.0
**Use case:** Restaurant scanning — food carbon impact + material sustainability
**Sparks:** Every successful scan earns Sparks. Every Spark starts a fire. 🔥

---

## What this adds

This integration extends your existing `/api/v1` endpoints to handle the restaurant use case. Nothing in the existing product/barcode pipeline is changed — the `mode` parameter routes to new or existing behavior.

| Endpoint | New behavior | Existing behavior |
|---|---|---|
| `POST /api/v1/lookup/image` | `mode: 'food'` — identify food from photo | `mode: 'product'` (unchanged) |
| `POST /api/v1/lookup/image` | `mode: 'material'` — identify straws/containers | (same) |
| `GET /api/v1/search` | `mode: 'food'` — look up menu item by name | `mode: 'product'` (unchanged) |
| `GET /api/v1/user/sparks` | New: returns user's Sparks total + history | — |

---

## File map

```
restaurant-api/
│
├── src/
│   ├── db/
│   │   ├── migrations/
│   │   │   ├── 001_add_sparks_table.sql          ← Run first
│   │   │   ├── 002_add_food_emission_factors.sql  ← Requires pg_trgm extension
│   │   │   └── 003_add_material_impacts.sql
│   │   └── seeds/
│   │       ├── food_emission_factors.ts           ← 60+ foods, Agribalyse data
│   │       └── material_impacts.ts               ← 15 restaurant materials
│   │
│   ├── services/restaurant/
│   │   ├── sparksService.ts          ← Award + retrieve Sparks
│   │   ├── foodEmissionService.ts    ← Food carbon lookup (static table)
│   │   ├── materialImpactService.ts  ← Material sustainability lookup
│   │   ├── visionService.ts          ← Google Vision API wrapper
│   │   ├── usdaService.ts            ← USDA FoodData Central (free)
│   │   └── climatiqService.ts        ← Carbon fallback (paid API)
│   │
│   ├── controllers/
│   │   ├── lookup.ts                 ← Extends POST /lookup/image
│   │   └── search.ts                 ← Extends GET /search
│   │
│   └── types/
│       └── restaurant.ts             ← Shared types + carbon equivalent calculator
│
└── frontend/features/
    ├── lookup/
    │   ├── services/restaurantLookup.ts   ← API client calls
    │   └── hooks/useRestaurantScan.ts     ← TanStack Query mutations/queries
    ├── profile/
    │   └── hooks/useSparks.ts             ← Zustand + TanStack Query Sparks state
    └── restaurant/components/
        ├── FoodImpactCard.tsx             ← Food scan result UI
        ├── MaterialImpactCard.tsx         ← Material scan result UI
        └── SparksBadge.tsx                ← Sparks badge + animated toast
```

---

## Setup checklist

### 1. Database

```bash
# Enable fuzzy matching (required for food name lookup)
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"

# Run migrations in order
psql $DATABASE_URL < src/db/migrations/001_add_sparks_table.sql
psql $DATABASE_URL < src/db/migrations/002_add_food_emission_factors.sql
psql $DATABASE_URL < src/db/migrations/003_add_material_impacts.sql
```

Run the seed data (TypeScript, using your existing db connection):

```typescript
import { Pool } from 'pg';
import { seedFoodEmissionFactors } from './src/db/seeds/food_emission_factors';
import { seedMaterialImpacts }     from './src/db/seeds/material_impacts';

const db = new Pool({ connectionString: process.env.DATABASE_URL });
await seedFoodEmissionFactors(db);
await seedMaterialImpacts(db);
```

### 2. Environment variables

Add to your `.env` (backend):

```env
# Required for photo-based food identification
GOOGLE_VISION_API_KEY=your_key_here

# Optional — free tier available at fdc.nal.usda.gov/api-key-signup.html
# Works without a key (DEMO_KEY rate limit applies)
USDA_API_KEY=your_key_here

# Optional — fallback carbon estimates. 100 free calls/month at climatiq.io
CLIMATIQ_API_KEY=your_key_here
```

Add to your Expo `.env`:

```env
EXPO_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

### 3. Wire the controllers

In your existing Express router (wherever `POST /lookup/image` and `GET /search` are defined):

```typescript
// In your routes file (e.g., src/routes/lookup.ts or src/app.ts)
import { createLookupController } from '../controllers/lookup';
import { createSearchController  } from '../controllers/search';

const imageLookupHandler = createLookupController(db);
const searchHandler      = createSearchController(db);

// Replace or extend existing route registrations:
router.post('/lookup/image', authMiddleware, imageLookupHandler);
router.get('/search',        authMiddleware, searchHandler);
```

Add the Sparks endpoint (new, add alongside existing user routes):

```typescript
// In your user routes (e.g., src/routes/user.ts)
import { SparksService } from '../services/restaurant/sparksService';

router.get('/user/sparks', authMiddleware, async (req, res) => {
  const sparksService = new SparksService(db);
  const summary = await sparksService.getSummary(req.user.id);
  res.json({ data: summary, meta: {}, error: null });
});
```

### 4. Frontend integration

Copy the `frontend/` files into your Expo project matching the existing feature folder structure. Then wire the two places that need updating:

**Replace the auth token placeholder** in `restaurantLookup.ts` and `useRestaurantScan.ts`:
```typescript
// Replace:
function useToken(): string { return ''; }
// With:
import { useAuthStore } from '../../auth/authStore';
const token = useAuthStore(s => s.token);
```

**Wire Sparks to your existing Zustand store** or use the provided `useSparksStore` from `useSparks.ts`. Add `<SparksBadge />` to your Home screen header.

---

## API request examples

### Photograph food
```http
POST /api/v1/lookup/image
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "<base64-encoded-jpeg>",
  "mode": "food"
}
```

### Look up a menu item
```http
GET /api/v1/search?q=salmon+filet&mode=food
Authorization: Bearer <token>
```

### Photograph a material
```http
POST /api/v1/lookup/image
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "<base64-encoded-jpeg>",
  "mode": "material"
}
```

### Get Sparks
```http
GET /api/v1/user/sparks
Authorization: Bearer <token>
```

---

## Response shape (all endpoints)

Matches the existing `{ data, meta, error }` envelope:

```json
{
  "data": {
    "type": "food",
    "food": {
      "matched_name": "salmon",
      "kg_co2e_per_serving": 1.2,
      "serving_size_g": 200,
      "confidence": "high",
      "impact_tier": "medium",
      "estimate_type": "exact"
    },
    "equivalents": [
      { "label": "Miles driven", "value": "3.0", "unit": "miles", "icon": "🚗" }
    ]
  },
  "meta": {
    "sparks": {
      "awarded": 1,
      "newTotal": 7,
      "isFirstScan": false,
      "reason": "Photographed food — salmon"
    },
    "scan_mode": "food",
    "scanned_at": "2026-03-16T14:23:00Z"
  },
  "error": null
}
```

---

## Lookup chain (food)

```
User photo / menu text
       ↓
Google Vision API (LABEL_DETECTION)
       ↓
food_emission_factors: exact match
       ↓ (no match)
food_emission_factors: alias match
       ↓ (no match)
food_emission_factors: fuzzy match (pg_trgm)
       ↓ (no match)
food_emission_factors: category fallback
       ↓ (no match)
Climatiq API (category-level estimate)
       ↓ (no match)
NO_DATA_FOUND (show NoMatchScreen)
```

USDA enrichment runs in parallel with any successful match to add nutritional context.

---

## Sparks earning rules

| Action | Sparks earned |
|---|---|
| Food photo scan (successful) | 1 |
| Menu text lookup (successful) | 1 |
| Material scan (successful) | 1 |
| Table scan (N items) | N |
| First scan ever | +2 bonus |

---

## API key acquisition

| API | Required? | Cost | Link |
|---|---|---|---|
| Google Vision | Yes (photo scan only) | $1.50/1,000 images | [console.cloud.google.com](https://console.cloud.google.com) |
| USDA FoodData Central | No (DEMO_KEY works) | Free | [fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html) |
| Climatiq | No (fallback only) | Free up to 100/mo | [climatiq.io](https://www.climatiq.io) |
| SeafoodWatch | Future phase | Requires approval | [fisheries.noaa.gov](https://www.fisheries.noaa.gov) |

Text-based menu lookup (`GET /search?mode=food`) works **with zero API keys** — it uses only the static emission factor table.
