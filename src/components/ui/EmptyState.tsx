import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl
  },
  title: {
    ...typography.title,
    textAlign: "center"
  },
  message: {
    ...typography.bodySmall,
    textAlign: "center"
  }
});
