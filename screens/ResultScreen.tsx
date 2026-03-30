import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Platform, Image, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// ── Route param types ────────────────────────────────────────────────────────

type ResultParams =
  | { type: 'photo'; mode: 'food' | 'material'; image: string; uri?: string }
  | { type: 'barcode'; query: string; mode: 'barcode' }
  | { type: 'search'; query: string; mode: 'food' | 'material' | 'barcode' };

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<{ Result: ResultParams }, 'Result'>;
};

// ── API ──────────────────────────────────────────────────────────────────────

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://10.0.2.2:4000/api/v1';

type ApiItem = {
  id: string;
  name: string;
  brand: string;
  match_type: string;
  confidence_score: number;
  category: { id: string; name: string };
  description?: string;
  metrics?: Array<{
    metric_type: string;
    label: string;
    value: number;
    unit: string;
    confidence_score: number;
    methodology?: string;
  }>;
  materials?: Array<{ name: string; percentage: number }>;
  disposal_guidance?: Array<{ type: string; label: string }>;
  sources?: Array<{ id: string; name: string }>;
};

// ── Placeholder data (photo mode only) ──────────────────────────────────────

const FOOD_PLACEHOLDER = {
  type: 'food' as const,
  food: {
    matched_name: 'Grilled Salmon',
    query: 'grilled salmon',
    match_method: 'exact' as const,
    kg_co2e_per_kg: 6.0,
    kg_co2e_per_serving: 1.2,
    serving_size_g: 200,
    food_category: 'seafood',
    confidence: 'high' as const,
    estimate_type: 'exact' as const,
    impact_tier: 'medium' as const,
    source_citation: 'Agribalyse v3.1 + IPCC AR6 Annex III',
  },
  equivalents: [
    { label: 'Miles driven', value: '3.0', unit: 'miles', icon: '🚗' },
    { label: 'Phone charges', value: '146', unit: 'charges', icon: '📱' },
    { label: 'Days for a tree to absorb', value: '20', unit: 'days', icon: '🌳' },
    { label: 'Hours of streaming', value: '33', unit: 'hours', icon: '📺' },
  ],
  meta: {
    sparks: { awarded: 1, newTotal: 4, isFirstScan: false, reason: 'Photographed food — salmon' },
    scan_mode: 'food' as const,
    scanned_at: new Date().toISOString(),
  },
};

const MATERIAL_PLACEHOLDER = {
  type: 'material' as const,
  material: {
    matched_name: 'Styrofoam Container',
    query: 'styrofoam container',
    match_method: 'exact' as const,
    material_type: 'foam',
    item_type: 'container',
    kg_co2e_per_unit: 0.029,
    recyclable: false,
    compostable: false,
    decomposition_label: '500+ years',
    recyclability_note: 'Not accepted in curbside recycling. Banned in over 100 US cities.',
    disposal_guidance: 'Landfill only. Keep away from stormwater drains — foam breaks into microplastics that enter the food chain.',
    better_alternative: 'Cardboard clamshell or aluminum container',
    confidence: 'high' as const,
    sustainability_rating: 'critical' as const,
    source_citation: 'Franklin Associates (2018) LCA of EPS foodservice packaging',
  },
  meta: {
    sparks: { awarded: 1, newTotal: 5, isFirstScan: false, reason: 'Scanned restaurant material — styrofoam container' },
    scan_mode: 'material' as const,
    scanned_at: new Date().toISOString(),
  },
};

// ── Badge configs ────────────────────────────────────────────────────────────

const CONFIDENCE_BADGE = {
  high:     { label: 'Exact Match',  bg: '#1A3D1F', text: '#4A9B5F', border: '#2A5030' },
  medium:   { label: 'Probable',     bg: '#1A2A3D', text: '#5B8FCC', border: '#223650' },
  low:      { label: 'Estimate',     bg: '#2E2410', text: '#C8A96E', border: '#3D3015' },
  probable: { label: 'Probable',     bg: '#1A2A3D', text: '#5B8FCC', border: '#223650' },
};

const SUSTAINABILITY_BADGE = {
  critical: { label: 'Critical Impact', bg: '#3D1A1A', text: '#E05C5C', border: '#5C2020' },
  moderate: { label: 'Moderate',        bg: '#2E2410', text: '#C8A96E', border: '#3D3015' },
  good:     { label: 'Good Choice',     bg: '#1A3D1F', text: '#4A9B5F', border: '#2A5030' },
};

const IMPACT_TIER_COLOR = {
  high:   '#E05C5C',
  medium: '#C8A96E',
  low:    '#4A9B5F',
};

function matchTypeToBadgeKey(matchType: string): keyof typeof CONFIDENCE_BADGE {
  if (matchType === 'exact_product') return 'high';
  if (matchType === 'probable_product') return 'probable';
  return 'low';
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ResultScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const params = route.params;

  const [apiItem, setApiItem] = useState<ApiItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const isFoodMode = params.mode === 'food';
  const isMaterialMode = params.mode === 'material';
  const isProductMode = params.mode === 'barcode' || params.mode === 'product';

  // Photo mode uses placeholders; barcode/search fetch from API
  const foodResult = isFoodMode && params.type === 'photo' ? FOOD_PLACEHOLDER : null;
  const materialResult = isMaterialMode && params.type === 'photo' ? MATERIAL_PLACEHOLDER : null;
  const showProductSection = apiItem !== null || (isProductMode && !loading && !fetchError);

  useEffect(() => {
    if (params.type === 'barcode') {
      fetchBarcode();
    } else if (params.type === 'search') {
      fetchSearch((params as any).query);
    }
  }, []);

  const fetchDetail = async (id: string): Promise<ApiItem | null> => {
    const res = await fetch(`${API_BASE}/items/${id}`);
    const json = await res.json();
    return json.data?.item ?? null;
  };

  const fetchBarcode = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/lookup/barcode`);
      const json = await res.json();
      const product = json.data?.result;
      if (!product) { setFetchError(true); return; }
      const detail = await fetchDetail(product.id);
      setApiItem(detail ?? product);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
      const json = await res.json();
      const results: ApiItem[] = json.data?.results ?? [];
      if (!results.length) { setFetchError(true); return; }
      const detail = await fetchDetail(results[0].id);
      setApiItem(detail ?? results[0]);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  const topPadding = (insets.top || (Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0)) + 12;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A140B" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#4A9B5F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isFoodMode ? 'Food Impact' : isMaterialMode ? 'Material Impact' : 'Product Result'}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.centerWrap}>
          <ActivityIndicator color="#4A9B5F" size="large" />
          <Text style={styles.loadingText}>Looking up result…</Text>
        </View>
      )}

      {/* Error */}
      {!loading && fetchError && (
        <View style={styles.centerWrap}>
          <Ionicons name="alert-circle-outline" size={44} color="#4A6E4D" />
          <Text style={styles.errorText}>No result found for your scan.</Text>
          <TouchableOpacity style={styles.goBackBtn} onPress={() => navigation.goBack()} activeOpacity={0.8}>
            <Text style={styles.goBackBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main content */}
      {!loading && !fetchError && (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 110 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Captured photo thumbnail (photo mode only) */}
          {'uri' in params && params.uri ? (
            <View style={styles.photoThumbWrap}>
              <Image source={{ uri: params.uri }} style={styles.photoThumb} resizeMode="cover" />
              <View style={styles.photoThumbOverlay} />
              <Text style={styles.photoThumbLabel}>
                {isFoodMode ? '🍽  Food detected' : '♻️  Material detected'}
              </Text>
            </View>
          ) : (
            <View style={styles.queryRow}>
              <Ionicons
                name={params.type === 'barcode' ? 'barcode-outline' : 'search-outline'}
                size={13}
                color="#4A6E4D"
              />
              <Text style={styles.queryText} numberOfLines={1}>
                {'query' in params ? params.query : ''}
              </Text>
            </View>
          )}

          {/* ── FOOD RESULT ─────────────────────────────────────────────────── */}
          {foodResult && (
            <>
              <View style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.foodIcon}>
                    <Text style={{ fontSize: 28 }}>🐟</Text>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{foodResult.food.matched_name}</Text>
                    <Text style={styles.productMeta}>
                      {foodResult.food.food_category} · {foodResult.food.serving_size_g}g serving
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.badge,
                  {
                    backgroundColor: CONFIDENCE_BADGE[foodResult.food.confidence].bg,
                    borderColor: CONFIDENCE_BADGE[foodResult.food.confidence].border,
                  },
                ]}>
                  <Text style={[styles.badgeText, { color: CONFIDENCE_BADGE[foodResult.food.confidence].text }]}>
                    {CONFIDENCE_BADGE[foodResult.food.confidence].label}
                  </Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardLabel}>Carbon Footprint</Text>
                <View style={styles.carbonRow}>
                  <Text style={[
                    styles.carbonValue,
                    { color: IMPACT_TIER_COLOR[foodResult.food.impact_tier] },
                  ]}>
                    {foodResult.food.kg_co2e_per_serving}
                  </Text>
                  <Text style={styles.carbonUnit}>kg CO₂e</Text>
                  <View style={[
                    styles.tierBadge,
                    { backgroundColor: IMPACT_TIER_COLOR[foodResult.food.impact_tier] + '22' },
                  ]}>
                    <Text style={[
                      styles.tierBadgeText,
                      { color: IMPACT_TIER_COLOR[foodResult.food.impact_tier] },
                    ]}>
                      {foodResult.food.impact_tier.charAt(0).toUpperCase() + foodResult.food.impact_tier.slice(1)} impact
                    </Text>
                  </View>
                </View>
                <Text style={styles.carbonSub}>Per {foodResult.food.serving_size_g}g serving, estimated</Text>

                <View style={styles.equivStrip}>
                  {foodResult.equivalents.map((eq, i) => (
                    <View key={i} style={styles.equivItem}>
                      <Text style={styles.equivIcon}>{eq.icon}</Text>
                      <Text style={styles.equivValue}>{eq.value}</Text>
                      <Text style={styles.equivLabel}>{eq.unit}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.trustNote}>
                <Ionicons name="information-circle-outline" size={13} color="#4A6E4D" />
                <Text style={styles.trustText}>{foodResult.food.source_citation}</Text>
              </View>
            </>
          )}

          {/* ── MATERIAL RESULT ──────────────────────────────────────────────── */}
          {materialResult && (
            <>
              <View style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.materialIcon}>
                    <Text style={{ fontSize: 26 }}>🥡</Text>
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{materialResult.material.matched_name}</Text>
                    <Text style={styles.productMeta}>
                      {materialResult.material.material_type} · {materialResult.material.item_type}
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.badge,
                  {
                    backgroundColor: SUSTAINABILITY_BADGE[materialResult.material.sustainability_rating].bg,
                    borderColor: SUSTAINABILITY_BADGE[materialResult.material.sustainability_rating].border,
                  },
                ]}>
                  <Text style={[
                    styles.badgeText,
                    { color: SUSTAINABILITY_BADGE[materialResult.material.sustainability_rating].text },
                  ]}>
                    {SUSTAINABILITY_BADGE[materialResult.material.sustainability_rating].label}
                  </Text>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardLabel}>Impact per Unit</Text>
                <View style={styles.carbonRow}>
                  <Text style={[styles.carbonValue, { color: '#E05C5C', fontSize: 30 }]}>
                    {(materialResult.material.kg_co2e_per_unit * 1000).toFixed(1)}
                  </Text>
                  <Text style={styles.carbonUnit}>g CO₂e</Text>
                </View>
                <Text style={styles.carbonSub}>Per single item used</Text>

                <View style={styles.flagsRow}>
                  <View style={[
                    styles.flag,
                    { backgroundColor: materialResult.material.recyclable ? '#1A3D1F' : '#2E1A1A',
                      borderColor: materialResult.material.recyclable ? '#2A5030' : '#5C2020' },
                  ]}>
                    <Ionicons
                      name={materialResult.material.recyclable ? 'checkmark-circle' : 'close-circle'}
                      size={14}
                      color={materialResult.material.recyclable ? '#4A9B5F' : '#E05C5C'}
                    />
                    <Text style={[
                      styles.flagText,
                      { color: materialResult.material.recyclable ? '#4A9B5F' : '#E05C5C' },
                    ]}>
                      {materialResult.material.recyclable ? 'Recyclable' : 'Not recyclable'}
                    </Text>
                  </View>
                  <View style={[
                    styles.flag,
                    { backgroundColor: materialResult.material.compostable ? '#1A3D1F' : '#2E1A1A',
                      borderColor: materialResult.material.compostable ? '#2A5030' : '#5C2020' },
                  ]}>
                    <Ionicons
                      name={materialResult.material.compostable ? 'checkmark-circle' : 'close-circle'}
                      size={14}
                      color={materialResult.material.compostable ? '#4A9B5F' : '#E05C5C'}
                    />
                    <Text style={[
                      styles.flagText,
                      { color: materialResult.material.compostable ? '#4A9B5F' : '#E05C5C' },
                    ]}>
                      {materialResult.material.compostable ? 'Compostable' : 'Not compostable'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.decompLabel}>
                  Decomposes in: <Text style={{ color: '#E05C5C' }}>{materialResult.material.decomposition_label}</Text>
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardLabel}>Recyclability</Text>
                <Text style={styles.bodyText}>{materialResult.material.recyclability_note}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardLabel}>How to Dispose</Text>
                <Text style={styles.bodyText}>{materialResult.material.disposal_guidance}</Text>
              </View>

              <View style={[styles.card, styles.alternativeCard]}>
                <View style={styles.altRow}>
                  <Ionicons name="leaf-outline" size={16} color="#4A9B5F" />
                  <Text style={styles.altLabel}>Better Alternative</Text>
                </View>
                <Text style={styles.altText}>{materialResult.material.better_alternative}</Text>
              </View>

              <View style={styles.trustNote}>
                <Ionicons name="information-circle-outline" size={13} color="#4A6E4D" />
                <Text style={styles.trustText}>{materialResult.material.source_citation}</Text>
              </View>
            </>
          )}

          {/* ── PRODUCT / BARCODE / SEARCH RESULT ───────────────────────────── */}
          {showProductSection && (() => {
            const badgeKey = apiItem ? matchTypeToBadgeKey(apiItem.match_type) : 'probable';
            const carbonMetric = apiItem?.metrics?.[0];
            const name = apiItem?.name ?? 'Unknown Product';
            const brand = apiItem?.brand ?? '';
            const carbonValue = carbonMetric ? String(carbonMetric.value) : '—';
            const carbonUnit = carbonMetric?.unit ?? 'kg CO₂e';
            const carbonLabel = carbonMetric?.methodology ?? 'Category estimate';
            const materials = (apiItem?.materials ?? []).map(m => ({ name: m.name, pct: m.percentage }));
            const disposal = apiItem?.disposal_guidance?.[0]?.label ?? '';
            const source = apiItem?.sources?.[0]?.name ?? '';

            return (
              <>
                <View style={styles.card}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.foodIcon}>
                      <Text style={{ fontSize: 26 }}>🏷️</Text>
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{name}</Text>
                      {brand ? <Text style={styles.productMeta}>{brand}</Text> : null}
                      {apiItem?.category?.name ? (
                        <Text style={styles.productMeta}>{apiItem.category.name}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={[
                    styles.badge,
                    { backgroundColor: CONFIDENCE_BADGE[badgeKey].bg, borderColor: CONFIDENCE_BADGE[badgeKey].border },
                  ]}>
                    <Text style={[styles.badgeText, { color: CONFIDENCE_BADGE[badgeKey].text }]}>
                      {CONFIDENCE_BADGE[badgeKey].label}
                    </Text>
                  </View>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardLabel}>Carbon Footprint</Text>
                  <View style={styles.carbonRow}>
                    <Text style={[styles.carbonValue, { color: '#4A9B5F' }]}>{carbonValue}</Text>
                    <Text style={styles.carbonUnit}>{carbonUnit}</Text>
                  </View>
                  <Text style={styles.carbonSub}>{carbonLabel}</Text>
                </View>

                {materials.length > 0 && (
                  <View style={styles.card}>
                    <Text style={styles.cardLabel}>Material Composition</Text>
                    {materials.map((mat, i) => (
                      <View key={i} style={[
                        styles.materialRow,
                        i < materials.length - 1 && styles.materialDivider,
                      ]}>
                        <View style={styles.materialLeft}>
                          <Ionicons name="ellipse-outline" size={16} color="#4A6E4D" />
                          <Text style={styles.materialName}>{mat.name}</Text>
                        </View>
                        <Text style={styles.materialPct}>{mat.pct}%</Text>
                      </View>
                    ))}
                  </View>
                )}

                {disposal ? (
                  <View style={styles.card}>
                    <Text style={styles.cardLabel}>How to Dispose</Text>
                    <Text style={styles.bodyText}>{disposal}</Text>
                  </View>
                ) : null}

                {source ? (
                  <View style={styles.trustNote}>
                    <Ionicons name="information-circle-outline" size={13} color="#4A6E4D" />
                    <Text style={styles.trustText}>{source}</Text>
                  </View>
                ) : null}
              </>
            );
          })()}

          {/* Sparks note */}
          {(foodResult || materialResult) && (
            <View style={styles.sparksNote}>
              <Text style={styles.sparkFlame}>🔥</Text>
              <Text style={styles.sparksText}>
                +{(foodResult || materialResult)!.meta.sparks.awarded} Spark earned · {(foodResult || materialResult)!.meta.sparks.newTotal} total
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Scan Again CTA */}
      <View style={[styles.ctaBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={styles.scanAgainBtn}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Scan' })}
          activeOpacity={0.85}
        >
          <Ionicons name="scan-outline" size={17} color="#F5F3EF" style={{ marginRight: 8 }} />
          <Text style={styles.scanAgainText}>Scan Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#0A140B',
    borderBottomWidth: 1,
    borderBottomColor: '#1A2E1C',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: '#F5F3EF',
    letterSpacing: 0.3,
  },

  // Loading / Error
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 40,
  },
  loadingText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 14,
    color: '#4A6E4D',
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A6E4D',
    textAlign: 'center',
  },
  goBackBtn: {
    backgroundColor: '#2F6B3B',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  goBackBtnText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#F5F3EF',
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: 20,
    gap: 12,
  },

  // Photo thumbnail
  photoThumbWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 140,
    marginBottom: 4,
  },
  photoThumb: {
    width: '100%',
    height: '100%',
  },
  photoThumbOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  photoThumbLabel: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 13,
    color: '#F5F3EF',
  },

  // Query row
  queryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  queryText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#4A6E4D',
    flex: 1,
  },

  // Card
  card: {
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#1A2E1C',
    borderRadius: 14,
    padding: 16,
  },
  cardLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#4A6E4D',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  foodIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#1A3D1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2E1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: { flex: 1 },
  productName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#F5F3EF',
    marginBottom: 4,
  },
  productMeta: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#4A6E4D',
    textTransform: 'capitalize',
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    letterSpacing: 0.4,
  },

  // Carbon
  carbonRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  carbonValue: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 40,
    color: '#F5F3EF',
    letterSpacing: -1,
  },
  carbonUnit: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A9B5F',
  },
  tierBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 4,
  },
  tierBadgeText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  carbonSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A6E4D',
    marginBottom: 16,
  },

  // Equivalents
  equivStrip: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  equivItem: {
    backgroundColor: '#0E1A0F',
    borderWidth: 1,
    borderColor: '#1A2E1C',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 70,
    flex: 1,
  },
  equivIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  equivValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 13,
    color: '#F5F3EF',
    marginBottom: 2,
  },
  equivLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 9,
    color: '#4A6E4D',
    textAlign: 'center',
  },

  // Material flags
  flagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    marginBottom: 12,
  },
  flag: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  flagText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 11,
  },
  decompLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#4A6E4D',
  },

  // Alternative
  alternativeCard: {
    borderColor: '#2A5030',
    backgroundColor: '#0E1F10',
  },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  altLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#4A9B5F',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  altText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: '#F5F3EF',
    lineHeight: 20,
  },

  // Body text
  bodyText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#F5F3EF',
    lineHeight: 21,
  },

  // Materials (product mode)
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  materialDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#1A2E1C',
  },
  materialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  materialName: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: '#F5F3EF',
  },
  materialPct: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#4A6E4D',
  },

  // Trust note
  trustNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingHorizontal: 4,
  },
  trustText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A6E4D',
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // Sparks
  sparksNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  sparkFlame: { fontSize: 14 },
  sparksText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#C8A96E',
  },

  // CTA
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: 'rgba(14,26,15,0.96)',
    borderTopWidth: 1,
    borderTopColor: '#1A2E1C',
  },
  scanAgainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F6B3B',
    borderRadius: 10,
    paddingVertical: 15,
  },
  scanAgainText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: '#F5F3EF',
    letterSpacing: 0.3,
  },
});
