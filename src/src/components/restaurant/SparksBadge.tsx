// src/components/restaurant/SparksBadge.tsx
// Green Life — Sparks badge + animated award toast
// "Every Spark starts a fire." 🔥
// Uses colors.spark (#F59E0B amber gold) from the existing theme.

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors } from "@/theme/colors";
import { useSparkTotal } from "@/hooks/useSparks";

// ── SparksBadge ───────────────────────────────────────────────────────────────
/**
 * Persistent badge for the Home screen showing the running Sparks total.
 * Reads directly from Zustand — no loading state, always instant.
 *
 * Usage: <SparksBadge />
 */
export function SparksBadge({ total: totalProp }: { total?: number }) {
  const storeTotal = useSparkTotal();
  const total = totalProp ?? storeTotal;

  return (
    <View style={badge.container}>
      <Text style={badge.flame}>🔥</Text>
      <Text style={badge.count}>{total}</Text>
      <Text style={badge.label}>Sparks</Text>
    </View>
  );
}

const badge = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.spark + "22",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  flame:  { fontSize: 16 },
  count:  { fontSize: 16, fontWeight: "800", color: colors.spark },
  label:  { fontSize: 13, fontWeight: "600", color: colors.spark },
});

// ── SparksToast ───────────────────────────────────────────────────────────────
/**
 * Animated toast that slides in after a successful scan.
 * Auto-dismisses after 2.5 seconds.
 *
 * Usage in PhotoCaptureScreen or CandidateResultsScreen:
 *   const { data } = useFoodPhotoScan();
 *   const sparks = data?.meta?.sparks;
 *
 *   <SparksToast
 *     awarded={sparks?.awarded ?? 0}
 *     newTotal={sparks?.newTotal ?? 0}
 *     isFirstScan={sparks?.isFirstScan ?? false}
 *     visible={showToast}
 *     onHide={() => setShowToast(false)}
 *   />
 */
interface SparksToastProps {
  awarded: number;
  newTotal: number;
  isFirstScan: boolean;
  visible: boolean;
  onHide: () => void;
}

export function SparksToast({ awarded, newTotal, isFirstScan, visible, onHide }: SparksToastProps) {
  const slideAnim = useRef(new Animated.Value(-120)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -120, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim,  { toValue: 0,    duration: 300, useNativeDriver: true }),
      ]).start(onHide);
    }, 2500);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[toast.container, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
      <View style={toast.inner}>
        <Text style={toast.flame}>🔥</Text>
        <View style={toast.text}>
          <Text style={toast.awarded}>+{awarded} Spark{awarded !== 1 ? "s" : ""}</Text>
          {isFirstScan
            ? <Text style={toast.sub}>🎉 First scan bonus! Every Spark starts a fire.</Text>
            : <Text style={toast.sub}>{newTotal} total Sparks</Text>
          }
        </View>
      </View>
    </Animated.View>
  );
}

const toast = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  inner: {
    backgroundColor: colors.spark,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  flame:   { fontSize: 28 },
  text:    { flex: 1 },
  awarded: { fontSize: 20, fontWeight: "800", color: colors.bg },
  sub:     { fontSize: 13, color: colors.bg + "CC", marginTop: 2 },
});
