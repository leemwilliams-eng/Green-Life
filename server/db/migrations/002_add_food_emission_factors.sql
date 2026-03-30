-- FILE: src/db/migrations/002_add_food_emission_factors.sql
-- Green Life — Static food emission factor table
-- Source: Agribalyse v3.1 + IPCC AR6 Annex III
-- Units: kg CO₂-equivalent per kg of food (as served / edible portion)
-- confidence: 'high' = direct LCA study, 'medium' = peer-reviewed estimate, 'low' = category proxy

CREATE TABLE IF NOT EXISTS food_emission_factors (
  id                  UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  food_name           TEXT    NOT NULL,                   -- Canonical name (lowercase)
  aliases             TEXT[]  NOT NULL DEFAULT '{}',      -- Alternative names for fuzzy matching
  category            TEXT    NOT NULL,                   -- 'beef', 'seafood', 'poultry', 'vegetable', etc.
  kg_co2e_per_kg      NUMERIC(8,3) NOT NULL,              -- Emission factor (kg CO₂e per kg)
  serving_size_g      INTEGER NOT NULL DEFAULT 200,       -- Default serving size in grams
  kg_co2e_per_serving NUMERIC(8,4) GENERATED ALWAYS AS   -- Computed per-serving value
                        (kg_co2e_per_kg * serving_size_g / 1000.0) STORED,
  land_use_m2_per_kg  NUMERIC(8,3),                       -- Land use (m² per kg), optional
  water_use_l_per_kg  NUMERIC(8,1),                       -- Water use (litres per kg), optional
  confidence          TEXT    NOT NULL DEFAULT 'medium'   -- 'high' | 'medium' | 'low'
                        CHECK (confidence IN ('high', 'medium', 'low')),
  source_citation     TEXT,                               -- Bibliographic reference
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_food_factors_name ON food_emission_factors (food_name);
CREATE INDEX idx_food_factors_category   ON food_emission_factors (category);
-- GIN index enables fast alias array containment searches
CREATE INDEX idx_food_factors_aliases    ON food_emission_factors USING GIN (aliases);
