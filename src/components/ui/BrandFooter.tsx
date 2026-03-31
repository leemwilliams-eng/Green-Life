import { Image, StyleSheet, Text, View, type ViewStyle } from "react-native";

import { colors, spacing, withAlpha } from "@/theme";

interface BrandFooterProps {
  style?: ViewStyle;
}

export function BrandFooter({ style }: BrandFooterProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../../assets/Green_Life_Trans.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.label}>GREEN <Text style={styles.labelWhite}>LIFE</Text></Text>
      <Text style={styles.tagline}>Be present. <Text style={styles.taglineWhite}>Have knowledge.</Text> Pay attention.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.xs,
  },
  logo: {
    height: 48,
    width: 48,
  },
  label: {
    fontFamily: "PlusJakartaSans-SemiBold",
    color: colors.primary,
    fontSize: 14,
    letterSpacing: 4,
    lineHeight: 20,
  },
  tagline: {
    fontFamily: "PlusJakartaSans-Regular",
    color: withAlpha(colors.primary, 0.8),
    fontSize: 11,
    fontStyle: "italic",
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  labelWhite: {
    color: colors.text,
  },
  taglineWhite: {
    color: colors.text,
  },
});
