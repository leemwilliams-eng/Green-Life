// FILE: src/db/seeds/material_impacts.ts
// Green Life — Restaurant material impact seed data
// Source: Franklin Associates LCA data, Plastics Europe, Foodservice Packaging Institute
// Covers disposable items commonly seen in restaurants that users can photograph.

export interface MaterialImpactSeed {
  material_name: string;
  aliases: string[];
  material_type: 'plastic' | 'bioplastic' | 'paper' | 'metal' | 'foam' | 'ceramic' | 'glass';
  item_type: string;
  kg_co2e_per_unit: number;
  recyclable: boolean;
  compostable: boolean;
  decomposition_years?: number;   // undefined = does not fully decompose
  decomposition_label: string;
  recyclability_note: string;
  disposal_guidance: string;
  better_alternative: string;
  confidence: 'high' | 'medium' | 'low';
  source_citation?: string;
}

export const MATERIAL_IMPACTS: MaterialImpactSeed[] = [
  // ─── STRAWS ───────────────────────────────────────────────────────────────
  {
    material_name: 'plastic straw',
    aliases: ['polypropylene straw', 'pp straw', 'disposable straw', 'plastic drinking straw'],
    material_type: 'plastic',
    item_type: 'straw',
    kg_co2e_per_unit: 0.00054,    // ~0.54g CO₂e per straw
    recyclable: false,
    compostable: false,
    decomposition_label: '200+ years',
    recyclability_note: 'Too small to be sorted at most recycling facilities. Cannot be recycled.',
    disposal_guidance: 'Landfill only. Do not flush — enters waterways and harms marine life.',
    better_alternative: 'Metal straw, glass straw, or bamboo straw',
    confidence: 'medium',
    source_citation: 'Plastics Europe eco-profiles; Life Cycle Thinking initiative (2020)',
  },
  {
    material_name: 'paper straw',
    aliases: ['kraft paper straw', 'paper drinking straw', 'eco straw', 'biodegradable straw'],
    material_type: 'paper',
    item_type: 'straw',
    kg_co2e_per_unit: 0.00033,
    recyclable: false,            // wet paper straws are not recyclable
    compostable: true,
    decomposition_label: '2–6 months (industrial compost), 6–24 months (home)',
    recyclability_note: 'Cannot be recycled when wet. Must go to compost or landfill.',
    disposal_guidance: 'Compost if industrial composting is available. Otherwise landfill.',
    better_alternative: 'Reusable metal or glass straw',
    confidence: 'medium',
    source_citation: 'Intertek LCA study (2019)',
  },
  {
    material_name: 'metal straw',
    aliases: ['stainless steel straw', 'reusable straw', 'steel straw'],
    material_type: 'metal',
    item_type: 'straw',
    kg_co2e_per_unit: 0.068,      // higher upfront, but break-even at ~125 uses vs plastic
    recyclable: true,
    compostable: false,
    decomposition_label: 'Does not biodegrade (recyclable indefinitely)',
    recyclability_note: 'Fully recyclable at end of life through scrap metal programs.',
    disposal_guidance: 'Reuse. Recycle through scrap metal when worn out.',
    better_alternative: 'Already the best single option for repeated use.',
    confidence: 'medium',
    source_citation: 'Muncke et al. (2020) SSRN; manufacturer LCA data',
  },
  {
    material_name: 'pla straw',
    aliases: ['bioplastic straw', 'compostable plastic straw', 'corn starch straw'],
    material_type: 'bioplastic',
    item_type: 'straw',
    kg_co2e_per_unit: 0.00048,
    recyclable: false,
    compostable: true,
    decomposition_label: '60–90 days (industrial compost only)',
    recyclability_note: 'Contaminates plastic recycling streams. Do not put in plastic bin.',
    disposal_guidance: 'Industrial compost only. Landfill if industrial compost unavailable — it will NOT decompose in home compost or the environment.',
    better_alternative: 'Metal or glass reusable straw',
    confidence: 'medium',
    source_citation: 'NatureWorks LCA (2020)',
  },

  // ─── CUPS ─────────────────────────────────────────────────────────────────
  {
    material_name: 'styrofoam cup',
    aliases: ['polystyrene cup', 'foam cup', 'eps cup', 'expanded polystyrene cup', 'coffee cup foam'],
    material_type: 'foam',
    item_type: 'cup',
    kg_co2e_per_unit: 0.0066,
    recyclable: false,
    compostable: false,
    decomposition_label: '500+ years',
    recyclability_note: 'Not accepted in curbside recycling. Some specialty drop-off programs exist for EPS foam.',
    disposal_guidance: 'Landfill. Keep away from stormwater drains — foam fragments into microplastics.',
    better_alternative: 'Paper cup with lid, or reusable travel mug',
    confidence: 'high',
    source_citation: 'Franklin Associates (2018) Comparative LCA of EPS and Alternatives',
  },
  {
    material_name: 'paper coffee cup',
    aliases: ['paper cup', 'hot cup', 'kraft coffee cup', 'disposable coffee cup'],
    material_type: 'paper',
    item_type: 'cup',
    kg_co2e_per_unit: 0.011,      // PE-lined paper cup
    recyclable: false,            // plastic lining prevents recycling at most facilities
    compostable: false,
    decomposition_label: '30+ years (PE lining slows degradation)',
    recyclability_note: 'Polyethylene lining makes most paper cups non-recyclable. Some facilities accept them — check locally.',
    disposal_guidance: 'Landfill in most cities. Bring your own mug for repeated visits.',
    better_alternative: 'Reusable ceramic or travel mug',
    confidence: 'medium',
    source_citation: 'Hocking (1994) Environmental Management; updated Franklin Associates (2018)',
  },
  {
    material_name: 'plastic cup',
    aliases: ['pet cup', 'cold cup', 'plastic to-go cup', 'clear plastic cup', 'pp cup'],
    material_type: 'plastic',
    item_type: 'cup',
    kg_co2e_per_unit: 0.0072,
    recyclable: true,
    compostable: false,
    decomposition_label: '450+ years',
    recyclability_note: '#1 PET cups accepted in most curbside programs. Remove lid and straw first.',
    disposal_guidance: 'Rinse and recycle if labeled #1 PET or #5 PP. Check local guidelines.',
    better_alternative: 'Reusable cup or personal water bottle',
    confidence: 'medium',
    source_citation: 'Plastics Europe eco-profiles',
  },

  // ─── CONTAINERS / TAKEOUT ─────────────────────────────────────────────────
  {
    material_name: 'styrofoam container',
    aliases: ['polystyrene container', 'foam clamshell', 'eps takeout container',
              'foam food box', 'styrofoam box', 'styrofoam clamshell'],
    material_type: 'foam',
    item_type: 'container',
    kg_co2e_per_unit: 0.029,
    recyclable: false,
    compostable: false,
    decomposition_label: '500+ years',
    recyclability_note: 'Not accepted in curbside recycling. Banned in over 100 US cities.',
    disposal_guidance: 'Landfill. Avoid purchasing from restaurants that use this packaging.',
    better_alternative: 'Cardboard clamshell or aluminum container',
    confidence: 'high',
    source_citation: 'Franklin Associates (2018) LCA of EPS foodservice packaging',
  },
  {
    material_name: 'cardboard container',
    aliases: ['cardboard clamshell', 'paper container', 'kraft box', 'cardboard takeout box',
              'pizza box', 'kraft clamshell'],
    material_type: 'paper',
    item_type: 'container',
    kg_co2e_per_unit: 0.024,
    recyclable: true,
    compostable: true,
    decomposition_label: '2–5 months',
    recyclability_note: 'Recyclable if not soaked with grease. Pizza boxes with heavy grease go to compost.',
    disposal_guidance: 'Recycle if clean and dry. Compost if greasy. Cut down first.',
    better_alternative: 'Bring your own reusable container for leftovers',
    confidence: 'medium',
    source_citation: 'Franklin Associates (2018)',
  },
  {
    material_name: 'aluminum container',
    aliases: ['aluminum tray', 'foil tray', 'tin foil container', 'aluminum takeout tray'],
    material_type: 'metal',
    item_type: 'container',
    kg_co2e_per_unit: 0.073,      // higher upfront, but highly recyclable
    recyclable: true,
    compostable: false,
    decomposition_label: '80–400 years (if not recycled)',
    recyclability_note: 'Highly recyclable — aluminum can be recycled indefinitely without quality loss. Rinse first.',
    disposal_guidance: 'Rinse off food residue and place in recycling bin.',
    better_alternative: 'Already one of the better options for single-use. Recycling is key.',
    confidence: 'medium',
    source_citation: 'Aluminium Stewardship Initiative LCA (2021)',
  },

  // ─── CUTLERY ──────────────────────────────────────────────────────────────
  {
    material_name: 'plastic fork',
    aliases: ['disposable fork', 'plastic cutlery', 'plastic utensil', 'plastic spoon',
              'plastic knife', 'single-use cutlery'],
    material_type: 'plastic',
    item_type: 'cutlery',
    kg_co2e_per_unit: 0.0019,
    recyclable: false,
    compostable: false,
    decomposition_label: '200–400 years',
    recyclability_note: 'Too small for most recycling facilities. Cannot be recycled.',
    disposal_guidance: 'Landfill. Opt out of plastic cutlery when ordering delivery.',
    better_alternative: 'Request no cutlery, or carry personal bamboo or metal cutlery',
    confidence: 'medium',
    source_citation: 'Plastics Europe eco-profiles; WRAP (2020)',
  },
  {
    material_name: 'wooden fork',
    aliases: ['wooden cutlery', 'bamboo fork', 'bamboo cutlery', 'wooden spoon', 'birch fork'],
    material_type: 'paper',      // paper/wood category
    item_type: 'cutlery',
    kg_co2e_per_unit: 0.0012,
    recyclable: false,
    compostable: true,
    decomposition_label: '3–5 months (industrial compost)',
    recyclability_note: 'Not recyclable. Compostable in industrial facilities.',
    disposal_guidance: 'Compost in industrial compost. Otherwise landfill.',
    better_alternative: 'Reusable metal cutlery or personal bamboo set',
    confidence: 'medium',
    source_citation: 'Intertek LCA (2019)',
  },

  // ─── BAGS ─────────────────────────────────────────────────────────────────
  {
    material_name: 'plastic bag',
    aliases: ['single-use plastic bag', 'grocery bag', 'takeout bag', 'plastic shopping bag',
              'polybag', 'polyethylene bag'],
    material_type: 'plastic',
    item_type: 'bag',
    kg_co2e_per_unit: 0.0033,
    recyclable: true,
    compostable: false,
    decomposition_label: '10–1000 years',
    recyclability_note: 'Cannot go in curbside recycling — clogs sorting machinery. Drop off at grocery store soft plastic bins.',
    disposal_guidance: 'Return to store soft-plastic drop-off. Reuse as trash liner before discarding.',
    better_alternative: 'Reusable tote bag',
    confidence: 'medium',
    source_citation: 'UK Environment Agency (2011) Life cycle assessment of supermarket carrier bags',
  },
  {
    material_name: 'paper bag',
    aliases: ['kraft paper bag', 'brown paper bag', 'paper shopping bag', 'paper takeout bag'],
    material_type: 'paper',
    item_type: 'bag',
    kg_co2e_per_unit: 0.0079,     // higher upfront than plastic, but recyclable
    recyclable: true,
    compostable: true,
    decomposition_label: '1–6 months',
    recyclability_note: 'Recyclable in most curbside programs. Remove handles if non-paper.',
    disposal_guidance: 'Recycle or compost. Reuse for lunch bags or wrapping before disposal.',
    better_alternative: 'Reusable canvas or recycled tote bag',
    confidence: 'medium',
    source_citation: 'UK Environment Agency (2011)',
  },
];

// ─── Seed runner ─────────────────────────────────────────────────────────────

export async function seedMaterialImpacts(db: {
  query: (text: string, values?: unknown[]) => Promise<unknown>;
}): Promise<void> {
  console.log(`Seeding ${MATERIAL_IMPACTS.length} material impact records...`);

  for (const row of MATERIAL_IMPACTS) {
    await db.query(
      `INSERT INTO material_impacts
         (material_name, aliases, material_type, item_type, kg_co2e_per_unit,
          recyclable, compostable, decomposition_years, decomposition_label,
          recyclability_note, disposal_guidance, better_alternative,
          confidence, source_citation)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       ON CONFLICT (material_name) DO NOTHING`,
      [
        row.material_name,
        row.aliases,
        row.material_type,
        row.item_type,
        row.kg_co2e_per_unit,
        row.recyclable,
        row.compostable,
        row.decomposition_years ?? null,
        row.decomposition_label,
        row.recyclability_note,
        row.disposal_guidance,
        row.better_alternative,
        row.confidence,
        row.source_citation ?? null,
      ]
    );
  }

  console.log('Material impacts seeded ✓');
}
