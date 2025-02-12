import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = () => {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) setUser(user);
    console.log(user);
  };
  return (
    <View style={styles.container}>
      <Text>{user}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Setting;
