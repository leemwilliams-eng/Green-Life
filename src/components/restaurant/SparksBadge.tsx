import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { colors, typography, withAlpha } from "@/theme";
import { useSparkTotal } from "@/hooks/useSparks";

export function SparksBadge({ total: totalProp }: { total?: number }) {
  const storeTotal = useSparkTotal();
  const total = totalProp ?? storeTotal;

  return (
    <View style={badge.container}>
      <Text style={badge.mark}>S</Text>
      <Text style={badge.count}>{total}</Text>
      <Text style={badge.label}>Sparks</Text>
    </View>
  );
}

const badge = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: withAlpha(colors.spark, 0.12),
    borderColor: withAlpha(colors.spark, 0.28),
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  mark: {
    ...typography.caption,
    color: colors.spark,
  },
  count: {
    ...typography.label,
    color: colors.spark,
  },
  label: {
    ...typography.caption,
    color: colors.spark,
  },
});

interface SparksToastProps {
  awarded: number;
  newTotal: number;
  isFirstScan: boolean;
  visible: boolean;
  onHide: () => void;
}

export function SparksToast({ awarded, newTotal, isFirstScan, visible, onHide }: SparksToastProps) {
  const slideAnim = useRef(new Animated.Value(-120)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: -120, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(onHide);
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, onHide, slideAnim, visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[toast.container, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
      <View style={toast.inner}>
        <View style={toast.iconWrap}>
          <Text style={toast.icon}>S</Text>
        </View>
        <View style={toast.text}>
          <Text style={toast.awarded}>+{awarded} Spark{awarded !== 1 ? "s" : ""}</Text>
          {isFirstScan ? (
            <Text style={toast.sub}>First scan bonus. Every spark starts a fire.</Text>
          ) : (
            <Text style={toast.sub}>{newTotal} total Sparks</Text>
          )}
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
  iconWrap: {
    alignItems: "center",
    backgroundColor: withAlpha(colors.bg, 0.12),
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  icon: {
    ...typography.label,
    color: colors.bg,
  },
  text: {
    flex: 1,
  },
  awarded: {
    ...typography.title,
    color: colors.bg,
  },
  sub: {
    ...typography.caption,
    color: withAlpha(colors.bg, 0.8),
    marginTop: 2,
  },
});
