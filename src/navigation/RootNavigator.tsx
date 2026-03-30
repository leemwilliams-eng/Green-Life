import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainTabs } from "@/navigation/MainTabs";
import type { RootStackParamList } from "@/navigation/types";
import { AuthScreen } from "@/screens/AuthScreen";
import { BarcodeScannerScreen } from "@/screens/BarcodeScannerScreen";
import { CandidateResultsScreen } from "@/screens/CandidateResultsScreen";
import { ItemDetailScreen } from "@/screens/ItemDetailScreen";
import { LoginScreen } from "@/screens/LoginScreen";
import { MetricDetailScreen } from "@/screens/MetricDetailScreen";
import { NoMatchScreen } from "@/screens/NoMatchScreen";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { PermissionsScreen } from "@/screens/PermissionsScreen";
import { PhotoCaptureScreen } from "@/screens/PhotoCaptureScreen";
import { SourceDetailScreen } from "@/screens/SourceDetailScreen";
import { SplashScreen } from "@/screens/SplashScreen";
import { VoiceAskScreen } from "@/screens/VoiceAskScreen";
import { colors } from "@/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        animation: "fade",
        contentStyle: { backgroundColor: colors.bg },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ title: "Account" }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} options={{ title: "Scan Barcode" }} />
      <Stack.Screen name="PhotoCapture" component={PhotoCaptureScreen} options={{ title: "Add Photo" }} />
      <Stack.Screen name="CandidateResults" component={CandidateResultsScreen} options={{ title: "Possible Matches" }} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ title: "Item Details" }} />
      <Stack.Screen name="MetricDetail" component={MetricDetailScreen} options={{ title: "Metric Details" }} />
      <Stack.Screen name="SourceDetail" component={SourceDetailScreen} options={{ title: "Source Detail" }} />
      <Stack.Screen name="NoMatch" component={NoMatchScreen} options={{ title: "No Match" }} />
      <Stack.Screen name="VoiceAsk" component={VoiceAskScreen} options={{ title: "Ask", presentation: "modal" }} />
    </Stack.Navigator>
  );
}
