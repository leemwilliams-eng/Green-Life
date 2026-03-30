import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ── TOKENS ──────────────────────────────────────────────────────────────────
const colors = {
  bgPrimary: '#0E1A0F',
  bgCard: '#121E13',
  bgElevated: '#1A2E1C',
  bgScanCard: '#1A3D1F',
  borderSubtle: '#1E3020',
  borderMid: '#243826',
  borderGold: '#3D2D10',
  green: '#2F6B3B',
  greenLight: '#4A9B5F',
  greenMuted: '#4A6E4D',
  greenDim: '#3D5C40',
  gold: '#C8A96E',
  goldDim: '#7A5E30',
  goldBg: '#2E1F0A',
  textPrimary: '#F5F3EF',
  textWhite: '#FFFFFF',
  textMuted: '#5A8A62',
  navBg: '#0A140B',
};

// ── TYPES ────────────────────────────────────────────────────────────────────
type BadgeVariant = 'exact' | 'probable' | 'estimate';

interface ScanItem {
  id: string;
  emoji: string;
  name: string;
  meta: string;
  badge: BadgeVariant;
}

interface ImpactTile {
  value: string;
  unit: string;
  label: string;
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const recentScans: ScanItem[] = [
  { id: '1', emoji: '🥤', name: 'Coca-Cola 12oz Can', meta: '2 hours ago · Aluminum', badge: 'exact' },
  { id: '2', emoji: '🛍️', name: 'Whole Foods Bag', meta: 'Yesterday · Paper', badge: 'probable' },
  { id: '3', emoji: '🥡', name: 'Takeout Container', meta: '2 days ago · Foam', badge: 'estimate' },
];

const impactTiles: ImpactTile[] = [
  { value: '47', unit: 'lbs', label: 'Paper saved\nthis month' },
  { value: '12', unit: '🔥', label: 'Day streak\nactive' },
  { value: '3.2', unit: 'kg', label: 'CO₂ offset\nestimated' },
  { value: '84', unit: '%', label: 'Choices\nimproved' },
];

const badgeConfig: Record<BadgeVariant, { label: string; bg: string; text: string; border: string }> = {
  exact:    { label: 'Exact',    bg: '#1A3D1F', text: '#4A9B5F', border: '#2A5030' },
  probable: { label: 'Probable', bg: '#1A2A3D', text: '#5B8FCC', border: '#223650' },
  estimate: { label: 'Estimate', bg: '#2E2410', text: '#C8A96E', border: '#3D3015' },
};

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>
          Green<Text style={styles.wordmarkAccent}>Life</Text>
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>LW</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── GREETING ── */}
        <View style={styles.greeting}>
          <Text style={styles.greetingSub}>Saturday, March 21</Text>
          <Text style={styles.greetingMain}>
            Good morning,{'\n'}
            <Text style={styles.greetingName}>Lee.</Text>
          </Text>
        </View>

        {/* ── SCAN CTA ── */}
        <TouchableOpacity style={styles.scanCard} activeOpacity={0.85}>
          <Text style={styles.scanLabel}>Primary Action</Text>
          <Text style={styles.scanHeadline}>
            Point your phone at the{' '}
            <Text style={styles.scanHeadlineItalic}>world.</Text>
          </Text>
          <View style={styles.scanBtn}>
            <Text style={styles.scanBtnText}>⊡  Scan Now</Text>
          </View>
        </TouchableOpacity>

        {/* ── IMPACT STRIP ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.impactStrip}
          contentContainerStyle={styles.impactStripContent}
        >
          {impactTiles.map((tile, i) => (
            <View key={i} style={styles.impactTile}>
              <Text style={styles.impactValue}>
                {tile.value}
                <Text style={styles.impactUnit}> {tile.unit}</Text>
              </Text>
              <Text style={styles.impactLabel}>{tile.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ── RECENT SCANS ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.sectionLink}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scanList}>
          {recentScans.map((item) => {
            const badge = badgeConfig[item.badge];
            return (
              <TouchableOpacity key={item.id} style={styles.scanItem} activeOpacity={0.75}>
                <View style={styles.scanThumb}>
                  <Text style={styles.scanEmoji}>{item.emoji}</Text>
                </View>
                <View style={styles.scanInfo}>
                  <Text style={styles.scanName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.scanMeta}>{item.meta}</Text>
                </View>
                <View style={[styles.scanBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                  <Text style={[styles.scanBadgeText, { color: badge.text }]}>{badge.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── IGNITER BANNER ── */}
        <View style={styles.igniterBanner}>
          <View style={styles.igniterFlame}>
            <Text style={styles.igniterFlameText}>🔥</Text>
          </View>
          <View style={styles.igniterText}>
            <Text style={styles.igniterTitle}>Igniter — Founding Member</Text>
            <Text style={styles.igniterSub}>
              You were here before the fire started. Your impact shapes what Green Life becomes.
            </Text>
          </View>
        </View>

        {/* bottom padding for nav */}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* ── BOTTOM NAV ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={[styles.navIcon, styles.navIconActive]}>⌂</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>⌕</Text>
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navScanBtn} activeOpacity={0.8}>
          <Text style={styles.navScanIcon}>⊡</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>⊕</Text>
          <Text style={styles.navLabel}>Community</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navIcon}>◯</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  wordmark: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 22,
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  wordmarkAccent: {
    color: colors.greenLight,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.borderMid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: {
    fontSize: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#3D7A4A',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 13,
    color: colors.textPrimary,
  },

  // SCROLL
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 4,
  },

  // GREETING
  greeting: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 4,
  },
  greetingSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  greetingMain: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 26,
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  greetingName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontWeight: '600',
    color: colors.textWhite,
  },

  // SCAN CARD
  scanCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: colors.bgScanCard,
    borderWidth: 1,
    borderColor: '#2A5030',
    borderRadius: 20,
    padding: 24,
  },
  scanLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.greenLight,
    marginBottom: 8,
  },
  scanHeadline: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 18,
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: 20,
    maxWidth: 180,
  },
  scanHeadlineItalic: {
    fontStyle: 'italic',
    color: colors.gold,
  },
  scanBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.green,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  scanBtnText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },

  // IMPACT STRIP
  impactStrip: {
    marginBottom: 20,
  },
  impactStripContent: {
    paddingHorizontal: 24,
    gap: 10,
  },
  impactTile: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: 14,
    padding: 14,
    minWidth: 110,
  },
  impactValue: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 22,
    fontWeight: '300',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 26,
    marginBottom: 4,
  },
  impactUnit: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: '500',
  },
  impactLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    fontWeight: '400',
    color: colors.greenMuted,
    lineHeight: 15,
  },

  // SECTION HEADER
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    fontWeight: '500',
    color: colors.greenLight,
  },

  // SCAN LIST
  scanList: {
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 20,
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.bgElevated,
    borderRadius: 14,
    padding: 12,
  },
  scanThumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.bgScanCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanEmoji: {
    fontSize: 22,
  },
  scanInfo: {
    flex: 1,
  },
  scanName: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  scanMeta: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    fontWeight: '400',
    color: colors.greenMuted,
  },
  scanBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  scanBadgeText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
  },

  // IGNITER BANNER
  igniterBanner: {
    marginHorizontal: 24,
    backgroundColor: colors.goldBg,
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  igniterFlame: {
    width: 36,
    height: 36,
    backgroundColor: '#3D2D10',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  igniterFlameText: {
    fontSize: 18,
  },
  igniterText: {
    flex: 1,
  },
  igniterTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: colors.gold,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  igniterSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    fontWeight: '400',
    color: colors.goldDim,
    lineHeight: 16,
  },

  // BOTTOM NAV
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.navBg,
    borderTopWidth: 1,
    borderTopColor: colors.bgElevated,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
  },
  navIcon: {
    fontSize: 20,
    color: colors.greenDim,
  },
  navIconActive: {
    color: colors.greenLight,
  },
  navLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    fontWeight: '500',
    color: colors.greenDim,
    letterSpacing: 0.2,
  },
  navLabelActive: {
    color: colors.greenLight,
  },
  navScanBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  navScanIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
});
