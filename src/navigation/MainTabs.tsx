import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import type { MainTabParamList } from "@/navigation/types";
import { SparksFeedScreen } from "@/screens/SparksFeedScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { CaptureScreen } from "@/screens/CaptureScreen";
import { SearchScreen } from "@/screens/SearchScreen";
import { colors } from "@/theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1
        },
        tabBarLabelStyle: {
          fontSize: 12
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarIcon: ({ color }) => <Feather name="search" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Capture"
        component={CaptureScreen}
        options={{ tabBarIcon: ({ color }) => <Feather name="camera" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Community"
        component={SparksFeedScreen}
        options={{ tabBarIcon: ({ color }) => <Feather name="users" size={22} color={color} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} /> }}
      />
    </Tab.Navigator>
  );
}
