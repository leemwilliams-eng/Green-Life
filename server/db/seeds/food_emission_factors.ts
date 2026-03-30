// FILE: src/db/seeds/food_emission_factors.ts
// Green Life — Restaurant food emission factor seed data
// Source: Agribalyse v3.1, IPCC AR6 Annex III, Poore & Nemecek (2018) Science
// Units: kg CO₂e per kg of food (farm-to-fork, edible portion)
//
// Usage: import this array and INSERT into food_emission_factors table.
// Run with your existing migration/seed runner, e.g.:
//   import { seedFoodEmissionFactors } from './seeds/food_emission_factors';
//   await seedFoodEmissionFactors(db);

export interface FoodEmissionFactorSeed {
  food_name: string;
  aliases: string[];
  category: string;
  kg_co2e_per_kg: number;
  serving_size_g: number;
  land_use_m2_per_kg?: number;
  water_use_l_per_kg?: number;
  confidence: 'high' | 'medium' | 'low';
  source_citation?: string;
}

export const FOOD_EMISSION_FACTORS: FoodEmissionFactorSeed[] = [
  // ─── BEEF ─────────────────────────────────────────────────────────────────
  {
    food_name: 'beef',
    aliases: ['steak', 'burger', 'hamburger', 'ground beef', 'beef patty', 'ribeye', 'sirloin',
              'filet mignon', 'beef tenderloin', 'beef brisket', 'beef short rib', 'wagyu'],
    category: 'beef',
    kg_co2e_per_kg: 60.0,
    serving_size_g: 200,
    land_use_m2_per_kg: 164.0,
    water_use_l_per_kg: 1451,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018), Science 360(6392)',
  },
  {
    food_name: 'beef burger',
    aliases: ['cheeseburger', 'double burger', 'smash burger', 'beef slider'],
    category: 'beef',
    kg_co2e_per_kg: 50.0,         // assembled with bun dilutes pure-beef factor
    serving_size_g: 250,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── LAMB & MUTTON ────────────────────────────────────────────────────────
  {
    food_name: 'lamb',
    aliases: ['lamb chop', 'rack of lamb', 'leg of lamb', 'lamb shank', 'mutton'],
    category: 'lamb',
    kg_co2e_per_kg: 24.0,
    serving_size_g: 200,
    land_use_m2_per_kg: 185.0,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },

  // ─── PORK ─────────────────────────────────────────────────────────────────
  {
    food_name: 'pork',
    aliases: ['pork chop', 'pork loin', 'pulled pork', 'pork belly', 'bacon', 'ham',
              'pork ribs', 'spareribs', 'pork tenderloin', 'carnitas'],
    category: 'pork',
    kg_co2e_per_kg: 7.6,
    serving_size_g: 200,
    land_use_m2_per_kg: 11.0,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },

  // ─── POULTRY ──────────────────────────────────────────────────────────────
  {
    food_name: 'chicken',
    aliases: ['grilled chicken', 'fried chicken', 'chicken breast', 'chicken thigh',
              'chicken wing', 'chicken nugget', 'rotisserie chicken', 'chicken sandwich',
              'chicken tenders', 'pollo'],
    category: 'poultry',
    kg_co2e_per_kg: 9.9,
    serving_size_g: 200,
    land_use_m2_per_kg: 7.1,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'turkey',
    aliases: ['turkey breast', 'turkey burger', 'turkey sandwich', 'roast turkey'],
    category: 'poultry',
    kg_co2e_per_kg: 10.9,
    serving_size_g: 200,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'duck',
    aliases: ['duck breast', 'duck confit', 'peking duck', 'roast duck'],
    category: 'poultry',
    kg_co2e_per_kg: 13.5,
    serving_size_g: 200,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── SEAFOOD ──────────────────────────────────────────────────────────────
  {
    food_name: 'farmed salmon',
    aliases: ['salmon', 'salmon filet', 'salmon fillet', 'atlantic salmon',
              'grilled salmon', 'baked salmon', 'smoked salmon', 'salmon steak'],
    category: 'seafood',
    kg_co2e_per_kg: 6.0,
    serving_size_g: 200,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'wild salmon',
    aliases: ['wild-caught salmon', 'pacific salmon', 'sockeye salmon', 'coho salmon', 'king salmon'],
    category: 'seafood',
    kg_co2e_per_kg: 3.0,
    serving_size_g: 200,
    confidence: 'medium',
    source_citation: 'Parker et al. (2018) Nature Communications',
  },
  {
    food_name: 'shrimp',
    aliases: ['prawns', 'farmed shrimp', 'gulf shrimp', 'tiger shrimp', 'grilled shrimp',
              'shrimp scampi', 'shrimp cocktail', 'fried shrimp'],
    category: 'seafood',
    kg_co2e_per_kg: 18.0,
    serving_size_g: 150,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'tuna',
    aliases: ['ahi tuna', 'yellowfin tuna', 'bluefin tuna', 'tuna steak', 'seared tuna',
              'tuna sashimi', 'tuna poke'],
    category: 'seafood',
    kg_co2e_per_kg: 6.1,
    serving_size_g: 180,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'tilapia',
    aliases: ['farmed tilapia', 'tilapia filet'],
    category: 'seafood',
    kg_co2e_per_kg: 3.2,
    serving_size_g: 200,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'cod',
    aliases: ['cod filet', 'cod fillet', 'fish and chips cod', 'baked cod'],
    category: 'seafood',
    kg_co2e_per_kg: 4.9,
    serving_size_g: 200,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'mussels',
    aliases: ['mussel', 'steamed mussels', 'moules'],
    category: 'seafood',
    kg_co2e_per_kg: 0.7,
    serving_size_g: 300,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'oysters',
    aliases: ['oyster', 'raw oysters', 'grilled oysters', 'oysters on the half shell'],
    category: 'seafood',
    kg_co2e_per_kg: 0.6,
    serving_size_g: 120,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'lobster',
    aliases: ['lobster tail', 'whole lobster', 'steamed lobster', 'lobster bisque'],
    category: 'seafood',
    kg_co2e_per_kg: 14.5,
    serving_size_g: 300,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'crab',
    aliases: ['dungeness crab', 'king crab', 'crab legs', 'snow crab', 'soft shell crab',
              'crab cake'],
    category: 'seafood',
    kg_co2e_per_kg: 7.0,
    serving_size_g: 250,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'scallops',
    aliases: ['sea scallops', 'bay scallops', 'seared scallops', 'scallop'],
    category: 'seafood',
    kg_co2e_per_kg: 5.4,
    serving_size_g: 180,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── EGGS & DAIRY ─────────────────────────────────────────────────────────
  {
    food_name: 'eggs',
    aliases: ['scrambled eggs', 'fried egg', 'poached egg', 'hard boiled egg', 'omelette',
              'egg white', 'frittata'],
    category: 'eggs',
    kg_co2e_per_kg: 4.5,
    serving_size_g: 100,          // ~2 large eggs
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'cheese',
    aliases: ['cheddar', 'mozzarella', 'brie', 'parmesan', 'gouda', 'feta', 'blue cheese',
              'swiss cheese', 'gruyere', 'cream cheese'],
    category: 'dairy',
    kg_co2e_per_kg: 13.5,
    serving_size_g: 50,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'milk',
    aliases: ['whole milk', 'skim milk', 'dairy milk', 'glass of milk'],
    category: 'dairy',
    kg_co2e_per_kg: 3.2,
    serving_size_g: 250,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },

  // ─── PLANT-BASED PROTEINS ─────────────────────────────────────────────────
  {
    food_name: 'tofu',
    aliases: ['silken tofu', 'firm tofu', 'fried tofu', 'tofu scramble', 'mapo tofu'],
    category: 'plant_protein',
    kg_co2e_per_kg: 2.0,
    serving_size_g: 200,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'lentils',
    aliases: ['lentil soup', 'red lentils', 'green lentils', 'dal', 'dahl'],
    category: 'legumes',
    kg_co2e_per_kg: 0.9,
    serving_size_g: 200,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'beans',
    aliases: ['black beans', 'kidney beans', 'pinto beans', 'chickpeas', 'garbanzo beans',
              'white beans', 'frijoles', 'refried beans', 'bean burrito'],
    category: 'legumes',
    kg_co2e_per_kg: 0.9,
    serving_size_g: 200,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'beyond meat',
    aliases: ['plant-based burger', 'impossible burger', 'veggie burger', 'plant burger',
              'oat burger', 'beyond burger'],
    category: 'plant_protein',
    kg_co2e_per_kg: 3.5,
    serving_size_g: 200,
    confidence: 'medium',
    source_citation: 'Beyond Meat LCA (2018); Heller & Keoleian (2018)',
  },

  // ─── GRAINS & STARCHES ────────────────────────────────────────────────────
  {
    food_name: 'rice',
    aliases: ['white rice', 'brown rice', 'fried rice', 'steamed rice', 'jasmine rice',
              'basmati rice', 'sushi rice', 'risotto'],
    category: 'grain',
    kg_co2e_per_kg: 4.0,
    serving_size_g: 180,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'pasta',
    aliases: ['spaghetti', 'linguine', 'fettuccine', 'penne', 'rigatoni', 'farfalle',
              'noodles', 'tagliatelle', 'ramen noodles'],
    category: 'grain',
    kg_co2e_per_kg: 1.8,
    serving_size_g: 200,
    confidence: 'high',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'bread',
    aliases: ['sourdough', 'white bread', 'whole wheat bread', 'baguette', 'roll',
              'dinner roll', 'focaccia', 'naan', 'pita'],
    category: 'grain',
    kg_co2e_per_kg: 1.6,
    serving_size_g: 60,
    confidence: 'high',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'pizza',
    aliases: ['margherita pizza', 'cheese pizza', 'pepperoni pizza', 'pizza slice',
              'neapolitan pizza', 'flatbread pizza'],
    category: 'mixed_dish',
    kg_co2e_per_kg: 4.5,
    serving_size_g: 300,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'french fries',
    aliases: ['fries', 'chips', 'steak fries', 'waffle fries', 'sweet potato fries',
              'shoestring fries', 'potato wedges'],
    category: 'starch',
    kg_co2e_per_kg: 0.7,
    serving_size_g: 150,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── VEGETABLES ───────────────────────────────────────────────────────────
  {
    food_name: 'salad',
    aliases: ['green salad', 'house salad', 'garden salad', 'caesar salad', 'mixed greens',
              'side salad', 'arugula salad', 'spinach salad'],
    category: 'vegetable',
    kg_co2e_per_kg: 0.5,
    serving_size_g: 150,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1 (leafy greens average)',
  },
  {
    food_name: 'tomatoes',
    aliases: ['tomato', 'cherry tomatoes', 'heirloom tomatoes', 'roasted tomatoes',
              'tomato sauce', 'marinara'],
    category: 'vegetable',
    kg_co2e_per_kg: 1.4,
    serving_size_g: 100,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'broccoli',
    aliases: ['broccoli florets', 'steamed broccoli', 'roasted broccoli', 'broccoli rabe'],
    category: 'vegetable',
    kg_co2e_per_kg: 0.4,
    serving_size_g: 150,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'asparagus',
    aliases: ['grilled asparagus', 'roasted asparagus', 'steamed asparagus'],
    category: 'vegetable',
    kg_co2e_per_kg: 0.8,
    serving_size_g: 150,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'mushrooms',
    aliases: ['portobello', 'shiitake', 'cremini', 'wild mushrooms', 'sauteed mushrooms',
              'mushroom risotto', 'stuffed mushrooms'],
    category: 'vegetable',
    kg_co2e_per_kg: 0.6,
    serving_size_g: 150,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── SOUPS & STEWS ────────────────────────────────────────────────────────
  {
    food_name: 'chicken soup',
    aliases: ['chicken noodle soup', 'chicken broth', 'chicken stock', 'chicken stew',
              'chicken tortilla soup'],
    category: 'mixed_dish',
    kg_co2e_per_kg: 2.1,
    serving_size_g: 300,
    confidence: 'low',
    source_citation: 'Category proxy: poultry + vegetable blend (Agribalyse)',
  },
  {
    food_name: 'beef stew',
    aliases: ['beef bourguignon', 'beef casserole', 'pot roast', 'beef pot pie'],
    category: 'mixed_dish',
    kg_co2e_per_kg: 12.0,
    serving_size_g: 350,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── DESSERTS ─────────────────────────────────────────────────────────────
  {
    food_name: 'chocolate',
    aliases: ['chocolate cake', 'chocolate mousse', 'dark chocolate', 'milk chocolate',
              'brownie', 'chocolate dessert', 'tiramisu'],
    category: 'dessert',
    kg_co2e_per_kg: 19.0,
    serving_size_g: 100,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'ice cream',
    aliases: ['gelato', 'sorbet', 'frozen yogurt', 'sundae', 'ice cream scoop'],
    category: 'dessert',
    kg_co2e_per_kg: 3.5,
    serving_size_g: 120,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── BEVERAGES ────────────────────────────────────────────────────────────
  {
    food_name: 'coffee',
    aliases: ['espresso', 'latte', 'cappuccino', 'americano', 'drip coffee', 'cold brew',
              'macchiato', 'flat white', 'coffee drink'],
    category: 'beverage',
    kg_co2e_per_kg: 17.0,          // per kg of ground coffee; typical cup ~10g = 0.17 kg CO₂e
    serving_size_g: 10,
    water_use_l_per_kg: 18925,
    confidence: 'high',
    source_citation: 'Poore & Nemecek (2018)',
  },
  {
    food_name: 'beer',
    aliases: ['craft beer', 'lager', 'ale', 'ipa', 'stout', 'pint of beer', 'draft beer'],
    category: 'beverage',
    kg_co2e_per_kg: 1.04,         // per kg (≈1 litre)
    serving_size_g: 500,          // pint
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },
  {
    food_name: 'wine',
    aliases: ['red wine', 'white wine', 'rosé', 'rose wine', 'sparkling wine',
              'champagne', 'prosecco', 'glass of wine'],
    category: 'beverage',
    kg_co2e_per_kg: 1.4,
    serving_size_g: 175,          // standard pour
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1',
  },

  // ─── SUSHI / JAPANESE ─────────────────────────────────────────────────────
  {
    food_name: 'sushi',
    aliases: ['nigiri', 'maki', 'sashimi', 'sushi roll', 'california roll',
              'tuna roll', 'spicy tuna roll', 'salmon nigiri', 'omakase'],
    category: 'mixed_dish',
    kg_co2e_per_kg: 3.8,
    serving_size_g: 250,
    confidence: 'low',
    source_citation: 'Composite estimate: rice + seafood proportions (Agribalyse)',
  },

  // ─── INDIAN / SOUTH ASIAN ─────────────────────────────────────────────────
  {
    food_name: 'chicken tikka masala',
    aliases: ['tikka masala', 'butter chicken', 'murgh makhani', 'chicken curry'],
    category: 'mixed_dish',
    kg_co2e_per_kg: 5.8,
    serving_size_g: 350,
    confidence: 'medium',
    source_citation: 'Agribalyse v3.1 (prepared chicken dish)',
  },

  // ─── MEXICAN ──────────────────────────────────────────────────────────────
  {
    food_name: 'burrito',
    aliases: ['chicken burrito', 'beef burrito', 'bean burrito', 'burrito bowl',
              'chipotle bowl', 'taco', 'enchilada'],
    category: 'mixed_dish',
    kg_co2e_per_kg: 4.2,
    serving_size_g: 400,
    confidence: 'low',
    source_citation: 'Composite: meat + legumes + grain (Agribalyse)',
  },
];

// ─── Seed runner ─────────────────────────────────────────────────────────────

/**
 * Insert all food emission factors into the database.
 * Uses INSERT ... ON CONFLICT DO NOTHING so it is safe to re-run.
 *
 * @param db - Your pg Pool or Client instance
 */
export async function seedFoodEmissionFactors(db: {
  query: (text: string, values?: unknown[]) => Promise<unknown>;
}): Promise<void> {
  console.log(`Seeding ${FOOD_EMISSION_FACTORS.length} food emission factors...`);

  for (const row of FOOD_EMISSION_FACTORS) {
    await db.query(
      `INSERT INTO food_emission_factors
         (food_name, aliases, category, kg_co2e_per_kg, serving_size_g,
          land_use_m2_per_kg, water_use_l_per_kg, confidence, source_citation)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (food_name) DO NOTHING`,
      [
        row.food_name,
        row.aliases,
        row.category,
        row.kg_co2e_per_kg,
        row.serving_size_g,
        row.land_use_m2_per_kg ?? null,
        row.water_use_l_per_kg ?? null,
        row.confidence,
        row.source_citation ?? null,
      ]
    );
  }

  console.log('Food emission factors seeded ✓');
}
