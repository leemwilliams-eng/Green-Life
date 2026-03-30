// FILE: src/controllers/lookup.ts
// Green Life — Extended image lookup controller
//
// EXTENDS the existing POST /api/v1/lookup/image endpoint.
// Original behavior (mode: 'product') is untouched.
// New modes: 'food' and 'material' route to the restaurant pipeline.
//
// Response always uses the existing envelope: { data, meta, error }
// The `meta` field gains `sparks` and `scan_mode` on restaurant lookups.
//
// Dependencies (inject via your existing DI / service container):
//   - Pool (pg)              — database
//   - FoodEmissionService    — food carbon lookup
//   - MaterialImpactService  — material sustainability lookup
//   - VisionService          — Google Vision API (src/services/restaurant/visionService.ts)
//   - UsdaService            — USDA enrichment (optional, graceful fallback)
//   - ClimatiqService        — carbon fallback (optional, graceful fallback)
//   - SparksService          — awards and persists Sparks

import type { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

import { FoodEmissionService } from '../services/restaurant/foodEmissionService';
import { MaterialImpactService } from '../services/restaurant/materialImpactService';
import { SparksService } from '../services/restaurant/sparksService';
import { VisionService } from '../services/restaurant/visionService';
import { UsdaService } from '../services/restaurant/usdaService';
import { ClimatiqService } from '../services/restaurant/climatiqService';
import {
  ImageLookupRequest,
  FoodLookupData,
  MaterialLookupData,
  RestaurantScanMeta,
  buildCarbonEquivalents,
} from '../types/restaurant';

// ─── Controller factory ───────────────────────────────────────────────────────
// Returns the handler bound to your service instances.
// Wire this up in your Express router where the existing /lookup/image lives.
//
// Example (in your routes/lookup.ts or similar):
//   import { createLookupController } from '../controllers/lookup';
//   const lookupHandler = createLookupController(db);
//   router.post('/lookup/image', authMiddleware, lookupHandler);

export function createLookupController(db: Pool) {
  const foodService     = new FoodEmissionService(db);
  const materialService = new MaterialImpactService(db);
  const sparksService   = new SparksService(db);
  const visionService   = new VisionService();
  const usdaService     = new UsdaService();
  const climatiqService = new ClimatiqService();

  return async function imageLookupHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { image, mode = 'product', servingSizeOverrideG } =
        req.body as ImageLookupRequest;

      // userId from auth middleware (e.g. req.user.id in existing codebase)
      const userId = (req as unknown as { user?: { id: string } }).user?.id;

      // ── Mode: product (original behavior, pass-through) ──────────────────
      if (mode === 'product') {
        // Call your existing product lookup logic here.
        // This controller stub returns a 501 as a placeholder — replace with
        // a call to your existing product lookup service.
        res.status(501).json({
          data: null,
          meta: {},
          error: { code: 'NOT_IMPLEMENTED', message: 'Product mode: wire to existing lookup service' },
        });
        return;
      }

      // ── Validate image payload ────────────────────────────────────────────
      if (!image || typeof image !== 'string') {
        res.status(400).json({
          data: null,
          meta: {},
          error: { code: 'INVALID_REQUEST', message: 'image field (base64) is required' },
        });
        return;
      }

      // ── Mode: food ────────────────────────────────────────────────────────
      if (mode === 'food') {
        // Step 1: Call Google Vision to identify food labels
        const visionLabels = await visionService.identifyFood(image);

        if (!visionLabels.length) {
          res.status(200).json({
            data: null,
            meta: { scan_mode: 'food', scanned_at: new Date().toISOString() },
            error: { code: 'NO_FOOD_DETECTED', message: 'No food items were identified in this image.' },
          });
          return;
        }

        // Step 2: Try each label in confidence order until we get a match
        let foodResult = null;
        let matchedLabel = '';

        for (const label of visionLabels) {
          foodResult = await foodService.lookup(label, servingSizeOverrideG);
          if (foodResult) {
            matchedLabel = label;
            break;
          }
        }

        // Step 3: USDA enrichment (optional, non-blocking)
        let usdaEnrichment = null;
        if (foodResult) {
          usdaEnrichment = await usdaService.enrich(foodResult.matched_name).catch(() => null);
        }

        // Step 4: Climatiq fallback if static table gave no result
        if (!foodResult && visionLabels.length > 0) {
          const climatiqResult = await climatiqService
            .estimateFood(visionLabels[0])
            .catch(() => null);

          if (climatiqResult) {
            // Wrap Climatiq result in our FoodImpactResult shape
            foodResult = climatiqResult;
            matchedLabel = visionLabels[0];
          }
        }

        if (!foodResult) {
          res.status(200).json({
            data: null,
            meta: { scan_mode: 'food', scanned_at: new Date().toISOString() },
            error: {
              code: 'NO_DATA_FOUND',
              message: `Could not find impact data for: ${visionLabels[0] ?? 'unknown food'}`,
            },
          });
          return;
        }

        // Step 5: Award Sparks (non-blocking — do not fail the response if this errors)
        let sparks = null;
        if (userId) {
          sparks = await sparksService
            .award(userId, 'food_photo', foodResult.matched_name)
            .catch(err => {
              console.error('Sparks award failed (non-fatal):', err);
              return null;
            });
        }

        // Step 6: Build response in existing envelope shape
        const data: FoodLookupData = {
          type: 'food',
          food: {
            ...foodResult,
            // Attach USDA enrichment if available
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

      // ── Mode: material ────────────────────────────────────────────────────
      if (mode === 'material') {
        // Step 1: Vision API — OBJECT_LOCALIZATION for material detection
        const materialLabels = await visionService.identifyMaterial(image);

        if (!materialLabels.length) {
          res.status(200).json({
            data: null,
            meta: { scan_mode: 'material', scanned_at: new Date().toISOString() },
            error: { code: 'NO_MATERIAL_DETECTED', message: 'No restaurant materials identified in this image.' },
          });
          return;
        }

        // Step 2: Match against material_impacts table
        let materialResult = null;
        for (const { label, itemType } of materialLabels) {
          materialResult = await materialService.lookup(label, itemType);
          if (materialResult) break;
        }

        if (!materialResult) {
          res.status(200).json({
            data: null,
            meta: { scan_mode: 'material', scanned_at: new Date().toISOString() },
            error: {
              code: 'NO_DATA_FOUND',
              message: `Could not find impact data for: ${materialLabels[0]?.label ?? 'unknown material'}`,
            },
          });
          return;
        }

        // Step 3: Award Sparks
        let sparks = null;
        if (userId) {
          sparks = await sparksService
            .award(userId, 'material_scan', materialResult.matched_name)
            .catch(err => {
              console.error('Sparks award failed (non-fatal):', err);
              return null;
            });
        }

        const data: MaterialLookupData = {
          type: 'material',
          material: materialResult,
        };

        const meta: RestaurantScanMeta = {
          sparks: sparks!,
          scan_mode: 'material',
          scanned_at: new Date().toISOString(),
        };

        res.status(200).json({ data, meta, error: null });
        return;
      }

      // Unrecognized mode
      res.status(400).json({
        data: null,
        meta: {},
        error: { code: 'INVALID_MODE', message: `Unknown lookup mode: ${mode}` },
      });
    } catch (err) {
      next(err);
    }
  };
}
