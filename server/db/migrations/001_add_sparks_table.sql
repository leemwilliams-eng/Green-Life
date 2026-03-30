-- FILE: src/db/migrations/001_add_sparks_table.sql
-- Green Life — Sparks gamification table
-- Run after existing schema migrations.
-- "Every Spark starts a fire." — awarded for every successful scan.

CREATE TYPE spark_scan_type AS ENUM (
  'food_photo',       -- User photographed food
  'food_menu',        -- User typed/searched a menu item
  'material_scan',    -- User photographed a restaurant material (straw, container, etc.)
  'table_scan',       -- User scanned multiple items at a table
  'barcode',          -- Standard barcode lookup (product)
  'first_scan'        -- Bonus: very first scan ever
);

CREATE TABLE IF NOT EXISTS sparks (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount        INTEGER       NOT NULL DEFAULT 1 CHECK (amount > 0),
  reason        TEXT          NOT NULL,                  -- Human-readable label, e.g. "Photographed salmon filet"
  scan_type     spark_scan_type NOT NULL,
  item_name     TEXT,                                    -- Optional: the food/product that triggered the spark
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Index for fast per-user totals and history
CREATE INDEX idx_sparks_user_id       ON sparks (user_id);
CREATE INDEX idx_sparks_user_created  ON sparks (user_id, created_at DESC);

-- Convenience view: total sparks per user
CREATE OR REPLACE VIEW user_spark_totals AS
  SELECT
    user_id,
    SUM(amount)::INTEGER  AS total_sparks,
    COUNT(*)::INTEGER     AS scan_count,
    MAX(created_at)       AS last_spark_at
  FROM sparks
  GROUP BY user_id;
