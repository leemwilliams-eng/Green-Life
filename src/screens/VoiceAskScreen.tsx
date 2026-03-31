import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import { Screen } from "@/components/ui/Screen";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { VoicePhase } from "@/hooks/useVoiceChat";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography, withAlpha } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "VoiceAsk">;

function getStatusText(phase: VoicePhase): string {
  switch (phase) {
    case "idle":
      return "Ask a question below";
    case "recording":
      return "Recording...";
    case "transcribing":
      return "Transcribing...";
    case "thinking":
      return "Thinking...";
    case "speaking":
      return "Speaking...";
    case "error":
      return "Something went wrong";
  }
}

const processingPhases: VoicePhase[] = ["transcribing", "thinking", "speaking"];

export function VoiceAskScreen({ route }: Props) {
  const { phase, transcript, response, error, askWithText, startRecording, stopRecording, cancel } = useVoiceChat();
  const [inputText, setInputText] = useState("");

  const isProcessing = processingPhases.includes(phase);
  const itemName = route.params?.itemName;

  function handleSend() {
    if (!inputText.trim() || isProcessing) {
      return;
    }

    askWithText(inputText.trim());
    setInputText("");
  }

  return (
    <Screen>
      <View style={styles.container}>
        <SurfaceCard tone="tint" style={styles.headerCard}>
          <Text style={styles.eyebrow}>Voice assistant</Text>
          <Text style={styles.header}>{itemName ? `Ask about ${itemName}` : "Ask about your items"}</Text>
          <Text style={styles.status}>{getStatusText(phase)}</Text>
        </SurfaceCard>

        <ScrollView style={styles.bubblesArea} contentContainerStyle={styles.bubblesContent} showsVerticalScrollIndicator={false}>
          {transcript !== "" && (
            <View style={styles.userBubble}>
              <Text style={styles.userBubbleText}>{transcript}</Text>
            </View>
          )}
          {response !== "" && (
            <View style={styles.assistantBubble}>
              <Text style={styles.assistantBubbleText}>{response}</Text>
            </View>
          )}
          {error !== "" && phase === "error" && (
            <View style={styles.errorBubble}>
              <Text style={styles.errorBubbleText}>{error}</Text>
            </View>
          )}
          {transcript === "" && response === "" && error === "" && (
            <SurfaceCard style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Ready when you are</Text>
              <Text style={styles.emptyBody}>Use the mic for hands-free questions or type a question below to test the conversation flow.</Text>
            </SurfaceCard>
          )}
        </ScrollView>

        <View style={styles.micRow}>
          {isProcessing ? (
            <Pressable style={({ pressed }) => [styles.cancelButton, pressed ? styles.buttonPressed : null]} onPress={cancel}>
              <Feather name="x" size={24} color={colors.text} />
            </Pressable>
          ) : phase === "recording" ? (
            <Pressable style={({ pressed }) => [styles.micButtonActive, pressed ? styles.buttonPressed : null]} onPress={stopRecording}>
              <Feather name="square" size={24} color={colors.text} />
            </Pressable>
          ) : (
            <Pressable style={({ pressed }) => [styles.micButtonIdle, pressed ? styles.buttonPressed : null]} onPress={startRecording}>
              <Feather name="mic" size={24} color={colors.text} />
            </Pressable>
          )}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Or type your question..."
            placeholderTextColor={colors.textMuted}
            editable={!isProcessing}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              (!inputText.trim() || isProcessing) ? styles.sendButtonDisabled : null,
              pressed && inputText.trim() && !isProcessing ? styles.buttonPressed : null
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() || isProcessing}
          >
            <Feather name="send" size={20} color={colors.text} />
          </Pressable>
        </View>

        <BrandFooter style={styles.footer} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md
  },
  headerCard: {
    gap: spacing.xs
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  header: {
    ...typography.h2
  },
  status: {
    ...typography.caption
  },
  bubblesArea: {
    flex: 1
  },
  bubblesContent: {
    flexGrow: 1,
    gap: spacing.md,
    justifyContent: "flex-end",
    paddingBottom: spacing.md
  },
  emptyCard: {
    gap: spacing.sm
  },
  emptyTitle: {
    ...typography.title
  },
  emptyBody: {
    ...typography.bodySmall
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.xl,
    maxWidth: "80%",
    padding: spacing.md
  },
  userBubbleText: {
    ...typography.body,
    color: colors.textMuted
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    maxWidth: "80%",
    padding: spacing.md
  },
  assistantBubbleText: {
    ...typography.body
  },
  errorBubble: {
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderColor: colors.danger,
    borderRadius: radius.lg,
    borderWidth: 1,
    maxWidth: "90%",
    padding: spacing.md
  },
  errorBubbleText: {
    ...typography.bodySmall,
    color: colors.danger
  },
  micRow: {
    alignItems: "center",
    paddingVertical: spacing.md
  },
  micButtonIdle: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 64,
    justifyContent: "center",
    width: 64
  },
  micButtonActive: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    height: 64,
    justifyContent: "center",
    width: 64
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  buttonPressed: {
    opacity: 0.82
  },
  inputRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm
  },
  textInput: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    color: colors.text,
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  sendButtonDisabled: {
    backgroundColor: withAlpha(colors.primary, 0.4)
  },
  footer: {
    marginBottom: spacing.md
  }
});
