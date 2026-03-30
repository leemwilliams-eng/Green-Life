import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://10.0.2.2:4000/api/v1';

type SettingItem = {
  icon: string;
  label: string;
};

const SETTINGS: SettingItem[] = [
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'shield-checkmark-outline', label: 'Privacy' },
  { icon: 'leaf-outline', label: 'About Green Life' },
  { icon: 'help-circle-outline', label: 'Help & Feedback' },
];

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [scanCount, setScanCount] = useState<number | null>(null);
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [profileRes, historyRes, savedRes] = await Promise.all([
        fetch(`${API_BASE}/me/profile`),
        fetch(`${API_BASE}/me/history`),
        fetch(`${API_BASE}/me/saved-items`),
      ]);
      const profileJson = await profileRes.json();
      const historyJson = await historyRes.json();
      const savedJson = await savedRes.json();

      setEmail(profileJson.data?.email ?? '');
      setScanCount(historyJson.data?.history?.length ?? 0);
      setSavedCount(savedJson.data?.items?.length ?? 0);
    } catch {
      // leave defaults
    } finally {
      setLoading(false);
    }
  };

  const displayName = email
    ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    : 'Igniter';
  const handle = email ? `@${email.split('@')[0]}` : '@greenlife';

  const stats = [
    { label: 'Scans', value: scanCount !== null ? String(scanCount) : '—' },
    { label: 'Products', value: savedCount !== null ? String(savedCount) : '—' },
    { label: 'Impact', value: '—' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A140B" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            {loading
              ? <ActivityIndicator color="#4A9B5F" />
              : <Text style={styles.avatarInitial}>
                  {displayName.charAt(0).toUpperCase()}
                </Text>
            }
          </View>
          <Text style={styles.name}>{loading ? '…' : displayName}</Text>
          <Text style={styles.handle}>{loading ? '' : handle}</Text>

          {/* Igniter Badge */}
          <View style={styles.igniteBadge}>
            <Ionicons name="flame-outline" size={11} color="#C8A96E" />
            <Text style={styles.igniteText}>Igniter</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View
              key={stat.label}
              style={[
                styles.statItem,
                i < stats.length - 1 && styles.statDivider,
              ]}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          {SETTINGS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.settingRow,
                i < SETTINGS.length - 1 && styles.settingBorder,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.settingIconWrap}>
                <Ionicons name={item.icon as any} size={18} color="#4A9B5F" />
              </View>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward-outline" size={15} color="#4A6E4D" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={17} color="#C8A96E" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Green Life v0.1 — Igniter Build</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A0F',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scroll: {
    padding: 24,
    paddingBottom: 56,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingTop: 24,
    marginBottom: 28,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#121E13',
    borderWidth: 2,
    borderColor: '#2F6B3B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarInitial: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 32,
    color: '#4A9B5F',
  },
  name: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 20,
    color: '#F5F3EF',
    marginBottom: 4,
  },
  handle: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#4A6E4D',
    marginBottom: 12,
  },
  igniteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2E1C',
    borderWidth: 1,
    borderColor: '#C8A96E',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  igniteText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#C8A96E',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#121E13',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A2E1C',
    marginBottom: 32,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: '#1A2E1C',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 22,
    color: '#4A9B5F',
    marginBottom: 5,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    color: '#4A6E4D',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Settings
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#4A6E4D',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  settingsList: {
    backgroundColor: '#121E13',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1A2E1C',
    marginBottom: 20,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1A2E1C',
  },
  settingIconWrap: {
    width: 28,
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: '#F5F3EF',
  },

  // Sign Out
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2F6B3B',
    marginBottom: 36,
  },
  signOutText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: '#C8A96E',
  },

  // Version
  version: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 11,
    color: '#4A6E4D',
    textAlign: 'center',
  },
});
