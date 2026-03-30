import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, SafeAreaView, StatusBar, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ANTHROPIC_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY ?? '';

const colors = {
  bg: '#0E1A0F',
  card: '#121E13',
  elevated: '#1A2E1C',
  border: '#1A2E1C',
  borderMid: '#243826',
  green: '#2F6B3B',
  greenLight: '#4A9B5F',
  greenMuted: '#4A6E4D',
  text: '#F5F3EF',
};

type Phase = 'idle' | 'thinking' | 'speaking' | 'error';
type Message = { role: 'user' | 'assistant'; text: string };

async function askClaude(history: Message[]): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system:
        'You are a helpful sustainability assistant for the Green Life app. Answer questions about product carbon footprints, recyclability, disposal, and greener alternatives. Be concise — 2 to 3 sentences.',
      messages: history.map(m => ({ role: m.role, content: m.text })),
    }),
  });
  if (!res.ok) throw new Error(`Claude ${res.status}`);
  const data = await res.json();
  return data.content[0].text as string;
}

type Props = {
  navigation: any;
  route?: { params?: { itemName?: string } };
};

export default function VoiceAskScreen({ navigation, route }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const insets = useSafeAreaInsets();
  const itemName = route?.params?.itemName;
  const isProcessing = phase === 'thinking' || phase === 'speaking';

  const sendText = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInputText('');
    setErrorMsg('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    try {
      setPhase('thinking');
      const reply = await askClaude(history);
      const updated = [...history, { role: 'assistant' as const, text: reply }];
      setMessages(updated);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

      setPhase('speaking');
      Speech.speak(reply, {
        onDone: () => setPhase('idle'),
        onError: () => setPhase('idle'),
      });
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setPhase('error');
    }
  }, [messages, isProcessing]);

  const stopSpeaking = useCallback(() => {
    Speech.stop();
    setPhase('idle');
  }, []);

  const statusLabel: Record<Phase, string> = {
    idle: 'Type a question below',
    thinking: 'Thinking…',
    speaking: 'Speaking — tap to stop',
    error: errorMsg || 'Something went wrong',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0A140B" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color={colors.greenLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {itemName ? `Ask about ${itemName}` : 'Ask Green Life'}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 && (
          <View style={styles.hint}>
            <Ionicons name="leaf-outline" size={32} color={colors.greenMuted} style={{ marginBottom: 12 }} />
            <Text style={styles.hintText}>
              {itemName
                ? `Ask about the environmental impact of ${itemName} — carbon, disposal, alternatives.`
                : "Ask about any product, food, or material.\nWhat's its carbon footprint? How do I dispose of it?"}
            </Text>
          </View>
        )}
        {messages.map((msg, i) => (
          <View key={i} style={msg.role === 'user' ? styles.userBubble : styles.assistantBubble}>
            <Text style={msg.role === 'user' ? styles.userText : styles.assistantText}>{msg.text}</Text>
          </View>
        ))}
        {phase === 'thinking' && (
          <View style={[styles.assistantBubble, { padding: 14 }]}>
            <ActivityIndicator size="small" color={colors.greenLight} />
          </View>
        )}
      </ScrollView>

      <Text style={[styles.status, phase === 'error' && { color: '#E05C5C' }]}>
        {statusLabel[phase]}
      </Text>

      {phase === 'speaking' && (
        <TouchableOpacity style={styles.stopSpeakingBtn} onPress={stopSpeaking} activeOpacity={0.8}>
          <Ionicons name="stop-circle-outline" size={20} color={colors.greenLight} />
          <Text style={styles.stopSpeakingText}>Stop</Text>
        </TouchableOpacity>
      )}

      <View style={[styles.textRow, { paddingBottom: insets.bottom + 16 }]}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask a question…"
          placeholderTextColor={colors.greenMuted}
          editable={!isProcessing}
          onSubmitEditing={() => sendText(inputText)}
          returnKeyType="send"
          multiline={false}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!inputText.trim() || isProcessing) && { opacity: 0.35 }]}
          onPress={() => sendText(inputText)}
          activeOpacity={0.8}
          disabled={!inputText.trim() || isProcessing}
        >
          <Ionicons name="send" size={18} color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0A140B',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: colors.text,
    letterSpacing: 0.3,
    flex: 1,
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    gap: 10,
    justifyContent: 'flex-end',
  },
  hint: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 28 },
  hintText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 14,
    color: colors.greenMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.borderMid,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    maxWidth: '80%',
    padding: 12,
  },
  userText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: colors.text,
    lineHeight: 21,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#0E1F10',
    borderWidth: 1,
    borderColor: '#2A5030',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: '85%',
    padding: 12,
  },
  assistantText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  status: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: colors.greenMuted,
    textAlign: 'center',
    letterSpacing: 0.4,
    paddingVertical: 6,
  },
  stopSpeakingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  stopSpeakingText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 13,
    color: colors.greenLight,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  textInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
