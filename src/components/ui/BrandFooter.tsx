import { Image, StyleSheet, Text, View, type ViewStyle } from "react-native";

import { colors, spacing } from "@/theme";

interface BrandFooterProps {
  style?: ViewStyle;
}

export function BrandFooter({ style }: BrandFooterProps) {
  return (
    <View style={[styles.container, style]}>
      <Image source={require("../../../assets/Green_Life_Trans.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.label}>GREEN LIFE</Text>
      <Text style={styles.tagline}>Have knowledge. Pay attention.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.xs
  },
  logo: {
    height: 48,
    width: 48
  },
  label: {
    fontFamily: "PlusJakartaSans-Bold",
    color: colors.primary,
    fontSize: 14,
    letterSpacing: 4,
    lineHeight: 20
  },
  tagline: {
    fontFamily: "PlusJakartaSans-Medium",
    color: "#004D77CC",
    fontSize: 11,
    fontStyle: "italic",
    letterSpacing: 0.2,
    lineHeight: 16
  }
});
