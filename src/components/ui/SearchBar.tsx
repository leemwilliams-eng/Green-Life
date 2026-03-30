import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { colors, radius, spacing, typography, withAlpha } from "@/theme";

interface SearchBarProps {
  value: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  onMicPress?: () => void;
}

export function SearchBar({ value, onChangeText, placeholder = "Search products, brands, materials", onMicPress }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leadingIconWrap}>
        <Feather name="search" size={18} color={colors.textMuted} />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, onMicPress ? styles.inputWithMic : undefined]}
        value={value}
        onChangeText={onChangeText}
      />
      {onMicPress && (
        <Pressable style={({ pressed }) => [styles.micButton, pressed ? styles.micButtonPressed : null]} onPress={onMicPress} hitSlop={8}>
          <Feather name="mic" size={18} color={colors.spark} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
  },
  leadingIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: spacing.sm,
  },
  input: {
    ...typography.body,
    flex: 1,
    minHeight: 48,
  },
  inputWithMic: {
    paddingRight: spacing.sm,
  },
  micButton: {
    alignItems: "center",
    backgroundColor: withAlpha(colors.spark, 0.12),
    borderColor: withAlpha(colors.spark, 0.3),
    borderRadius: radius.pill,
    borderWidth: 1,
    height: 32,
    justifyContent: "center",
    marginLeft: spacing.xs,
    width: 32,
  },
  micButtonPressed: {
    backgroundColor: withAlpha(colors.spark, 0.18),
  },
});
