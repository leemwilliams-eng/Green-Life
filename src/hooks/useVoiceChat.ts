import { useCallback, useRef, useState } from "react";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";

import { askClaude } from "@/api/claude";
import { getHistory } from "@/api/user";
import { transcribeAudio } from "@/api/whisper";

export type VoicePhase = "idle" | "recording" | "transcribing" | "thinking" | "speaking" | "error";

export function useVoiceChat() {
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string>("");
  const recordingRef = useRef<Audio.Recording | null>(null);

  const askWithText = useCallback(async (text: string) => {
    if (!text.trim()) return;
    try {
      setTranscript(text);
      setPhase("thinking");

      const historyResult = await getHistory().catch(() => null);
      const items = historyResult?.data?.history?.map((h) => h.item.name).join(", ") ?? "no items";
      const answer = await askClaude(text, items);
      setResponse(answer);

      setPhase("speaking");
      Speech.speak(answer, {
        onDone: () => setPhase("idle"),
        onError: () => setPhase("idle"),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPhase("error");
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setPhase("recording");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start recording");
      setPhase("error");
    }
  }, []);

  const stopRecording = useCallback(async () => {
    const recording = recordingRef.current;
    if (!recording) return;

    try {
      setPhase("transcribing");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      recordingRef.current = null;

      if (!uri) throw new Error("No audio recorded");

      const text = await transcribeAudio(uri);
      await askWithText(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setPhase("error");
    }
  }, [askWithText]);

  const cancel = useCallback(async () => {
    const recording = recordingRef.current;
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
      } catch {
        // ignore cleanup errors
      }
      recordingRef.current = null;
    }
    Speech.stop();
    setPhase("idle");
  }, []);

  return { phase, transcript, response, error, askWithText, startRecording, stopRecording, cancel };
}
