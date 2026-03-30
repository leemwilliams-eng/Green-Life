import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { MatchBadge } from "@/components/item/MatchBadge";
import { SparksBadge } from "@/components/restaurant/SparksBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { Screen } from "@/components/ui/Screen";
import { colors, radius, spacing, typography, withAlpha } from "@/theme";
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

interface CommunityPanel {
  id: string;
  title: string;
  body: string;
  icon: keyof typeof Feather.glyphMap;
}

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
    gradientStart: withAlpha(colors.chart1, 0.2),
    gradientEnd: withAlpha(colors.spark, 0.72),
    avatarColor: withAlpha(colors.primary, 0.2),
    avatarTextColor: colors.primary
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
    gradientStart: withAlpha(colors.surfaceTint, 0.9),
    gradientEnd: withAlpha(colors.chart5, 0.72),
    avatarColor: withAlpha(colors.chart4, 0.2),
    avatarTextColor: colors.chart4
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
    gradientStart: withAlpha(colors.chart4, 0.22),
    gradientEnd: withAlpha(colors.chart2, 0.7),
    avatarColor: withAlpha(colors.spark, 0.2),
    avatarTextColor: colors.spark
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
    gradientStart: withAlpha(colors.spark, 0.18),
    gradientEnd: withAlpha(colors.warning, 0.82),
    avatarColor: withAlpha(colors.primary, 0.2),
    avatarTextColor: colors.primary
  }
];

const COMMUNITY_PANELS: CommunityPanel[] = [
  {
    id: "share",
    title: "Share",
    body: "Post a spark, invite your table, or drop a result into a conversation.",
    icon: "share-2"
  },
  {
    id: "rankings",
    title: "Rankings",
    body: "See top igniters, strongest streaks, and who is moving the room.",
    icon: "bar-chart-2"
  },
  {
    id: "nearby",
    title: "Nearby",
    body: "Scan what people close to you are noticing right now.",
    icon: "map-pin"
  },
  {
    id: "featured",
    title: "Featured",
    body: "Highlighted places, meals, and sparks worth a closer look.",
    icon: "star"
  }
];

const FILTERS: FeedFilter[] = ["NEARBY", "FOLLOWING", "TOP TODAY", "MY TABLE"];

export function SparksFeedScreen() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("NEARBY");

  return (
    <Screen includeBottomInset={false}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Spark Feed</Text>
        <SparksBadge />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filterValue) => (
          <Pressable
            key={filterValue}
            style={[styles.pill, activeFilter === filterValue ? styles.pillActive : null]}
            onPress={() => setActiveFilter(filterValue)}
          >
            <Text style={[styles.pillText, activeFilter === filterValue ? styles.pillTextActive : null]}>
              {filterValue}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        contentContainerStyle={styles.feedContent}
        data={MOCK_FEED}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View style={styles.footerStack}>
            <View style={styles.communitySection}>
              <View style={styles.communityHeader}>
                <Text style={styles.communityTitle}>Explore Community</Text>
                <Text style={styles.communityMeta}>More ways in</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.communityRail}
              >
                {COMMUNITY_PANELS.map((panel) => (
                  <CommunityPanelCard key={panel.id} panel={panel} />
                ))}
              </ScrollView>
            </View>
            <BrandFooter style={styles.footer} />
          </View>
        }
        ListHeaderComponent={
          <View style={styles.igniterBanner}>
            <View style={styles.igniterIcon}>
              <Feather name="star" size={16} color={colors.spark} />
            </View>
            <View style={styles.igniterText}>
              <Text style={styles.igniterTitle}>IGNITER STATUS</Text>
              <Text style={styles.igniterSub}>
                You were here before the fire started. 3 friends at your table earned sparks.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => <FeedCard entry={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

function FeedCard({ entry }: { entry: FeedEntry }) {
  return (
    <View style={styles.card}>
      <View style={[styles.cardImage, { backgroundColor: entry.gradientStart }]}>
        <View style={[styles.cardImageInner, { backgroundColor: entry.gradientEnd }]} />
        <View style={styles.cardRestaurantLabel}>
          <Text style={styles.cardRestaurantText}>{entry.restaurant.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <View style={styles.cardTitleWrap}>
            <Text style={styles.cardDish}>{entry.dish}</Text>
            <Text style={styles.cardMeta}>{entry.restaurant} · {entry.timeAgo}</Text>
          </View>
          <MatchBadge matchType={entry.matchType} />
        </View>

        <View style={styles.impactRow}>
          <ImpactChip value={entry.co2} label="CO2 EQUIV" />
          <ImpactChip value={entry.water} label="WATER" />
          <ImpactChip value={entry.distance} label="TRAVELED" />
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.userRow}>
            <View style={[styles.avatar, { backgroundColor: entry.avatarColor }]}>
              <Text style={[styles.avatarText, { color: entry.avatarTextColor }]}>{entry.userInitials}</Text>
            </View>
            <Text style={styles.username}>
              {entry.username}
              {entry.isIgniter ? <Text style={styles.igniterTag}> · Igniter</Text> : null}
            </Text>
          </View>
          <View style={styles.sparksEarned}>
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

function CommunityPanelCard({ panel }: { panel: CommunityPanel }) {
  return (
    <Pressable style={({ pressed }) => [styles.communityCard, pressed ? styles.communityCardPressed : null]}>
      <View style={styles.communityIcon}>
        <Feather name={panel.icon} size={18} color={colors.primary} />
      </View>
      <Text style={styles.communityCardTitle}>{panel.title}</Text>
      <Text style={styles.communityCardBody}>{panel.body}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: spacing.md
  },
  screenTitle: {
    ...typography.h1,
    color: colors.text
  },
  filterRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingBottom: spacing.md
  },
  pill: {
    backgroundColor: withAlpha(colors.text, 0.06),
    borderColor: withAlpha(colors.text, 0.08),
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  pillText: {
    ...typography.caption,
    color: colors.textMuted,
    fontFamily: "PlusJakartaSans-SemiBold",
    letterSpacing: 0.5
  },
  pillTextActive: {
    color: colors.bg
  },
  feedContent: {
    paddingBottom: spacing.md
  },
  separator: {
    height: spacing.md
  },
  footerStack: {
    gap: spacing.lg,
    marginTop: spacing.md
  },
  communitySection: {
    gap: spacing.md
  },
  communityHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  communityTitle: {
    ...typography.title
  },
  communityMeta: {
    ...typography.caption
  },
  communityRail: {
    gap: spacing.md,
    paddingRight: spacing.xl
  },
  communityCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    minHeight: 150,
    padding: spacing.lg,
    width: 200
  },
  communityCardPressed: {
    backgroundColor: withAlpha(colors.primary, 0.08),
    borderColor: withAlpha(colors.primary, 0.28)
  },
  communityIcon: {
    alignItems: "center",
    backgroundColor: withAlpha(colors.primary, 0.14),
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36
  },
  communityCardTitle: {
    ...typography.label
  },
  communityCardBody: {
    ...typography.bodySmall
  },
  footer: {
    marginBottom: spacing.sm
  },
  igniterBanner: {
    alignItems: "center",
    backgroundColor: withAlpha(colors.spark, 0.08),
    borderColor: withAlpha(colors.spark, 0.2),
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md
  },
  igniterIcon: {
    alignItems: "center",
    backgroundColor: withAlpha(colors.spark, 0.14),
    borderRadius: 17,
    flexShrink: 0,
    height: 34,
    justifyContent: "center",
    width: 34
  },
  igniterText: {
    flex: 1
  },
  igniterTitle: {
    ...typography.caption,
    color: colors.spark,
    fontFamily: "PlusJakartaSans-Bold",
    letterSpacing: 0.8
  },
  igniterSub: {
    ...typography.caption,
    color: colors.textMuted,
    fontFamily: "PlusJakartaSans-Regular",
    lineHeight: 15,
    marginTop: 2
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden"
  },
  cardImage: {
    height: 110,
    overflow: "hidden",
    position: "relative"
  },
  cardImageInner: {
    bottom: 0,
    height: "100%",
    opacity: 0.6,
    position: "absolute",
    right: 0,
    width: "60%"
  },
  cardRestaurantLabel: {
    bottom: spacing.sm,
    left: spacing.md,
    position: "absolute"
  },
  cardRestaurantText: {
    ...typography.caption,
    color: withAlpha(colors.text, 0.56),
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 9,
    letterSpacing: 0.8
  },
  cardBody: {
    gap: spacing.sm,
    padding: spacing.md
  },
  cardTop: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  cardTitleWrap: {
    flex: 1,
    gap: 2
  },
  cardDish: {
    ...typography.label,
    color: colors.text
  },
  cardMeta: {
    ...typography.caption,
    color: colors.textMuted,
    fontFamily: "PlusJakartaSans-Regular"
  },
  impactRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  impactChip: {
    backgroundColor: withAlpha(colors.text, 0.04),
    borderRadius: radius.md,
    flex: 1,
    gap: 2,
    padding: spacing.sm
  },
  impactValue: {
    ...typography.caption,
    color: colors.text,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 12
  },
  impactLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 9,
    letterSpacing: 0.4
  },
  cardFooter: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm
  },
  userRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  avatar: {
    alignItems: "center",
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    width: 24
  },
  avatarText: {
    ...typography.caption,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 9
  },
  username: {
    ...typography.caption,
    color: colors.textMuted,
    fontFamily: "PlusJakartaSans-Medium"
  },
  igniterTag: {
    color: colors.spark
  },
  sparksEarned: {
    alignItems: "center",
    flexDirection: "row",
    gap: 0
  },
  sparksEarnedText: {
    ...typography.caption,
    color: colors.spark,
    fontFamily: "PlusJakartaSans-Bold"
  }
});
