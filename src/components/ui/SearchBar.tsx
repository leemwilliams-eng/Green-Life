import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

interface SearchBarProps {
  value: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  onMicPress?: () => void;
}

export function SearchBar({ value, onChangeText, placeholder = "Search products, brands, materials", onMicPress }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, onMicPress ? styles.inputWithMic : undefined]}
        value={value}
        onChangeText={onChangeText}
      />
      {onMicPress && (
        <Pressable style={styles.micButton} onPress={onMicPress} hitSlop={8}>
          <Feather name="mic" size={20} color={colors.primary} />
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
    paddingHorizontal: spacing.lg
  },
  input: {
    ...typography.body,
    flex: 1,
    minHeight: 48
  },
  inputWithMic: {
    paddingRight: spacing.sm
  },
  micButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: spacing.sm
  }
});
