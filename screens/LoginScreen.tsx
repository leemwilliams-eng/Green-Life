import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSignIn = () => {
    // TODO: real auth — placeholder routes to app
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0E1A0F" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Block */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            <Text style={styles.logoWhite}>GREEN</Text>
            <Text style={styles.logoSpacer}> </Text>
            <Text style={styles.logoGreen}>LIFE</Text>
          </Text>
          <View style={styles.logoUnderline} />

          {/* All 3 mottos, white */}
          <View style={styles.mottoWrap}>
            <Text style={styles.motto}>Be present.</Text>
            <Text style={styles.motto}>Have knowledge.</Text>
            <Text style={styles.motto}>Pay attention.</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, focused === 'email' && styles.inputFocused]}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="you@example.com"
            placeholderTextColor="#4A6E4D"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
          <TextInput
            style={[styles.input, focused === 'password' && styles.inputFocused]}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused(null)}
            placeholder="••••••••"
            placeholderTextColor="#4A6E4D"
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Point your phone at the world.{'\n'}We'll tell you what you're looking at.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A0F',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 16 : 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 26,
    marginBottom: 8,
  },
  logoWhite: {
    color: '#F5F3EF',
    letterSpacing: 6,
  },
  logoSpacer: {
    letterSpacing: 6,
  },
  logoGreen: {
    color: '#4A9B5F',
    letterSpacing: 6,
  },
  logoUnderline: {
    width: 36,
    height: 1,
    backgroundColor: '#C8A96E',
    marginBottom: 16,
  },
  mottoWrap: {
    alignItems: 'center',
    gap: 5,
  },
  motto: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#F5F3EF',
    letterSpacing: 0.3,
  },
  form: {
    marginBottom: 40,
  },
  label: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 11,
    color: '#4A9B5F',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#121E13',
    borderWidth: 1,
    borderColor: '#2F6B3B',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F5F3EF',
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
  },
  inputFocused: {
    borderColor: '#4A9B5F',
    backgroundColor: '#141F15',
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 32,
    paddingVertical: 4,
  },
  forgot: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#C8A96E',
  },
  primaryButton: {
    backgroundColor: '#2F6B3B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 15,
    color: '#F5F3EF',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2F6B3B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: '#4A9B5F',
    letterSpacing: 0.5,
  },
  footer: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#4A6E4D',
    textAlign: 'center',
    lineHeight: 20,
  },
});
