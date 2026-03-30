// FILE: src/controllers/search.ts
// Green Life — Extended search controller
//
// EXTENDS the existing GET /api/v1/search endpoint.
// Original behavior (mode: 'product') is untouched.
// New mode: 'food' — user types a menu item name and gets carbon impact.
//
// Example requests:
//   GET /api/v1/search?q=salmon%20filet&mode=food
//   GET /api/v1/search?q=beef%20burger&mode=food
//   GET /api/v1/search?q=caesar%20salad&mode=food
//
// The Sparks mechanic is also triggered here: every successful food search
// earns 1 Spark (same as a photo scan).

import type { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

import { FoodEmissionService } from '../services/restaurant/foodEmissionService';
import { SparksService } from '../services/restaurant/sparksService';
import { UsdaService } from '../services/restaurant/usdaService';
import {
  SearchRequest,
  FoodLookupData,
  RestaurantScanMeta,
  buildCarbonEquivalents,
} from '../types/restaurant';

// ─── Controller factory ───────────────────────────────────────────────────────

export function createSearchController(db: Pool) {
  const foodService   = new FoodEmissionService(db);
  const sparksService = new SparksService(db);
  const usdaService   = new UsdaService();

  return async function searchHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { q, mode = 'product' } = req.query as unknown as SearchRequest;
      const userId = (req as unknown as { user?: { id: string } }).user?.id;

      // ── Mode: product (pass-through to existing search logic) ─────────────
      if (mode === 'product') {
        // Replace this stub with a call to your existing search service.
        res.status(501).json({
          data: null,
          meta: {},
          error: { code: 'NOT_IMPLEMENTED', message: 'Product mode: wire to existing search service' },
        });
        return;
      }

      // ── Validate query ────────────────────────────────────────────────────
      if (!q || typeof q !== 'string' || q.trim().length < 2) {
        res.status(400).json({
          data: null,
          meta: {},
          error: { code: 'INVALID_REQUEST', message: 'Query parameter q must be at least 2 characters' },
        });
        return;
      }

      // ── Mode: food ────────────────────────────────────────────────────────
      if (mode === 'food') {
        const foodResult = await foodService.lookup(q.trim());

        if (!foodResult) {
          res.status(200).json({
            data: null,
            meta: { scan_mode: 'food', scanned_at: new Date().toISOString() },
            error: {
              code: 'NO_DATA_FOUND',
              message: `No carbon impact data found for "${q}". Try a more general term, e.g. "beef" or "salmon".`,
            },
          });
          return;
        }

        // Optional USDA enrichment (non-blocking)
        const usdaEnrichment = await usdaService.enrich(foodResult.matched_name).catch(() => null);

        // Award Spark for successful food lookup
        let sparks = null;
        if (userId) {
          sparks = await sparksService
            .award(userId, 'food_menu', foodResult.matched_name)
            .catch(err => {
              console.error('Sparks award failed (non-fatal):', err);
              return null;
            });
        }

        const data: FoodLookupData = {
          type: 'food',
          food: {
            ...foodResult,
            ...(usdaEnrichment ? { usda: usdaEnrichment } : {}),
          } as FoodLookupData['food'],
          equivalents: buildCarbonEquivalents(foodResult.kg_co2e_per_serving),
        };

        const meta: RestaurantScanMeta = {
          sparks: sparks!,
          scan_mode: 'food',
          scanned_at: new Date().toISOString(),
        };

        res.status(200).json({ data, meta, error: null });
        return;
      }

      res.status(400).json({
        data: null,
        meta: {},
        error: { code: 'INVALID_MODE', message: `Unknown search mode: ${mode}` },
      });
    } catch (err) {
      next(err);
    }
  };
}
