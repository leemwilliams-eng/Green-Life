import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "@/theme";

interface ScreenProps extends PropsWithChildren {
  includeBottomInset?: boolean;
}

export function Screen({ children, includeBottomInset = true }: ScreenProps) {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={includeBottomInset ? ["top", "right", "bottom", "left"] : ["top", "right", "left"]}
    >
      <View style={[styles.content, includeBottomInset ? styles.contentWithBottomInset : styles.contentNoBottomInset]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg
  },
  contentNoBottomInset: {
    paddingBottom: 0
  },
  contentWithBottomInset: {
    paddingBottom: spacing.lg
  }
});
