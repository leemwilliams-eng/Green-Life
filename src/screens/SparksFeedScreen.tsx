import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { MatchBadge } from "@/components/item/MatchBadge";
import { SparksBadge } from "@/components/restaurant/SparksBadge";
import { colors, radius, spacing, typography } from "@/theme";
import type { MatchType } from "@/types/domain";

type FeedFilter = "NEARBY" | "FOLLOWING" | "TOP TODAY" | "MY TABLE";

interface FeedEntry {
  id: string;
  dish: string;
  restaurant: string;
  timeAgo: string;
  matchType: MatchType;
  co2: string;
  water: string;
  distance: string;
  userInitials: string;
  username: string;
  isIgniter: boolean;
  sparksEarned: number;
  gradientStart: string;
  gradientEnd: string;
  avatarColor: string;
  avatarTextColor: string;
}

// Mock feed data — restaurant table primary use case
const MOCK_FEED: FeedEntry[] = [
  {
    id: "1",
    dish: "Grass-Fed Ribeye, 12oz",
    restaurant: "Mahogany Prime",
    timeAgo: "2 min ago",
    matchType: "exact_product",
    co2: "27.4 kg",
    water: "1,847 L",
    distance: "1,240 mi",
    userInitials: "JM",
    username: "@jordan_m",
    isIgniter: true,
    sparksEarned: 18,
    gradientStart: "#1a3520",
    gradientEnd: "#c8a96e",
    avatarColor: colors.primary + "33",
    avatarTextColor: colors.primary,
  },
  {
    id: "2",
    dish: "Roasted Cauliflower Bowl",
    restaurant: "The Harvest Table",
    timeAgo: "8 min ago",
    matchType: "probable_product",
    co2: "1.2 kg",
    water: "214 L",
    distance: "340 mi",
    userInitials: "SK",
    username: "@sarah_k",
    isIgniter: false,
    sparksEarned: 12,
    gradientStart: "#1a2a1a",
    gradientEnd: "#8fbc8f",
    avatarColor: "#38BDF833",
    avatarTextColor: "#38BDF8",
  },
  {
    id: "3",
    dish: "Wild-Caught Salmon, 8oz",
    restaurant: "Ocean & Vine",
    timeAgo: "14 min ago",
    matchType: "probable_product",
    co2: "4.2 kg",
    water: "590 L",
    distance: "680 mi",
    userInitials: "AR",
    username: "@alex_r",
    isIgniter: true,
    sparksEarned: 15,
    gradientStart: "#0d2233",
    gradientEnd: "#4a90a4",
    avatarColor: colors.spark + "33",
    avatarTextColor: colors.spark,
  },
  {
    id: "4",
    dish: "Farm Egg Shakshuka",
    restaurant: "The Morning Table",
    timeAgo: "22 min ago",
    matchType: "category_estimate",
    co2: "0.8 kg",
    water: "180 L",
    distance: "42 mi",
    userInitials: "MP",
    username: "@maya_p",
    isIgniter: false,
    sparksEarned: 8,
    gradientStart: "#2a1e0a",
    gradientEnd: "#d4a855",
    avatarColor: "#10B98133",
    avatarTextColor: colors.primary,
  },
];

const FILTERS: FeedFilter[] = ["NEARBY", "FOLLOWING", "TOP TODAY", "MY TABLE"];

export function SparksFeedScreen() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("NEARBY");

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Spark Feed</Text>
          <SparksBadge />
        </View>

        {/* ── Filter pills ── */}
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[styles.pill, activeFilter === f && styles.pillActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[styles.pillText, activeFilter === f && styles.pillTextActive]}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Feed ── */}
        <FlatList
          data={MOCK_FEED}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
          ListFooterComponent={<View style={styles.listFooter} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            // Igniter banner at top of feed
            <View style={styles.igniterBanner}>
              <View style={styles.igniterIcon}>
                <Feather name="star" size={16} color={colors.spark} />
              </View>
              <View style={styles.igniterText}>
                <Text style={styles.igniterTitle}>IGNITER STATUS</Text>
                <Text style={styles.igniterSub}>
                  You were here before the fire started. 3 friends at your table
                  earned sparks.
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => <FeedCard entry={item} />}
        />
      </SafeAreaView>
    </View>
  );
}

function FeedCard({ entry }: { entry: FeedEntry }) {
  return (
    <View style={styles.card}>
      {/* Image band — restaurant scene gradient */}
      <View
        style={[styles.cardImage, { backgroundColor: entry.gradientStart }]}
      >
        <View
          style={[styles.cardImageInner, { backgroundColor: entry.gradientEnd }]}
        />
        <View style={styles.cardRestaurantLabel}>
          <Text style={styles.cardRestaurantText}>
            {entry.restaurant.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Card body */}
      <View style={styles.cardBody}>
        {/* Dish + badge */}
        <View style={styles.cardTop}>
          <View style={styles.cardTitleWrap}>
            <Text style={styles.cardDish}>{entry.dish}</Text>
            <Text style={styles.cardMeta}>
              {entry.restaurant} · {entry.timeAgo}
            </Text>
          </View>
          <MatchBadge matchType={entry.matchType} />
        </View>

        {/* Impact chips */}
        <View style={styles.impactRow}>
          <ImpactChip value={entry.co2} label="CO₂ EQUIV" />
          <ImpactChip value={entry.water} label="WATER" />
          <ImpactChip value={entry.distance} label="TRAVELED" />
        </View>

        {/* Footer — user + sparks */}
        <View style={styles.cardFooter}>
          <View style={styles.userRow}>
            <View
              style={[styles.avatar, { backgroundColor: entry.avatarColor }]}
            >
              <Text style={[styles.avatarText, { color: entry.avatarTextColor }]}>
                {entry.userInitials}
              </Text>
            </View>
            <Text style={styles.username}>
              {entry.username}
              {entry.isIgniter && (
                <Text style={styles.igniterTag}> · Igniter</Text>
              )}
            </Text>
          </View>
          <View style={styles.sparksEarned}>
            <View style={styles.sparkDot} />
            <Text style={styles.sparksEarnedText}>+{entry.sparksEarned} sparks</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ImpactChip({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.impactChip}>
      <Text style={styles.impactValue}>{value}</Text>
      <Text style={styles.impactLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  safeArea: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  screenTitle: {
    ...typography.h1,
    color: colors.text,
  },

  // Filter pills
  filterRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.textMuted,
  },
  pillTextActive: {
    color: colors.bg,
  },

  // Feed
  feedContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100, // room for tab bar
  },
  separator: {
    height: spacing.md,
  },
  listFooter: {
    height: spacing.xl,
  },

  // Igniter banner
  igniterBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.spark + "14",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.spark + "33",
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  igniterIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.spark + "22",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  igniterText: {
    flex: 1,
  },
  igniterTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 11,
    color: colors.spark,
    letterSpacing: 0.8,
  },
  igniterSub: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },

  // Feed card
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  cardImage: {
    height: 110,
    position: "relative",
    overflow: "hidden",
  },
  cardImageInner: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "60%",
    height: "100%",
    opacity: 0.6,
  },
  cardRestaurantLabel: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.md,
  },
  cardRestaurantText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 9,
    color: colors.text + "88",
    letterSpacing: 0.8,
  },
  cardBody: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  cardTitleWrap: {
    flex: 1,
    gap: 2,
  },
  cardDish: {
    ...typography.label,
    color: colors.text,
  },
  cardMeta: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 11,
    color: colors.textMuted,
  },

  // Impact chips
  impactRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  impactChip: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: 2,
  },
  impactValue: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 12,
    color: colors.text,
  },
  impactLabel: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 9,
    color: colors.textMuted,
    letterSpacing: 0.4,
  },

  // Card footer
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 9,
  },
  username: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 11,
    color: colors.textMuted,
  },
  igniterTag: {
    color: colors.spark,
  },
  sparksEarned: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  sparkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.spark,
  },
  sparksEarnedText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 11,
    color: colors.spark,
  },
});
