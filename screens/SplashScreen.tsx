import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function SplashScreen({ navigation }: Props) {
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(24)).current;
  const mottoOpacity   = useRef(new Animated.Value(0)).current;
  const quoteOpacity   = useRef(new Animated.Value(0)).current;
  const tapOpacity     = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in sequence, then pulse the tap prompt — never auto-advance
    Animated.sequence([
      // 1. Logo rises in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 900, useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0, duration: 900, useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      // 2. Mottos fade in
      Animated.timing(mottoOpacity, {
        toValue: 1, duration: 700, useNativeDriver: true,
      }),
      Animated.delay(400),
      // 3. Quote fades in
      Animated.timing(quoteOpacity, {
        toValue: 1, duration: 700, useNativeDriver: true,
      }),
      Animated.delay(500),
      // 4. Tap prompt appears
      Animated.timing(tapOpacity, {
        toValue: 1, duration: 600, useNativeDriver: true,
      }),
    ]).start(() => {
      // Gentle pulse on the tap prompt after it appears
      Animated.loop(
        Animated.sequence([
          Animated.timing(tapOpacity, { toValue: 0.35, duration: 900, useNativeDriver: true }),
          Animated.timing(tapOpacity, { toValue: 1,    duration: 900, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const handleTap = () => {
    tapOpacity.stopAnimation();
    Animated.timing(logoOpacity, {
      toValue: 0, duration: 400, useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login');
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0E1A0F" />

        {/* Logo + mottos */}
        <Animated.View style={[styles.content, { opacity: logoOpacity, transform: [{ translateY: logoTranslateY }] }]}>
          <View style={styles.logoWrap}>
            <Text style={styles.logo}>
              <Text style={styles.logoWhite}>GREEN</Text>
              <Text style={styles.logoSpacer}> </Text>
              <Text style={styles.logoGreen}>LIFE</Text>
            </Text>
            <View style={styles.logoUnderline} />
          </View>

          <Animated.View style={[styles.mottoWrap, { opacity: mottoOpacity }]}>
            <Text style={styles.motto}>Be present.</Text>
            <Text style={styles.motto}>Have knowledge.</Text>
            <Text style={styles.motto}>Pay attention.</Text>
          </Animated.View>
        </Animated.View>

        {/* Founder quote */}
        <Animated.View style={[styles.quoteWrap, { opacity: quoteOpacity }]}>
          <Text style={styles.quote}>
            "If everyone knew the real impact of what they were doing,{'\n'}
            they would make different choices."
          </Text>
          <Text style={styles.attribution}>— Lee Williams</Text>
        </Animated.View>

        {/* Tap to continue */}
        <Animated.View style={[styles.tapWrap, { opacity: tapOpacity }]}>
          <Text style={styles.tapText}>Tap to continue</Text>
        </Animated.View>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1A0F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  content: {
    alignItems: 'center',
    marginBottom: 56,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 30,
    marginBottom: 10,
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
    width: 40,
    height: 1,
    backgroundColor: '#C8A96E',
  },
  mottoWrap: {
    alignItems: 'center',
    marginTop: 18,
    gap: 6,
  },
  motto: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 14,
    color: '#F5F3EF',
    letterSpacing: 0.4,
  },
  quoteWrap: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 48,
  },
  quote: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#4A6E4D',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  attribution: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#C8A96E',
    letterSpacing: 0.5,
  },
  tapWrap: {
    position: 'absolute',
    bottom: 52,
    alignItems: 'center',
  },
  tapText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#4A6E4D',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
