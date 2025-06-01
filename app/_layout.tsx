import { Stack } from "expo-router";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen
import React, { useEffect } from "react";

// Prevent hiding splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000); // Add delay to avoid flickering
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Keep splash screen until fonts are ready
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
      <Stack.Screen
        name="LoginModal"
        options={{
          headerShown: false,
          presentation: "containedTransparentModal",
        }}
      />
      <Stack.Screen
        name="PreviousChats"
        options={{
          headerShown: false,
          presentation: "containedTransparentModal",
        }}
      />
      <Stack.Screen
        name="ImagesFetcher"
        options={{
          headerShown: false,
          presentation: "containedTransparentModal",
        }}
      />
    </Stack>
  );
}
