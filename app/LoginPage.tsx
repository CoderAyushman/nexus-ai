import { View, StyleSheet, Image, Text, Pressable,Dimensions } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");
const LoginPage = () => {
  const router = useRouter();
  const loginFunction = async () => {
    router.push("/LoginModal");
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/chat.png")}
      />
      <View style={styles.box}>
        <Text style={styles.loginText}>
          Please log in to continue planning, exploring, and enhancing your
          experience with the power of AI.
        </Text>
        <Pressable style={styles.button} onPress={loginFunction}>
          <Image
            style={{ width: 28, height: 19 }}
            source={require("../assets/images/google.png")}
          />
          <Text style={styles.buttonText}>login/signup</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    margin: 0,
    padding: 0,
  },

  text: {
    color: "black",
  },

  image: {
    marginTop: -60,
    width:  Math.min(width * 1),
    height:  Math.min(height * 0.75),
  },

  box: {
    height:  Math.min(height * 0.35),
    width:  Math.min(width * 1),
    backgroundColor: "white",
    zIndex: 10,
    marginTop: -60,
    borderStartStartRadius: "22%",
    borderEndStartRadius: "22%",
  },

  loginText: {
    textAlign: "center",
    color: "black",
    width: 250,
    marginInline: "auto",
    marginTop: 50,
    fontSize: 20,
    fontFamily: "Outfit_500Medium",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: 300,
    borderRadius: 50,
    backgroundColor: "black",
    marginInline: "auto",
    marginTop: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",

    fontSize: 24,
    marginBlock: 10,
    fontFamily: "Outfit_700Bold",
  },
});
