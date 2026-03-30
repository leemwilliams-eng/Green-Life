# ─────────────────────────────────────────────
# Green Life — Expo Setup Script (Windows PowerShell)
# Run this from the root of your Expo project:
#   .\setup-greenlife.ps1
# If you get a permissions error, first run:
#   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
# ─────────────────────────────────────────────

Write-Host ""
Write-Host "Green Life - Setting up project files..." -ForegroundColor Green
Write-Host ""

# Create folders
New-Item -ItemType Directory -Force -Path "screens" | Out-Null
New-Item -ItemType Directory -Force -Path "navigation" | Out-Null
New-Item -ItemType Directory -Force -Path "assets\fonts" | Out-Null

Write-Host "Folders created" -ForegroundColor Cyan

# ─── App.tsx ─────────────────────────────────
@'
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'PlusJakartaSans-Light': require('./assets/fonts/PlusJakartaSans-Light.ttf'),
        'PlusJakartaSans-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
        'PlusJakartaSans-Medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
        'PlusJakartaSans-SemiBold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0E1A0F', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#4A9B5F" />
      </View>
    );
  }

  return <AppNavigator />;
}
'@ | Set-Content -Path "App.tsx" -Encoding UTF8
Write-Host "App.tsx written" -ForegroundColor Cyan

# ─── navigation/AppNavigator.tsx ─────────────
@'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

function ScanScreen() {
  return <View style={styles.placeholder}><Text style={styles.placeholderText}>Scan</Text></View>;
}
function CommunityScreen() {
  return <View style={styles.placeholder}><Text style={styles.placeholderText}>Community</Text></View>;
}
function ProfileScreen() {
  return <View style={styles.placeholder}><Text style={styles.placeholderText}>Profile</Text></View>;
}

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0A140B',
            borderTopColor: '#1A2E1C',
            borderTopWidth: 1,
            height: 72,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#4A9B5F',
          tabBarInactiveTintColor: '#3D5C40',
          tabBarLabelStyle: {
            fontFamily: 'PlusJakartaSans-Medium',
            fontSize: 10,
            letterSpacing: 0.2,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⌂</Text>,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⌕</Text>,
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View style={styles.scanBtn}>
                <Text style={styles.scanBtnText}>⊡</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarLabel: 'Community',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⊕</Text>,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>◯</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scanBtn: {
    width: 52, height: 52,
    borderRadius: 16,
    backgroundColor: '#2F6B3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#2F6B3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  scanBtnText: { fontSize: 24, color: '#F5F3EF' },
  placeholder: {
    flex: 1, backgroundColor: '#0E1A0F',
    alignItems: 'center', justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 16, color: '#4A6E4D',
  },
});
'@ | Set-Content -Path "navigation\AppNavigator.tsx" -Encoding UTF8
Write-Host "navigation/AppNavigator.tsx written" -ForegroundColor Cyan

# ─── screens/HomeScreen.tsx ──────────────────
@'
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';

const colors = {
  bgPrimary: '#0E1A0F', bgCard: '#121E13', bgElevated: '#1A2E1C',
  bgScanCard: '#1A3D1F', borderSubtle: '#1E3020', borderMid: '#243826',
  borderGold: '#3D2D10', green: '#2F6B3B', greenLight: '#4A9B5F',
  greenMuted: '#4A6E4D', greenDim: '#3D5C40', gold: '#C8A96E',
  goldDim: '#7A5E30', goldBg: '#2E1F0A', textPrimary: '#F5F3EF',
  textWhite: '#FFFFFF', textMuted: '#5A8A62', navBg: '#0A140B',
};

type BadgeVariant = 'exact' | 'probable' | 'estimate';
interface ScanItem { id: string; emoji: string; name: string; meta: string; badge: BadgeVariant; }
interface ImpactTile { value: string; unit: string; label: string; }

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

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />
      <View style={styles.header}>
        <Text style={styles.wordmark}>Green<Text style={styles.wordmarkAccent}>Life</Text></Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </TouchableOpacity>
          <View style={styles.avatar}><Text style={styles.avatarText}>LW</Text></View>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetingSub}>Saturday, March 21</Text>
          <Text style={styles.greetingMain}>Good morning,{'\n'}<Text style={styles.greetingName}>Lee.</Text></Text>
        </View>
        <TouchableOpacity style={styles.scanCard} activeOpacity={0.85}>
          <Text style={styles.scanLabel}>Primary Action</Text>
          <Text style={styles.scanHeadline}>Point your phone at the <Text style={styles.scanHeadlineItalic}>world.</Text></Text>
          <View style={styles.scanBtn}><Text style={styles.scanBtnText}>⊡  Scan Now</Text></View>
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.impactStrip} contentContainerStyle={styles.impactStripContent}>
          {impactTiles.map((tile, i) => (
            <View key={i} style={styles.impactTile}>
              <Text style={styles.impactValue}>{tile.value}<Text style={styles.impactUnit}> {tile.unit}</Text></Text>
              <Text style={styles.impactLabel}>{tile.label}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <TouchableOpacity activeOpacity={0.7}><Text style={styles.sectionLink}>See all</Text></TouchableOpacity>
        </View>
        <View style={styles.scanList}>
          {recentScans.map((item) => {
            const badge = badgeConfig[item.badge];
            return (
              <TouchableOpacity key={item.id} style={styles.scanItem} activeOpacity={0.75}>
                <View style={styles.scanThumb}><Text style={styles.scanEmoji}>{item.emoji}</Text></View>
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
        <View style={styles.igniterBanner}>
          <View style={styles.igniterFlame}><Text style={styles.igniterFlameText}>🔥</Text></View>
          <View style={styles.igniterText}>
            <Text style={styles.igniterTitle}>Igniter — Founding Member</Text>
            <Text style={styles.igniterSub}>You were here before the fire started. Your impact shapes what Green Life becomes.</Text>
          </View>
        </View>
        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgPrimary },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 8, paddingBottom: 4 },
  wordmark: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 22, color: colors.textPrimary, letterSpacing: -0.4 },
  wordmarkAccent: { color: colors.greenLight },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.borderMid, alignItems: 'center', justifyContent: 'center' },
  iconBtnText: { fontSize: 16 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#3D7A4A' },
  avatarText: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 13, color: colors.textPrimary },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 4 },
  greeting: { paddingHorizontal: 24, paddingBottom: 20, paddingTop: 4 },
  greetingSub: { fontFamily: 'PlusJakartaSans-Light', fontSize: 12, color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  greetingMain: { fontFamily: 'PlusJakartaSans-Light', fontSize: 26, fontWeight: '300', color: colors.textPrimary, lineHeight: 32, letterSpacing: -0.5 },
  greetingName: { fontFamily: 'PlusJakartaSans-SemiBold', fontWeight: '600', color: colors.textWhite },
  scanCard: { marginHorizontal: 24, marginBottom: 20, backgroundColor: colors.bgScanCard, borderWidth: 1, borderColor: '#2A5030', borderRadius: 20, padding: 24 },
  scanLabel: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.greenLight, marginBottom: 8 },
  scanHeadline: { fontFamily: 'PlusJakartaSans-Light', fontSize: 18, fontWeight: '300', color: colors.textPrimary, lineHeight: 26, marginBottom: 20, maxWidth: 180 },
  scanHeadlineItalic: { fontStyle: 'italic', color: colors.gold },
  scanBtn: { alignSelf: 'flex-start', backgroundColor: colors.green, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
  scanBtnText: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 13, color: colors.textPrimary, letterSpacing: 0.3 },
  impactStrip: { marginBottom: 20 },
  impactStripContent: { paddingHorizontal: 24, gap: 10 },
  impactTile: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 14, padding: 14, minWidth: 110 },
  impactValue: { fontFamily: 'PlusJakartaSans-Light', fontSize: 22, fontWeight: '300', color: colors.textPrimary, letterSpacing: -0.5, lineHeight: 26, marginBottom: 4 },
  impactUnit: { fontSize: 13, color: colors.gold, fontWeight: '500' },
  impactLabel: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, color: colors.greenMuted, lineHeight: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 12 },
  sectionTitle: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 14, color: colors.textPrimary },
  sectionLink: { fontFamily: 'PlusJakartaSans-Light', fontSize: 12, color: colors.greenLight },
  scanList: { paddingHorizontal: 24, gap: 10, marginBottom: 20 },
  scanItem: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.bgElevated, borderRadius: 14, padding: 12 },
  scanThumb: { width: 44, height: 44, borderRadius: 10, backgroundColor: colors.bgScanCard, alignItems: 'center', justifyContent: 'center' },
  scanEmoji: { fontSize: 22 },
  scanInfo: { flex: 1 },
  scanName: { fontFamily: 'PlusJakartaSans-Light', fontSize: 13, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  scanMeta: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, color: colors.greenMuted },
  scanBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 },
  scanBadgeText: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 10, letterSpacing: 0.4 },
  igniterBanner: { marginHorizontal: 24, backgroundColor: colors.goldBg, borderWidth: 1, borderColor: colors.borderGold, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  igniterFlame: { width: 36, height: 36, backgroundColor: '#3D2D10', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  igniterFlameText: { fontSize: 18 },
  igniterText: { flex: 1 },
  igniterTitle: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 12, color: colors.gold, marginBottom: 2 },
  igniterSub: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, color: colors.goldDim, lineHeight: 16 },
});
'@ | Set-Content -Path "screens\HomeScreen.tsx" -Encoding UTF8
Write-Host "screens/HomeScreen.tsx written" -ForegroundColor Cyan

# ─── screens/SearchScreen.tsx ────────────────
@'
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, TextInput,
} from 'react-native';

const colors = {
  bgPrimary: '#0E1A0F', bgCard: '#121E13', bgElevated: '#1A2E1C',
  bgScanCard: '#1A3D1F', borderSubtle: '#1E3020', borderMid: '#243826',
  borderScan: '#2A5030', green: '#2F6B3B', greenLight: '#4A9B5F',
  greenMuted: '#4A6E4D', greenDim: '#3D5C40', gold: '#C8A96E',
  textPrimary: '#F5F3EF', textMuted: '#3D5C40', navBg: '#0A140B',
};

const filters = [
  { id: 'all', label: 'All' }, { id: 'food', label: 'Food & Drink' },
  { id: 'packaging', label: 'Packaging' }, { id: 'household', label: 'Household' },
  { id: 'personal', label: 'Personal Care' }, { id: 'electronics', label: 'Electronics' },
];

const categories = [
  { id: '1', emoji: '🥤', name: 'Food & Drink', count: '2,840 products' },
  { id: '2', emoji: '📦', name: 'Packaging', count: '1,290 materials' },
  { id: '3', emoji: '🏠', name: 'Household', count: '940 products' },
  { id: '4', emoji: '💄', name: 'Personal Care', count: '710 products' },
];

const trending = [
  { id: '1', rank: '01', name: 'Recyclable Paper Cups', sub: 'Food & Drink · 12k scans this week', badge: 'good' as const },
  { id: '2', rank: '02', name: 'Black Plastic Trays', sub: 'Packaging · 9.4k scans this week', badge: 'avoid' as const },
  { id: '3', rank: '03', name: 'Kraft Paper Bags', sub: 'Packaging · 7.1k scans this week', badge: 'good' as const },
  { id: '4', rank: '04', name: 'Polystyrene Foam Cups', sub: 'Food & Drink · 5.8k scans this week', badge: 'estimate' as const },
];

const recentSearches = ['plastic bottle', 'coffee cup', 'aluminum can', 'styrofoam'];

const badgeConfig = {
  good:     { label: '↑ Good',     bg: '#1A3D1F', text: '#4A9B5F', border: '#2A5030' },
  avoid:    { label: '↓ Avoid',    bg: '#2A1515', text: '#E06B6B', border: '#3D1E1E' },
  estimate: { label: '⚠ Estimate', bg: '#2E2410', text: '#C8A96E', border: '#3D3015' },
};

export default function SearchScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Explore <Text style={styles.headerTitleBold}>everything.</Text></Text>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Text style={styles.iconBtnText}>≡</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, materials, brands…"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            selectionColor={colors.greenLight}
          />
          <TouchableOpacity style={styles.scanChip} activeOpacity={0.8}>
            <Text style={styles.scanChipText}>⊡ Scan</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterRowContent}>
          {filters.map((f) => (
            <TouchableOpacity key={f.id} style={[styles.chip, activeFilter === f.id && styles.chipActive]} onPress={() => setActiveFilter(f.id)} activeOpacity={0.7}>
              <Text style={[styles.chipText, activeFilter === f.id && styles.chipTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.recentSection}>
          <Text style={styles.recentLabel}>Recent</Text>
          <View style={styles.recentRow}>
            {recentSearches.map((term, i) => (
              <TouchableOpacity key={i} style={styles.recentChip} activeOpacity={0.7}>
                <Text style={styles.recentChipText}>🕐 {term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            <TouchableOpacity activeOpacity={0.7}><Text style={styles.sectionLink}>All</Text></TouchableOpacity>
          </View>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.75}>
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catName}>{cat.name}</Text>
                <Text style={styles.catCount}>{cat.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity activeOpacity={0.7}><Text style={styles.sectionLink}>See all</Text></TouchableOpacity>
          </View>
          <View style={styles.trendingList}>
            {trending.map((item) => {
              const badge = badgeConfig[item.badge];
              return (
                <TouchableOpacity key={item.id} style={styles.trendingItem} activeOpacity={0.75}>
                  <Text style={styles.trendingRank}>{item.rank}</Text>
                  <View style={styles.trendingInfo}>
                    <Text style={styles.trendingName}>{item.name}</Text>
                    <Text style={styles.trendingSub}>{item.sub}</Text>
                  </View>
                  <View style={[styles.trendingBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                    <Text style={[styles.trendingBadgeText, { color: badge.text }]}>{badge.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgPrimary },
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 4 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontFamily: 'PlusJakartaSans-Light', fontSize: 22, fontWeight: '300', color: colors.textPrimary, letterSpacing: -0.5 },
  headerTitleBold: { fontFamily: 'PlusJakartaSans-SemiBold', fontWeight: '600' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.borderMid, alignItems: 'center', justifyContent: 'center' },
  iconBtnText: { fontSize: 18, color: '#A3C9A8', lineHeight: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12 },
  searchIcon: { fontSize: 18, color: colors.greenMuted },
  searchInput: { flex: 1, fontFamily: 'PlusJakartaSans-Light', fontSize: 14, color: colors.textPrimary, padding: 0 },
  scanChip: { backgroundColor: colors.bgScanCard, borderWidth: 1, borderColor: colors.borderScan, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  scanChipText: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 11, color: colors.greenLight, letterSpacing: 0.5, textTransform: 'uppercase' },
  filterRow: { marginBottom: 4 },
  filterRowContent: { gap: 8, paddingBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.bgCard },
  chipActive: { backgroundColor: colors.bgScanCard, borderColor: colors.borderScan },
  chipText: { fontFamily: 'PlusJakartaSans-Light', fontSize: 12, color: colors.greenMuted },
  chipTextActive: { color: colors.greenLight },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 8 },
  recentSection: { paddingHorizontal: 24, paddingBottom: 8 },
  recentLabel: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, color: colors.greenMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  recentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  recentChip: { backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.bgElevated, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  recentChipText: { fontFamily: 'PlusJakartaSans-Light', fontSize: 12, color: colors.greenMuted },
  section: { paddingHorizontal: 24, paddingTop: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 14, color: colors.textPrimary },
  sectionLink: { fontFamily: 'PlusJakartaSans-Light', fontSize: 12, color: colors.greenLight },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { width: '48%', backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.bgElevated, borderRadius: 14, padding: 16 },
  catEmoji: { fontSize: 24, marginBottom: 10 },
  catName: { fontFamily: 'PlusJakartaSans-Light', fontSize: 13, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  catCount: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, color: colors.greenMuted },
  trendingList: { gap: 8, paddingBottom: 4 },
  trendingItem: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.bgElevated, borderRadius: 12, padding: 12 },
  trendingRank: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 11, color: colors.greenMuted, width: 20 },
  trendingInfo: { flex: 1 },
  trendingName: { fontFamily: 'PlusJakartaSans-Light', fontSize: 13, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  trendingSub: { fontFamily: 'PlusJakartaSans-Light', fontSize: 11, color: colors.greenMuted },
  trendingBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  trendingBadgeText: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 10, letterSpacing: 0.3 },
});
'@ | Set-Content -Path "screens\SearchScreen.tsx" -Encoding UTF8
Write-Host "screens/SearchScreen.tsx written" -ForegroundColor Cyan

# ─── app.json ────────────────────────────────
@'
{
  "expo": {
    "name": "Green Life",
    "slug": "greenlife",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "splash": { "backgroundColor": "#0E1A0F" },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.edelleye.greenlife"
    },
    "android": {
      "adaptiveIcon": { "backgroundColor": "#0E1A0F" },
      "package": "com.edelleye.greenlife"
    }
  }
}
'@ | Set-Content -Path "app.json" -Encoding UTF8
Write-Host "app.json written" -ForegroundColor Cyan

# ─── tsconfig.json ───────────────────────────
@'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
'@ | Set-Content -Path "tsconfig.json" -Encoding UTF8
Write-Host "tsconfig.json written" -ForegroundColor Cyan

# ─── Install dependencies ────────────────────
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npx expo install expo-font @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

Write-Host ""
Write-Host "─────────────────────────────────────────────" -ForegroundColor Green
Write-Host "Green Life setup complete." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Copy font files into assets\fonts\" -ForegroundColor White
Write-Host "     - PlusJakartaSans-Light.ttf" -ForegroundColor Gray
Write-Host "     - PlusJakartaSans-Regular.ttf" -ForegroundColor Gray
Write-Host "     - PlusJakartaSans-Medium.ttf" -ForegroundColor Gray
Write-Host "     - PlusJakartaSans-SemiBold.ttf" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Run the app:" -ForegroundColor White
Write-Host "     npx expo start" -ForegroundColor Yellow
Write-Host ""
Write-Host "  3. Scan the QR code with Expo Go on your phone" -ForegroundColor White
Write-Host "─────────────────────────────────────────────" -ForegroundColor Green
Write-Host ""
