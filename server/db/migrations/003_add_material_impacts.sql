-- FILE: src/db/migrations/003_add_material_impacts.sql
-- Green Life — Restaurant material impact table
-- Covers disposable items users commonly see in restaurants.
-- Source: Franklin Associates LCA data, Plastics Europe eco-profiles

CREATE TABLE IF NOT EXISTS material_impacts (
  id                    UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  material_name         TEXT    NOT NULL,                   -- Canonical name (lowercase)
  aliases               TEXT[]  NOT NULL DEFAULT '{}',
  material_type         TEXT    NOT NULL,                   -- 'plastic', 'bioplastic', 'paper', 'metal', 'foam'
  item_type             TEXT    NOT NULL,                   -- 'straw', 'cup', 'container', 'bag', 'cutlery', etc.
  kg_co2e_per_unit      NUMERIC(8,5) NOT NULL,              -- Per single item (e.g. one straw)
  recyclable            BOOLEAN NOT NULL DEFAULT false,
  compostable           BOOLEAN NOT NULL DEFAULT false,
  decomposition_years   INTEGER,                           -- NULL = does not decompose
  decomposition_label   TEXT,                              -- e.g. "500+ years", "90 days (industrial)"
  recyclability_note    TEXT,                              -- Context ("accepted in most US curbside programs")
  disposal_guidance     TEXT,                              -- What the user should do with it
  better_alternative    TEXT,                              -- e.g. "metal straw", "ceramic mug"
  confidence            TEXT NOT NULL DEFAULT 'medium'
                          CHECK (confidence IN ('high', 'medium', 'low')),
  source_citation       TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_material_name      ON material_impacts (material_name);
CREATE INDEX idx_material_type            ON material_impacts (material_type);
CREATE INDEX idx_material_item_type       ON material_impacts (item_type);
CREATE INDEX idx_material_aliases         ON material_impacts USING GIN (aliases);
