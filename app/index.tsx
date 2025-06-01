import { StyleSheet, View } from "react-native";
import GetStarted from "@/components/GetStarted";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Index = () => {
  const router = useRouter();
  const [isUserFind, setIsUserFind] = useState<boolean | null>(null);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");

        if (user) {
          console.log("User found:", user);
          setIsUserFind(true);
        } else {
          console.log("No user found");
          setIsUserFind(false);
        }
      } catch (error) {
        console.error("Error checking user:", error); 
      } finally {
        await SplashScreen.hideAsync(); // ✅ Ensure splash screen hides
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (isUserFind === true) {
      router.replace("/Home");
    }
  }, [isUserFind]);

  if (isUserFind === null) {
    return null; // Prevent rendering until checkUser completes
  }

  return (
    <View style={styles.container}>
      <GetStarted />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
});
