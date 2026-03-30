import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ScanScreen from '../screens/ScanScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ResultScreen from '../screens/ResultScreen';
import CommunityScreen from '../screens/CommunityScreen';
import VoiceAskScreen from '../screens/VoiceAskScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A140B',
          borderTopColor: '#1A2E1C',
          borderTopWidth: 1,
          height: 54 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#4A9B5F',
        tabBarInactiveTintColor: '#4A6E4D',
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans-Regular',
          fontSize: 10,
          letterSpacing: 0.3,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<string, { active: string; inactive: string }> = {
            Home:      { active: 'home',      inactive: 'home-outline' },
            Search:    { active: 'search',    inactive: 'search-outline' },
            Scan:      { active: 'scan',      inactive: 'scan-outline' },
            Community: { active: 'people',    inactive: 'people-outline' },
            Profile:   { active: 'person',    inactive: 'person-outline' },
          };
          const icon = icons[route.name];
          return (
            <Ionicons
              name={(focused ? icon?.active : icon?.inactive) as any}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home"      component={HomeScreen} />
      <Tab.Screen name="Search"    component={SearchScreen} />
      <Tab.Screen name="Scan"      component={ScanScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile"   component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Splash"    component={SplashScreen} />
          <Stack.Screen name="Login"     component={LoginScreen} />
          <Stack.Screen name="MainTabs"  component={MainTabs} />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="VoiceAsk"
            component={VoiceAskScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#0E1A0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#4A9B5F',
    marginBottom: 6,
  },
  placeholderSub: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 13,
    color: '#4A6E4D',
  },
});
