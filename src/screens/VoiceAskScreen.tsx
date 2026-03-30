import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "@/components/ui/Screen";
import type { VoicePhase } from "@/hooks/useVoiceChat";
import { useVoiceChat } from "@/hooks/useVoiceChat";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "VoiceAsk">;

function getStatusText(phase: VoicePhase): string {
  switch (phase) {
    case "idle": return "Ask a question below";
    case "recording": return "Recording...";
    case "transcribing": return "Transcribing...";
    case "thinking": return "Thinking...";
    case "speaking": return "Speaking...";
    case "error": return "Something went wrong";
  }
}

const processingPhases: VoicePhase[] = ["transcribing", "thinking", "speaking"];

export function VoiceAskScreen({ route }: Props) {
  const { phase, transcript, response, error, askWithText, startRecording, stopRecording, cancel } = useVoiceChat();
  const [inputText, setInputText] = useState("");

  const isProcessing = processingPhases.includes(phase);
  const itemName = route.params?.itemName;

  function handleSend() {
    if (!inputText.trim() || isProcessing) return;
    askWithText(inputText.trim());
    setInputText("");
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.header}>{itemName ? `Ask about ${itemName}` : "Ask about your items"}</Text>
        <Text style={styles.status}>{getStatusText(phase)}</Text>

        <ScrollView style={styles.bubblesArea} contentContainerStyle={styles.bubblesContent} showsVerticalScrollIndicator={false}>
          {transcript !== "" && (
            <View style={styles.userBubble}>
              <Text style={styles.userBubbleText}>{transcript}</Text>
            </View>
          )}
          {response !== "" && (
            <View style={styles.claudeBubble}>
              <Text style={styles.claudeBubbleText}>{response}</Text>
            </View>
          )}
          {error !== "" && phase === "error" && (
            <View style={styles.errorBubble}>
              <Text style={styles.errorBubbleText}>{error}</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.micRow}>
          {isProcessing ? (
            <Pressable style={styles.cancelButton} onPress={cancel}>
              <Feather name="x" size={24} color={colors.text} />
            </Pressable>
          ) : phase === "recording" ? (
            <Pressable style={styles.micButtonActive} onPress={stopRecording}>
              <Feather name="square" size={24} color={colors.text} />
            </Pressable>
          ) : (
            <Pressable style={styles.micButtonIdle} onPress={startRecording}>
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
          <Pressable style={styles.sendButton} onPress={handleSend} disabled={!inputText.trim() || isProcessing}>
            <Feather name="send" size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md,
  },
  header: {
    ...typography.h2,
  },
  status: {
    ...typography.caption,
  },
  bubblesArea: {
    flex: 1,
  },
  bubblesContent: {
    gap: spacing.md,
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: spacing.md,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.xl,
    maxWidth: "80%",
    padding: spacing.md,
  },
  userBubbleText: {
    ...typography.body,
    color: colors.textMuted,
  },
  claudeBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    maxWidth: "80%",
    padding: spacing.md,
  },
  claudeBubbleText: {
    ...typography.body,
  },
  errorBubble: {
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderColor: colors.danger,
    borderRadius: radius.lg,
    borderWidth: 1,
    maxWidth: "90%",
    padding: spacing.md,
  },
  errorBubbleText: {
    ...typography.bodySmall,
    color: colors.danger,
  },
  micRow: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  micButtonIdle: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  micButtonActive: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  textInput: {
    flex: 1,
    ...typography.body,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  cancelButton: {
    alignItems: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
});
