// FILE: src/services/restaurant/visionService.ts
// Green Life — Google Cloud Vision API wrapper
//
// Setup: Enable Cloud Vision API in Google Cloud Console.
// Set GOOGLE_VISION_API_KEY in your .env (or use service account credentials).
// Docs: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate
//
// Pricing note: LABEL_DETECTION = $1.50 per 1,000 images (as of 2024).
// Consider caching Vision results by image hash for identical photos.

const VISION_BASE = 'https://vision.googleapis.com/v1/images:annotate';
const VISION_API_KEY = process.env.GOOGLE_VISION_API_KEY;

export interface FoodVisionLabel {
  label: string;         // e.g. "Salmon", "Grilled fish"
  score: number;         // 0–1 confidence
  topicality: number;    // 0–1 relevance to image
}

export interface MaterialVisionLabel {
  label: string;         // e.g. "Plastic straw", "Styrofoam container"
  itemType?: string;     // extracted item type hint: 'straw', 'cup', 'container'
  score: number;
}

// ─── Food-related Vision labels to filter for ─────────────────────────────────
// We only pass labels that are likely to be food items to the emission lookup.
// This list is a starting heuristic — tune with real usage data.
const FOOD_LABEL_KEYWORDS = [
  'food', 'dish', 'cuisine', 'meal', 'meat', 'fish', 'seafood', 'chicken',
  'beef', 'pork', 'lamb', 'salad', 'pasta', 'rice', 'soup', 'sandwich',
  'burger', 'pizza', 'sushi', 'steak', 'salmon', 'tuna', 'shrimp',
  'vegetable', 'dessert', 'bread', 'noodle', 'curry', 'bowl',
];

// ─── Material-related keywords ─────────────────────────────────────────────────
const MATERIAL_KEYWORDS = [
  'straw', 'cup', 'container', 'bag', 'fork', 'spoon', 'knife', 'cutlery',
  'plastic', 'styrofoam', 'polystyrene', 'paper', 'cardboard', 'aluminum',
  'foil', 'packaging', 'takeout', 'disposable',
];

export class VisionService {
  /**
   * Identify food items in an image.
   * Returns labels sorted by confidence, filtered to food-relevant terms.
   */
  async identifyFood(base64Image: string): Promise<string[]> {
    if (!VISION_API_KEY) {
      throw new Error('GOOGLE_VISION_API_KEY is not set');
    }

    const labels = await this.callVision(base64Image, ['LABEL_DETECTION', 'WEB_DETECTION']);

    // Filter and rank food-relevant labels
    const foodLabels = labels
      .filter(l => this.isFoodLabel(l.description))
      .sort((a, b) => b.score - a.score)
      .map(l => l.description);

    return foodLabels;
  }

  /**
   * Identify disposable restaurant materials in an image.
   * Returns labels with optional itemType hints.
   */
  async identifyMaterial(base64Image: string): Promise<MaterialVisionLabel[]> {
    if (!VISION_API_KEY) {
      throw new Error('GOOGLE_VISION_API_KEY is not set');
    }

    const labels = await this.callVision(base64Image, [
      'LABEL_DETECTION',
      'OBJECT_LOCALIZATION',
    ]);

    const materialLabels = labels
      .filter(l => this.isMaterialLabel(l.description))
      .sort((a, b) => b.score - a.score)
      .map(l => ({
        label: l.description,
        itemType: this.extractItemType(l.description),
        score: l.score,
      }));

    return materialLabels;
  }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private async callVision(
    base64Image: string,
    features: string[]
  ): Promise<VisionLabelAnnotation[]> {
    const body = {
      requests: [
        {
          image: { content: base64Image },
          features: features.map(type => ({ type, maxResults: 10 })),
        },
      ],
    };

    const response = await fetch(`${VISION_BASE}?key=${VISION_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Vision API error ${response.status}: ${errText}`);
    }

    const json = await response.json() as VisionAnnotateResponse;
    const result = json.responses?.[0];

    return [
      ...(result?.labelAnnotations ?? []),
      ...(result?.localizedObjectAnnotations?.map(o => ({
        description: o.name,
        score: o.score,
      })) ?? []),
    ];
  }

  private isFoodLabel(label: string): boolean {
    const lower = label.toLowerCase();
    return FOOD_LABEL_KEYWORDS.some(kw => lower.includes(kw));
  }

  private isMaterialLabel(label: string): boolean {
    const lower = label.toLowerCase();
    return MATERIAL_KEYWORDS.some(kw => lower.includes(kw));
  }

  private extractItemType(label: string): string | undefined {
    const lower = label.toLowerCase();
    const itemTypes = ['straw', 'cup', 'container', 'bag', 'fork', 'spoon', 'knife'];
    return itemTypes.find(t => lower.includes(t));
  }
}

// ─── Google Vision API response types ────────────────────────────────────────
interface VisionAnnotateResponse {
  responses?: {
    labelAnnotations?: VisionLabelAnnotation[];
    localizedObjectAnnotations?: { name: string; score: number }[];
  }[];
}

interface VisionLabelAnnotation {
  description: string;
  score: number;
}
