import { useMutation } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { lookupImage } from "@/api/lookup";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PhotoCapture">;

export function PhotoCaptureScreen({ navigation }: Props) {
  const imageMutation = useMutation({
    mutationFn: () => lookupImage("mock://camera/capture.jpg"),
    onSuccess: (data) => {
      navigation.replace("CandidateResults", { candidates: data.data.candidates });
    },
    onError: () => {
      navigation.replace("NoMatch", { lookupType: "image", queryValue: "camera-capture" });
    }
  });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.previewCard}>
          <Text style={styles.eyebrow}>Photo input</Text>
          <View style={styles.preview}>
            <Text style={styles.previewText}>Capture area</Text>
          </View>
          <Text style={styles.helper}>Use this to test the object or label flow before camera upload is connected.</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Try the image flow</Text>
          <PrimaryButton label={imageMutation.isPending ? "Analyzing..." : "Use sample photo"} onPress={() => imageMutation.mutate()} />
          <SecondaryButton label="Simulate no match" onPress={() => navigation.replace("NoMatch", { lookupType: "image", queryValue: "sample-photo" })} />
        </View>

        {imageMutation.isPending && <LoadingState />}
        {imageMutation.isError && <ErrorState message="Image lookup failed. The no-match recovery screen is ready for this path too." />}
        {!imageMutation.isPending && !imageMutation.isError && (
          <EmptyState title="Photo flow ready" message="Run the sample image lookup to jump into candidate selection." />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxxl
  },
  previewCard: {
    backgroundColor: colors.surfaceTint,
    borderRadius: radius.xl,
    gap: spacing.md,
    padding: spacing.xl
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  preview: {
    alignItems: "center",
    backgroundColor: colors.text,
    borderRadius: radius.xl,
    height: 260,
    justifyContent: "center"
  },
  previewText: {
    ...typography.title,
    color: colors.surface
  },
  helper: {
    ...typography.bodySmall
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl
  },
  sectionTitle: {
    ...typography.title
  }
});
