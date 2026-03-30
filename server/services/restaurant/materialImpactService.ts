// FILE: src/services/restaurant/materialImpactService.ts
// Green Life — Restaurant material impact lookup service
//
// Called when user photographs a straw, container, bag, or other restaurant material.
// Lookup chain: exact match → alias → fuzzy → item_type fallback

import { Pool } from 'pg';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MaterialImpactResult {
  /** Matched material name */
  matched_name: string;
  /** Original query / Vision API label */
  query: string;
  /** How the match was made */
  match_method: 'exact' | 'alias' | 'fuzzy' | 'item_type_fallback' | 'not_found';
  material_type: string;
  item_type: string;
  /** kg CO₂e for one unit of this item */
  kg_co2e_per_unit: number;
  recyclable: boolean;
  compostable: boolean;
  decomposition_label: string;
  recyclability_note: string;
  disposal_guidance: string;
  better_alternative: string;
  confidence: 'high' | 'medium' | 'low';
  source_citation?: string;
  /** UI severity: 'critical' = foam/plastic, 'moderate' = coated paper, 'good' = recyclable metal */
  sustainability_rating: 'critical' | 'moderate' | 'good';
}

// ─── Service class ────────────────────────────────────────────────────────────

export class MaterialImpactService {
  constructor(private readonly db: Pool) {}

  /**
   * Look up the sustainability impact of a restaurant material.
   *
   * @param query     - Material description from Vision API (e.g. "plastic straw", "styrofoam cup")
   * @param itemType  - Optional hint from Vision context (e.g. 'straw', 'cup', 'container')
   */
  async lookup(
    query: string,
    itemType?: string
  ): Promise<MaterialImpactResult | null> {
    const normalized = query.toLowerCase().trim();

    const exact = await this.exactMatch(normalized);
    if (exact) return this.toResult(exact, normalized, 'exact');

    const alias = await this.aliasMatch(normalized);
    if (alias) return this.toResult(alias, normalized, 'alias');

    const fuzzy = await this.fuzzyMatch(normalized);
    if (fuzzy) return this.toResult(fuzzy, normalized, 'fuzzy');

    if (itemType) {
      const typeFallback = await this.itemTypeFallback(itemType);
      if (typeFallback) return this.toResult(typeFallback, normalized, 'item_type_fallback');
    }

    return null;
  }

  // ─── Private queries ────────────────────────────────────────────────────────

  private async exactMatch(name: string) {
    const r = await this.db.query<DbRow>(
      `SELECT * FROM material_impacts WHERE material_name = $1 LIMIT 1`,
      [name]
    );
    return r.rows[0] ?? null;
  }

  private async aliasMatch(name: string) {
    const r = await this.db.query<DbRow>(
      `SELECT * FROM material_impacts
       WHERE $1 = ANY(aliases)
          OR EXISTS (
            SELECT 1 FROM unnest(aliases) a
            WHERE $1 ILIKE '%' || a || '%' OR a ILIKE '%' || $1 || '%'
          )
       ORDER BY confidence DESC
       LIMIT 1`,
      [name]
    );
    return r.rows[0] ?? null;
  }

  private async fuzzyMatch(name: string) {
    try {
      const r = await this.db.query<DbRow>(
        `SELECT * FROM material_impacts
         WHERE similarity(material_name, $1) > 0.25
         ORDER BY similarity(material_name, $1) DESC
         LIMIT 1`,
        [name]
      );
      return r.rows[0] ?? null;
    } catch {
      return null;
    }
  }

  private async itemTypeFallback(itemType: string) {
    // Return worst-rated (foam/plastic) item of this type as a conservative default
    const r = await this.db.query<DbRow>(
      `SELECT * FROM material_impacts
       WHERE item_type = $1
       ORDER BY kg_co2e_per_unit DESC
       LIMIT 1`,
      [itemType.toLowerCase()]
    );
    return r.rows[0] ?? null;
  }

  // ─── Result mapper ──────────────────────────────────────────────────────────

  private toResult(
    row: DbRow,
    query: string,
    method: MaterialImpactResult['match_method']
  ): MaterialImpactResult {
    const rating = this.sustainabilityRating(row);
    return {
      matched_name: row.material_name,
      query,
      match_method: method,
      material_type: row.material_type,
      item_type: row.item_type,
      kg_co2e_per_unit: parseFloat(String(row.kg_co2e_per_unit)),
      recyclable: row.recyclable,
      compostable: row.compostable,
      decomposition_label: row.decomposition_label,
      recyclability_note: row.recyclability_note,
      disposal_guidance: row.disposal_guidance,
      better_alternative: row.better_alternative,
      confidence: row.confidence as MaterialImpactResult['confidence'],
      source_citation: row.source_citation ?? undefined,
      sustainability_rating: rating,
    };
  }

  private sustainabilityRating(row: DbRow): MaterialImpactResult['sustainability_rating'] {
    if (row.material_type === 'foam') return 'critical';
    if (row.recyclable || row.compostable) {
      // Metal reusable = good, single-use recyclable = moderate
      return row.material_type === 'metal' ? 'good' : 'moderate';
    }
    return 'critical';
  }
}

// ─── Internal DB row type ─────────────────────────────────────────────────────
interface DbRow {
  material_name: string;
  aliases: string[];
  material_type: string;
  item_type: string;
  kg_co2e_per_unit: number | string;
  recyclable: boolean;
  compostable: boolean;
  decomposition_label: string;
  recyclability_note: string;
  disposal_guidance: string;
  better_alternative: string;
  confidence: string;
  source_citation?: string | null;
}
