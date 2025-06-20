import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";

const LoginModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignIn, setisSignIn] = useState<boolean>(false);
  const linkUidToFirestore = async (uid: string, email: string) => {
    const val = doc(db, "users", uid);
    await setDoc(
      val,
      { uid, email, chats: [{ prompts: [], answers: [] }], ImageUrls: [] },
      { merge: true }
    );
  };
  const onPressNextForSignUp = async () => {
    try {
      const Email=email.trim()
      console.log(Email);
      createUserWithEmailAndPassword(auth, Email, password)
        .then(async (userCredential) => {
          // Signed up
          const user: any = userCredential.user;     
          await linkUidToFirestore(user.uid, user.email);
          Alert.alert("User created successfully", user.email);
          router.push("/Home");
          AsyncStorage.setItem("user", user.email);
          //   console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            Alert.alert("Alert", "Password should be at least 6 characters");
          } else if (errorCode === "auth/email-already-in-use") {
            Alert.alert("Alert", "Email already in use");
          } else if (errorCode === "auth/invalid-email") {
            Alert.alert("Alert", "Invalid email");
          } else {
            Alert.alert("Error", errorMessage);
          }
        });
    } catch (error: any) {
      Alert.alert(error);
    }
  };
  const onPressNextForSignIn = () => {
    try {
      const Email=email.trim()
      console.log(Email);
      signInWithEmailAndPassword(auth, Email, password)
        .then(async (userCredential) => {
          // Signed up
          const user: any = userCredential.user;
          // await linkUidToFirestore(user.uid,user.email)
          Alert.alert("Signed in successfully", user.email);
          router.push("/Home");
          AsyncStorage.setItem("user", user.email);

          //   console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            Alert.alert("Alert", "Password should be at least 6 characters");
          } else if (errorCode === "auth/wrong-password") {
            Alert.alert("Alert", "Wrong password");
          } else if (errorCode === "auth/invalid-email") {
            Alert.alert("Alert", "Invalid email");
          } else if (errorCode === "auth/user-not-found") {
            Alert.alert("Alert", "User not found");
          } else {
            Alert.alert("Error", errorMessage);
          }
        });
    } catch (error: any) {
      Alert.alert(error);
    }
  };
  const changePassword = () => {
    try {
      if (email) {
        const auth = getAuth();
        const Email = email.trim();
        sendPasswordResetEmail(auth, Email)
          .then(() => {
            ToastAndroid.showWithGravity(
              `Password reset email sent to ${Email}`,
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/user-not-found") {
              Alert.alert("Alert", "User not found");
            } else if (errorCode === "auth/invalid-email") {
              Alert.alert("Alert", "Invalid email");
            } else {
              Alert.alert("Error", errorMessage);
            }
            // ..
          });
      } else {
        Alert.alert("Alert", "Please enter email");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Entypo
          style={styles.entypo}
          name="cross"
          size={25}
          color="gray"
          onPress={() => {
            router.back();
          }}
        />

        {isSignIn ? (
          <Text style={styles.signup}>SIGN UP</Text>
        ) : (
          <Text style={styles.signup}>SIGN IN</Text>
        )}
        <Text style={styles.signupText}>EMAIL</Text>
        <TextInput
          numberOfLines={1}
          placeholder="Enter your email"
          onChangeText={setEmail}
        ></TextInput>
        <Text style={styles.signupText}>PASSWORD</Text>
        <TextInput
          numberOfLines={1}
          placeholder="Enter your password"
          onChangeText={setPassword}
        ></TextInput>
        {!isSignIn ? (
          <Text
            style={{ color: "blue", fontWeight: "bold", alignSelf: "flex-end" }}
            onPress={() => {
              changePassword();
            }}
          >
            Forgot Password?
          </Text>
        ):(<View style={{marginTop:20}}></View>)}
        <Pressable
          style={styles.pressable}
          onPress={isSignIn ? onPressNextForSignUp : onPressNextForSignIn}
        >
          <Text
            style={{
              color: "white",
              paddingBlock: 10,
              paddingInline: 110,
              fontWeight: "bold",
            }}
          >
            NEXT
          </Text>
        </Pressable>
        {isSignIn ? (
          <Text style={styles.newUser}>
            Already have an account?{" "}
            <Text
              style={{ color: "blue", fontWeight: "bold" }}
              onPress={() => {
                setisSignIn(false);
              }}
            >
              Sign In
            </Text>
          </Text>
        ) : (
          <Text style={styles.newUser}>
            Don't have an account?{" "}
            <Text
              style={{ color: "blue", fontWeight: "bold" }}
              onPress={() => {
                setisSignIn(true);
              }}
            >
              Sign Up
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "white", // Semi-transparent white
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black", // Subtle border
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 300,
    height: 320,
  },
  entypo: {
    marginLeft: "auto",
  },
  signup: {
    marginInline: "auto",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 20,
  },
  signupText: {
    fontWeight: "semibold",
    marginTop: 5,
    fontSize: 15,
  },
  pressable: {
    marginInline: "auto",
    marginBlock: 5,
    backgroundColor: "black",
    borderRadius: 30,
  },
  newUser: {
    marginInline: "auto",
    marginTop: 5,
  },
});
