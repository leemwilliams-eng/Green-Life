import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ── Placeholder data ──────────────────────────────────────────────────────────

const COMMUNITY_STATS = {
  total_igniters: 847,
  total_scans: 12403,
  total_kg_co2e_surfaced: 9861.4,
  total_materials_identified: 3247,
};

const IGNITERS = [
  { rank: 1, display: 'Lee W.',     sparks: 142, location: 'Tulsa, OK',          isYou: true  },
  { rank: 2, display: 'Marisol R.', sparks: 118, location: 'Austin, TX',         isYou: false },
  { rank: 3, display: 'Jamal T.',   sparks: 97,  location: 'Atlanta, GA',        isYou: false },
  { rank: 4, display: 'Sofia M.',   sparks: 84,  location: 'Denver, CO',         isYou: false },
  { rank: 5, display: 'Kevin C.',   sparks: 71,  location: 'San Francisco, CA',  isYou: false },
  { rank: 6, display: 'Priya S.',   sparks: 63,  location: 'Chicago, IL',        isYou: false },
  { rank: 7, display: 'Marcus L.',  sparks: 58,  location: 'Portland, OR',       isYou: false },
];

type FeedScanType = 'food' | 'material' | 'barcode';

interface FeedItem {
  id: string;
  display: string;
  scan_type: FeedScanType;
  item_name: string;
  detail: string;
  location: string;
  time_ago: string;
  isYou?: boolean;
}

const FEED_ITEMS: FeedItem[] = [
  { id: '1', display: 'Marisol R.', scan_type: 'food',     item_name: 'Grilled Salmon',      detail: '1.2 kg CO₂e per serving',          location: 'Austin, TX',          time_ago: '2m ago'  },
  { id: '2', display: 'Jamal T.',   scan_type: 'material', item_name: 'Styrofoam Container', detail: 'Critical · 500+ yr decomposition',  location: 'Atlanta, GA',         time_ago: '8m ago'  },
  { id: '3', display: 'Sofia M.',   scan_type: 'food',     item_name: 'Beef Burger',         detail: '4.8 kg CO₂e per serving',          location: 'Denver, CO',          time_ago: '14m ago' },
  { id: '4', display: 'Lee W.',     scan_type: 'barcode',  item_name: 'Coca-Cola 12oz',      detail: '0.33 kg CO₂e · Aluminum can',      location: 'Tulsa, OK',           time_ago: '22m ago', isYou: true },
  { id: '5', display: 'Kevin C.',   scan_type: 'material', item_name: 'Plastic Straw',       detail: 'Not recyclable · 200+ yr decomp',  location: 'San Francisco, CA',   time_ago: '31m ago' },
  { id: '6', display: 'Priya S.',   scan_type: 'food',     item_name: 'Caesar Salad',        detail: '0.4 kg CO₂e per serving',          location: 'Chicago, IL',         time_ago: '45m ago' },
  { id: '7', display: 'Marcus L.',  scan_type: 'food',     item_name: 'Beef Brisket',        detail: '6.1 kg CO₂e per serving',          location: 'Portland, OR',        time_ago: '1h ago'  },
  { id: '8', display: 'Marisol R.', scan_type: 'material', item_name: 'Paper Coffee Cup',    detail: 'PE lining · not recyclable',        location: 'Austin, TX',          time_ago: '1h ago'  },
];

// ── Config ────────────────────────────────────────────────────────────────────

const SCAN_CONFIG: Record<FeedScanType, { icon: keyof typeof Ionicons.glyphMap; color: string; label: string }> = {
  food:     { icon: 'restaurant-outline', color: '#4A9B5F', label: 'Food'     },
  material: { icon: 'leaf-outline',       color: '#C8A96E', label: 'Material' },
  barcode:  { icon: 'barcode-outline',    color: '#5B8FCC', label: 'Product'  },
};

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function fmt(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n);
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const [feedFilter, setFeedFilter] = useState<'all' | FeedScanType>('all');

  const topPadding = (insets.top || (Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0)) + 10;

  const filteredFeed = feedFilter === 'all'
    ? FEED_ITEMS
    : FEED_ITEMS.filter(f => f.scan_type === feedFilter);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A140B" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding }]}>
        <View>
          <Text style={styles.wordmark}>
            <Text style={styles.wordmarkWhite}>GREEN</Text>
            {'  '}
            <Text style={styles.wordmarkGreen}>LIFE</Text>
          </Text>
          <Text style={styles.headerSub}>Community</Text>
        </View>
        <View style={styles.igniteBadge}>
          <Ionicons name="flame-outline" size={11} color="#C8A96E" />
          <Text style={styles.igniteText}>Igniters</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >

        {/* ── IMPACT BANNER ──────────────────────────────────────────────── */}
        <View style={styles.impactBanner}>
          <Text style={styles.impactBannerTitle}>The fire is spreading.</Text>
          <Text style={styles.impactBannerSub}>
            Every scan throws a spark. Here's what the community has surfaced.
          </Text>
          <View style={styles.impactGrid}>
            <View style={styles.impactTile}>
              <Text style={styles.impactValue}>{fmt(COMMUNITY_STATS.total_igniters)}</Text>
              <Text style={styles.impactLabel}>Igniters</Text>
            </View>
            <View style={[styles.impactTile, styles.impactTileDivider]}>
              <Text style={styles.impactValue}>{fmt(COMMUNITY_STATS.total_scans)}</Text>
              <Text style={styles.impactLabel}>Total scans</Text>
            </View>
            <View style={[styles.impactTile, styles.impactTileDivider]}>
              <Text style={styles.impactValue}>{fmt(Math.round(COMMUNITY_STATS.total_kg_co2e_surfaced))}</Text>
              <Text style={styles.impactLabel}>kg CO₂e{'\n'}surfaced</Text>
            </View>
            <View style={[styles.impactTile, styles.impactTileDivider]}>
              <Text style={styles.impactValue}>{fmt(COMMUNITY_STATS.total_materials_identified)}</Text>
              <Text style={styles.impactLabel}>Materials{'\n'}identified</Text>
            </View>
          </View>
          <Text style={styles.impactDisclaimer}>
            Data is estimated and illustrative. Real data populates when API is live.
          </Text>
        </View>

        {/* ── IGNITERS LEADERBOARD ───────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Igniters</Text>
            <View style={styles.sectionBadge}>
              <Ionicons name="flame" size={11} color="#C8A96E" />
              <Text style={styles.sectionBadgeText}>By Sparks</Text>
            </View>
          </View>

          <View style={styles.leaderboard}>
            {IGNITERS.map((igniter, i) => (
              <View
                key={igniter.rank}
                style={[
                  styles.leaderRow,
                  igniter.isYou && styles.leaderRowYou,
                  i < IGNITERS.length - 1 && styles.leaderRowBorder,
                ]}
              >
                {/* Rank */}
                <View style={styles.rankWrap}>
                  {MEDALS[igniter.rank]
                    ? <Text style={styles.medal}>{MEDALS[igniter.rank]}</Text>
                    : <Text style={styles.rankNum}>{igniter.rank}</Text>
                  }
                </View>

                {/* Avatar */}
                <View style={[styles.avatar, igniter.isYou && styles.avatarYou]}>
                  <Text style={styles.avatarText}>{initials(igniter.display)}</Text>
                </View>

                {/* Name + location */}
                <View style={styles.leaderInfo}>
                  <View style={styles.leaderNameRow}>
                    <Text style={[styles.leaderName, igniter.isYou && styles.leaderNameYou]}>
                      {igniter.display}
                    </Text>
                    {igniter.isYou && (
                      <View style={styles.youPill}>
                        <Text style={styles.youPillText}>You</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.leaderLocation}>{igniter.location}</Text>
                </View>

                {/* Sparks */}
                <View style={styles.sparksWrap}>
                  <Text style={[styles.sparksCount, igniter.isYou && styles.sparksCountYou]}>
                    {igniter.sparks}
                  </Text>
                  <Text style={styles.sparksLabel}>🔥</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── RECENT SPARKS FEED ─────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Sparks</Text>
          </View>

          {/* Feed filter */}
          <View style={styles.filterRow}>
            {(['all', 'food', 'material', 'barcode'] as const).map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterBtn, feedFilter === f && styles.filterBtnActive]}
                onPress={() => setFeedFilter(f)}
                activeOpacity={0.75}
              >
                <Text style={[styles.filterBtnText, feedFilter === f && styles.filterBtnTextActive]}>
                  {f === 'all' ? 'All' : SCAN_CONFIG[f].label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.feedList}>
            {filteredFeed.map((item, i) => {
              const cfg = SCAN_CONFIG[item.scan_type];
              return (
                <View
                  key={item.id}
                  style={[
                    styles.feedItem,
                    item.isYou && styles.feedItemYou,
                    i < filteredFeed.length - 1 && styles.feedItemBorder,
                  ]}
                >
                  {/* Scan type icon */}
                  <View style={[styles.feedIcon, { backgroundColor: cfg.color + '22' }]}>
                    <Ionicons name={cfg.icon} size={16} color={cfg.color} />
                  </View>

                  {/* Content */}
                  <View style={styles.feedContent}>
                    <View style={styles.feedTopRow}>
                      <Text style={styles.feedDisplay}>{item.display}</Text>
                      {item.isYou && (
                        <View style={styles.youPill}>
                          <Text style={styles.youPillText}>You</Text>
                        </View>
                      )}
                      <Text style={styles.feedTime}>{item.time_ago}</Text>
                    </View>
                    <Text style={styles.feedItemName}>{item.item_name}</Text>
                    <Text style={styles.feedDetail}>{item.detail}</Text>
                    <Text style={styles.feedLocation}>
                      <Ionicons name="location-outline" size={10} color="#4A6E4D" /> {item.location}
                    </Text>
                  </View>

                  {/* Spark */}
                  <Text style={styles.feedSpark}>🔥</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* ── MANIFESTO FOOTER ───────────────────────────────────────────── */}
        <View style={styles.manifestoWrap}>
          <View style={styles.manifestoDivider} />
          <Text style={styles.manifestoText}>
            "If everyone knew the real impact of what they were doing,{'\n'}
            they would make different choices."
          </Text>
          <Text style={styles.manifestoAttrib}>— Lee Williams, Founder</Text>
        </View>

      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A0F',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: '#0A140B',
    borderBottomWidth: 1,
    borderBottomColor: '#1A2E1C',
  },
  wordmark: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 20,
  },
  wordmarkWhite: {
    color: '#F5F3EF',
    letterSpacing: 5,
  },
  wordmarkGreen: {
    color: '#4A9B5F',
    letterSpacing: 5,
  },
  headerSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A6E4D',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  igniteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#1A2E1C',
    borderWidth: 1,
    borderColor: '#C8A96E',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 2,
  },
  igniteText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#C8A96E',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  scroll: {
    padding: 20,
    gap: 20,
  },

  // Impact banner
  impactBanner: {
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#1A2E1C',
    borderRadius: 16,
    padding: 20,
  },
  impactBannerTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#F5F3EF',
    marginBottom: 6,
  },
  impactBannerSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#4A6E4D',
    lineHeight: 20,
    marginBottom: 20,
  },
  impactGrid: {
    flexDirection: 'row',
    backgroundColor: '#0E1A0F',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A2E1C',
    overflow: 'hidden',
    marginBottom: 12,
  },
  impactTile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  impactTileDivider: {
    borderLeftWidth: 1,
    borderLeftColor: '#1A2E1C',
  },
  impactValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 20,
    color: '#4A9B5F',
    marginBottom: 4,
  },
  impactLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 9,
    color: '#4A6E4D',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 13,
  },
  impactDisclaimer: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    color: '#2F6B3B',
    fontStyle: 'italic',
  },

  // Section
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: '#F5F3EF',
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1A2E1C',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sectionBadgeText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#C8A96E',
    letterSpacing: 0.5,
  },

  // Leaderboard
  leaderboard: {
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#1A2E1C',
    borderRadius: 14,
    overflow: 'hidden',
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  leaderRowYou: {
    backgroundColor: '#0E1F10',
  },
  leaderRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1A2E1C',
  },
  rankWrap: {
    width: 24,
    alignItems: 'center',
  },
  medal: {
    fontSize: 16,
  },
  rankNum: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 13,
    color: '#4A6E4D',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A2E1C',
    borderWidth: 1,
    borderColor: '#2F6B3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarYou: {
    backgroundColor: '#1A3D1F',
    borderColor: '#4A9B5F',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: '#4A9B5F',
  },
  leaderInfo: {
    flex: 1,
  },
  leaderNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  leaderName: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#F5F3EF',
  },
  leaderNameYou: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#F5F3EF',
  },
  leaderLocation: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A6E4D',
  },
  sparksWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  sparksCount: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: '#4A6E4D',
  },
  sparksCountYou: {
    color: '#C8A96E',
  },
  sparksLabel: {
    fontSize: 13,
  },
  youPill: {
    backgroundColor: '#1A3D1F',
    borderWidth: 1,
    borderColor: '#2A5030',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  youPillText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 9,
    color: '#4A9B5F',
    letterSpacing: 0.4,
  },

  // Feed
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#1A2E1C',
  },
  filterBtnActive: {
    backgroundColor: '#1A3D1F',
    borderColor: '#2A5030',
  },
  filterBtnText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#4A6E4D',
  },
  filterBtnTextActive: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#4A9B5F',
  },
  feedList: {
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#1A2E1C',
    borderRadius: 14,
    overflow: 'hidden',
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    gap: 12,
  },
  feedItemYou: {
    backgroundColor: '#0E1F10',
  },
  feedItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1A2E1C',
  },
  feedIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  feedContent: {
    flex: 1,
    gap: 2,
  },
  feedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  feedDisplay: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 13,
    color: '#F5F3EF',
  },
  feedTime: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A6E4D',
    marginLeft: 'auto',
  },
  feedItemName: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 13,
    color: '#F5F3EF',
  },
  feedDetail: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A9B5F',
    marginTop: 1,
  },
  feedLocation: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    color: '#4A6E4D',
    marginTop: 3,
  },
  feedSpark: {
    fontSize: 14,
    marginTop: 2,
  },

  // Manifesto footer
  manifestoWrap: {
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  manifestoDivider: {
    width: 40,
    height: 1,
    backgroundColor: '#C8A96E',
    marginBottom: 4,
  },
  manifestoText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#4A6E4D',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  manifestoAttrib: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 11,
    color: '#C8A96E',
    letterSpacing: 0.5,
  },
});
