import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "right", "bottom", "left"]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Account</Text>
            <Text style={typography.h1}>Welcome back.</Text>
            <Text style={styles.subhead}>Sign in to keep your shortlist, scanning history, and confidence-backed results in sync.</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onBlur={() => setFocusedField(null)}
                onChangeText={setEmail}
                onFocus={() => setFocusedField("email")}
                placeholder="you@example.com"
                placeholderTextColor={colors.textMuted}
                style={[styles.input, focusedField === "email" ? styles.inputFocused : null]}
                value={email}
              />
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onBlur={() => setFocusedField(null)}
                onChangeText={setPassword}
                onFocus={() => setFocusedField("password")}
                placeholder="••••••••"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                style={[styles.input, focusedField === "password" ? styles.inputFocused : null]}
                value={password}
              />
            </View>

            <Pressable style={styles.forgotWrap}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <PrimaryButton label="Sign In" onPress={() => navigation.replace("MainTabs")} />
            <SecondaryButton label="Create Account" variant="accent" onPress={() => navigation.navigate("Auth")} />
            <SecondaryButton label="Continue as Guest" variant="ghost" onPress={() => navigation.replace("MainTabs")} />
          </View>

          <BrandFooter style={styles.footer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  subhead: {
    ...typography.body,
    color: colors.textMuted,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl,
  },
  fieldWrap: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.primaryStrong,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  input: {
    ...typography.body,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  forgotWrap: {
    alignSelf: "flex-end",
  },
  forgotText: {
    ...typography.bodySmall,
    color: colors.spark,
  },
  footer: {
    marginTop: spacing.sm,
  },
});
