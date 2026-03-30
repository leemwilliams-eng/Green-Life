// src/components/restaurant/MaterialImpactCard.tsx
// Green Life — Restaurant material sustainability card

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "@/theme/colors";
import type { MaterialImpactResult } from "@/types/restaurant";

interface MaterialImpactCardProps {
  material: MaterialImpactResult;
  showDetails?: boolean;
}

export function MaterialImpactCard({ material, showDetails = true }: MaterialImpactCardProps) {
  const rating = material.sustainability_rating;

  const ratingColor =
    rating === "critical" ? colors.danger  :
    rating === "moderate" ? colors.warning :
    colors.primary;

  const ratingLabel =
    rating === "critical" ? "🔴 High Impact"     :
    rating === "moderate" ? "🟡 Moderate Impact" :
    "🟢 Low Impact";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { borderLeftColor: ratingColor }]}>
        <Text style={styles.name}>
          {material.matched_name.charAt(0).toUpperCase() + material.matched_name.slice(1)}
        </Text>
        <Text style={styles.itemType}>
          {material.item_type} · {material.material_type}
        </Text>
        <View style={[styles.badge, { backgroundColor: ratingColor + "22" }]}>
          <Text style={[styles.badgeText, { color: ratingColor }]}>{ratingLabel}</Text>
        </View>
      </View>

      {/* Decomposition time */}
      <View style={styles.decompRow}>
        <Text style={styles.decompLabel}>Takes to break down</Text>
        <Text style={[styles.decompValue, { color: ratingColor }]}>
          {material.decomposition_label}
        </Text>
      </View>

      {/* CO₂ per item */}
      <View style={styles.carbonRow}>
        <Text style={styles.carbonValue}>
          {(material.kg_co2e_per_unit * 1000).toFixed(1)}g
        </Text>
        <Text style={styles.carbonUnit}>CO₂e per item</Text>
      </View>

      {/* Recyclable / Compostable chips */}
      <View style={styles.chipRow}>
        <Chip label="Recyclable"  active={material.recyclable}  activeColor={colors.primary} />
        <Chip label="Compostable" active={material.compostable} activeColor={colors.primary} />
      </View>

      {/* Detail blocks */}
      {showDetails && (
        <>
          <InfoBlock title="Recycling"        text={material.recyclability_note} />
          <InfoBlock title="How to dispose"   text={material.disposal_guidance}  />
          <InfoBlock title="Better alternative" text={material.better_alternative} accent={colors.primary} />
        </>
      )}

      {material.source_citation && (
        <Text style={styles.source}>Source: {material.source_citation}</Text>
      )}
    </ScrollView>
  );
}

function Chip({ label, active, activeColor }: { label: string; active: boolean; activeColor: string }) {
  return (
    <View style={[styles.chip, active ? { backgroundColor: activeColor + "33" } : { backgroundColor: colors.surface }]}>
      <Text style={[styles.chipText, { color: active ? activeColor : colors.textMuted }]}>
        {active ? "✓ " : "✗ "}{label}
      </Text>
    </View>
  );
}

function InfoBlock({ title, text, accent }: { title: string; text: string; accent?: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={[styles.infoTitle, accent ? { color: accent } : {}]}>{title}</Text>
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: colors.bg },
  header:      { margin: 16, padding: 16, backgroundColor: colors.surface, borderRadius: 12, borderLeftWidth: 4 },
  name:        { fontSize: 20, fontWeight: "700", color: colors.text, marginBottom: 4 },
  itemType:    { fontSize: 13, color: colors.textMuted, marginBottom: 8, textTransform: "capitalize" },
  badge:       { alignSelf: "flex-start", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText:   { fontSize: 13, fontWeight: "600" },
  decompRow:   { alignItems: "center", paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.border, marginHorizontal: 16 },
  decompLabel: { fontSize: 13, color: colors.textMuted, marginBottom: 4 },
  decompValue: { fontSize: 22, fontWeight: "700" },
  carbonRow:   { flexDirection: "row", alignItems: "baseline", justifyContent: "center", paddingVertical: 16, gap: 6 },
  carbonValue: { fontSize: 40, fontWeight: "800", color: colors.text },
  carbonUnit:  { fontSize: 15, color: colors.textMuted },
  chipRow:     { flexDirection: "row", justifyContent: "center", gap: 12, paddingBottom: 20 },
  chip:        { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  chipText:    { fontSize: 13, fontWeight: "600" },
  infoBlock:   { marginHorizontal: 16, marginBottom: 16 },
  infoTitle:   { fontSize: 12, fontWeight: "700", color: colors.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.6 },
  infoText:    { fontSize: 14, color: colors.text, lineHeight: 20 },
  source:      { fontSize: 11, color: colors.textMuted, marginHorizontal: 16, marginBottom: 24, fontStyle: "italic" },
});
