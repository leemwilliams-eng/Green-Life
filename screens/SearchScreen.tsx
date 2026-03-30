import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, TextInput, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  bgPrimary: '#0E1A0F', bgCard: '#121E13', bgElevated: '#1A2E1C',
  bgScanCard: '#1A3D1F', borderSubtle: '#1E3020', borderMid: '#243826',
  borderScan: '#2A5030', green: '#2F6B3B', greenLight: '#4A9B5F',
  greenMuted: '#4A6E4D', greenDim: '#3D5C40', gold: '#C8A96E',
  textPrimary: '#F5F3EF', textMuted: '#3D5C40',
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

export default function SearchScreen({ navigation }: { navigation: any }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bgPrimary} />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Explore <Text style={styles.headerTitleBold}>everything.</Text></Text>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="options-outline" size={18} color="#A3C9A8" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={colors.greenMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, materials, brands…"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
            selectionColor={colors.greenLight}
          />
          <TouchableOpacity style={styles.scanChip} activeOpacity={0.8}>
            <Ionicons name="scan-outline" size={12} color={colors.greenLight} />
            <Text style={styles.scanChipText}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.micChip} onPress={() => navigation.navigate('VoiceAsk')} activeOpacity={0.8}>
            <Ionicons name="mic-outline" size={14} color={colors.gold} />
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
                <Ionicons name="time-outline" size={12} color={colors.greenMuted} />
                <Text style={styles.recentChipText}>{term}</Text>
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
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 4 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontFamily: 'PlusJakartaSans-Light', fontSize: 22, fontWeight: '300', color: colors.textPrimary, letterSpacing: -0.5 },
  headerTitleBold: { fontFamily: 'PlusJakartaSans-SemiBold', fontWeight: '600' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bgElevated, borderWidth: 1, borderColor: colors.borderMid, alignItems: 'center', justifyContent: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12 },
  searchInput: { flex: 1, fontFamily: 'PlusJakartaSans-Light', fontSize: 14, color: colors.textPrimary, padding: 0 },
  scanChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.bgScanCard, borderWidth: 1, borderColor: colors.borderScan, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  scanChipText: { fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 11, color: colors.greenLight, letterSpacing: 0.5, textTransform: 'uppercase' },
  micChip: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2E2410', borderWidth: 1, borderColor: '#3D3015', alignItems: 'center', justifyContent: 'center' },
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
  recentChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.bgCard, borderWidth: 1, borderColor: colors.bgElevated, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
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
