import { Stack } from "expo-router";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import React, { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      // SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
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
