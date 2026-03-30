// src/components/restaurant/FoodImpactCard.tsx
// Green Life — Food carbon impact card
// Uses the dark forest palette from @/theme/colors.

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "@/theme/colors";
import type { FoodImpactResult, CarbonEquivalent } from "@/types/restaurant";

interface FoodImpactCardProps {
  food: FoodImpactResult;
  equivalents?: CarbonEquivalent[];
  showDetails?: boolean;
}

export function FoodImpactCard({ food, equivalents = [], showDetails = true }: FoodImpactCardProps) {
  const tier = food.impact_tier;

  const tierColor =
    tier === "high"   ? colors.danger  :
    tier === "medium" ? colors.warning :
    colors.primary;

  const tierLabel =
    tier === "high"   ? "🔴 High Impact"   :
    tier === "medium" ? "🟡 Medium Impact" :
    "🟢 Low Impact";

  const confidenceLabel =
    food.confidence === "high"   ? "✅ Verified data" :
    food.confidence === "medium" ? "⚡ Estimated"     :
    "~ Approximate";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { borderLeftColor: tierColor }]}>
        <Text style={styles.foodName}>
          {food.matched_name.charAt(0).toUpperCase() + food.matched_name.slice(1)}
        </Text>
        <View style={[styles.tierBadge, { backgroundColor: tierColor + "22" }]}>
          <Text style={[styles.tierBadgeText, { color: tierColor }]}>{tierLabel}</Text>
        </View>
      </View>

      {/* Primary metric */}
      <View style={styles.primaryMetric}>
        <Text style={[styles.metricValue, { color: tierColor }]}>
          {food.kg_co2e_per_serving.toFixed(2)}
        </Text>
        <Text style={styles.metricUnit}>kg CO₂e per serving</Text>
        <Text style={styles.metricContext}>{food.serving_size_g}g serving</Text>
      </View>

      {/* Confidence */}
      <Text style={styles.confidence}>{confidenceLabel}</Text>
      {food.match_method === "category_fallback" && (
        <Text style={styles.warningNote}>ℹ️ Category average — no exact match found</Text>
      )}

      {/* Carbon equivalents */}
      {showDetails && equivalents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>That's equivalent to…</Text>
          <View style={styles.equivalentsGrid}>
            {equivalents.map((eq, i) => (
              <View key={i} style={styles.equivalentChip}>
                <Text style={styles.equivalentIcon}>{eq.icon}</Text>
                <Text style={styles.equivalentValue}>{eq.value}</Text>
                <Text style={styles.equivalentLabel}>{eq.unit}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Detail rows */}
      {showDetails && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More data</Text>
          <DetailRow label="Per kg" value={`${food.kg_co2e_per_kg} kg CO₂e`} />
          {food.land_use_m2_per_kg != null && (
            <DetailRow label="Land use" value={`${food.land_use_m2_per_kg} m² per kg`} />
          )}
          {food.water_use_l_per_kg != null && (
            <DetailRow label="Water use" value={`${food.water_use_l_per_kg.toLocaleString()} L per kg`} />
          )}
          {food.usda?.calories_per_100g != null && (
            <DetailRow label="Calories" value={`${food.usda.calories_per_100g} kcal per 100g`} />
          )}
          <DetailRow label="Category" value={food.food_category.replace("_", " ")} />
        </View>
      )}

      {food.source_citation && (
        <Text style={styles.source}>Source: {food.source_citation}</Text>
      )}
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: colors.bg },
  header:          { margin: 16, padding: 16, backgroundColor: colors.surface, borderRadius: 12, borderLeftWidth: 4 },
  foodName:        { fontSize: 20, fontWeight: "700", color: colors.text, marginBottom: 8 },
  tierBadge:       { alignSelf: "flex-start", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  tierBadgeText:   { fontSize: 13, fontWeight: "600" },
  primaryMetric:   { alignItems: "center", paddingVertical: 24 },
  metricValue:     { fontSize: 56, fontWeight: "800" },
  metricUnit:      { fontSize: 16, color: colors.textMuted, marginTop: -4 },
  metricContext:   { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  confidence:      { textAlign: "center", color: colors.textMuted, fontSize: 13, paddingBottom: 4 },
  warningNote:     { textAlign: "center", color: colors.warning, fontSize: 12, paddingHorizontal: 20, paddingBottom: 16 },
  section:         { marginHorizontal: 16, marginBottom: 20 },
  sectionTitle:    { fontSize: 14, fontWeight: "700", color: colors.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.8 },
  equivalentsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  equivalentChip:  { backgroundColor: colors.surface, borderRadius: 12, padding: 12, alignItems: "center", minWidth: 80 },
  equivalentIcon:  { fontSize: 22 },
  equivalentValue: { fontSize: 16, fontWeight: "700", color: colors.primary },
  equivalentLabel: { fontSize: 11, color: colors.textMuted, textAlign: "center" },
  detailRow:       { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  detailLabel:     { fontSize: 14, color: colors.textMuted },
  detailValue:     { fontSize: 14, fontWeight: "600", color: colors.text },
  source:          { fontSize: 11, color: colors.textMuted, marginHorizontal: 16, marginBottom: 24, fontStyle: "italic" },
});
