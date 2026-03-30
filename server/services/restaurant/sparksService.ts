// FILE: src/services/restaurant/sparksService.ts
// Green Life — Sparks gamification service
// "Every Spark starts a fire."
//
// Rules (from PRD v0.2):
//   - 1 Spark  per successful photo scan (food or material)
//   - 1 Spark  per successful menu / text lookup
//   - 1 Spark  per table scan item (N items = N sparks)
//   - 2 Sparks bonus for the user's very first scan ever
//   - Sparks are server-persisted (survive app reinstall, tied to account)

import { Pool } from 'pg';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SparkScanType =
  | 'food_photo'
  | 'food_menu'
  | 'material_scan'
  | 'table_scan'
  | 'barcode'
  | 'first_scan';

export interface SparkAwardResult {
  /** Total sparks awarded in this action (base + any bonus) */
  awarded: number;
  /** User's new running total after this award */
  newTotal: number;
  /** True if this was the user's very first scan (bonus awarded) */
  isFirstScan: boolean;
  /** Human-readable reason string stored on the spark record */
  reason: string;
}

export interface SparkHistory {
  id: string;
  amount: number;
  reason: string;
  scan_type: SparkScanType;
  item_name: string | null;
  created_at: Date;
}

export interface UserSparkSummary {
  total_sparks: number;
  scan_count: number;
  last_spark_at: Date | null;
  recent: SparkHistory[];
}

// ─── Service class ────────────────────────────────────────────────────────────

export class SparksService {
  constructor(private readonly db: Pool) {}

  /**
   * Award sparks to a user for a completed scan.
   * Automatically awards the first-scan bonus if this is their first ever lookup.
   *
   * @param userId   - Authenticated user ID
   * @param scanType - What kind of scan triggered this
   * @param itemName - Optional: name of the item that was scanned (for display)
   * @param count    - Number of sparks to award (default 1; pass N for table scans)
   */
  async award(
    userId: string,
    scanType: SparkScanType,
    itemName?: string,
    count = 1
  ): Promise<SparkAwardResult> {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN');

      // Check if this is the user's very first scan
      const priorScans = await client.query<{ cnt: string }>(
        'SELECT COUNT(*)::text AS cnt FROM sparks WHERE user_id = $1',
        [userId]
      );
      const isFirstScan = parseInt(priorScans.rows[0].cnt, 10) === 0;

      const baseReason = this.buildReason(scanType, itemName, count);

      // Insert base spark(s)
      await client.query(
        `INSERT INTO sparks (user_id, amount, reason, scan_type, item_name)
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, count, baseReason, scanType, itemName ?? null]
      );

      let totalAwarded = count;

      // First-scan bonus: +2 sparks
      if (isFirstScan) {
        await client.query(
          `INSERT INTO sparks (user_id, amount, reason, scan_type, item_name)
           VALUES ($1, 2, 'First scan bonus — every Spark starts a fire! 🔥', 'first_scan', $2)`,
          [userId, itemName ?? null]
        );
        totalAwarded += 2;
      }

      // Get new total
      const totalResult = await client.query<{ total: string }>(
        'SELECT COALESCE(SUM(amount), 0)::text AS total FROM sparks WHERE user_id = $1',
        [userId]
      );
      const newTotal = parseInt(totalResult.rows[0].total, 10);

      await client.query('COMMIT');

      return {
        awarded: totalAwarded,
        newTotal,
        isFirstScan,
        reason: baseReason,
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  /**
   * Get a user's spark summary: total, scan count, recent history.
   */
  async getSummary(userId: string, recentLimit = 10): Promise<UserSparkSummary> {
    const [totalsResult, historyResult] = await Promise.all([
      this.db.query<{
        total_sparks: string;
        scan_count: string;
        last_spark_at: Date | null;
      }>(
        `SELECT
           COALESCE(SUM(amount), 0)::text AS total_sparks,
           COUNT(*)::text                 AS scan_count,
           MAX(created_at)                AS last_spark_at
         FROM sparks
         WHERE user_id = $1`,
        [userId]
      ),
      this.db.query<SparkHistory>(
        `SELECT id, amount, reason, scan_type, item_name, created_at
         FROM sparks
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT $2`,
        [userId, recentLimit]
      ),
    ]);

    const totals = totalsResult.rows[0];
    return {
      total_sparks: parseInt(totals.total_sparks, 10),
      scan_count: parseInt(totals.scan_count, 10),
      last_spark_at: totals.last_spark_at,
      recent: historyResult.rows,
    };
  }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private buildReason(
    scanType: SparkScanType,
    itemName: string | undefined,
    count: number
  ): string {
    const item = itemName ? ` — ${itemName}` : '';
    switch (scanType) {
      case 'food_photo':
        return `Photographed food${item}`;
      case 'food_menu':
        return `Looked up menu item${item}`;
      case 'material_scan':
        return `Scanned restaurant material${item}`;
      case 'table_scan':
        return `Table scan: ${count} item${count !== 1 ? 's' : ''}${item}`;
      case 'barcode':
        return `Scanned barcode${item}`;
      default:
        return `Scan${item}`;
    }
  }
}
