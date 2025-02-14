import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { auth, db } from "@/firebaseConfig";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";

const PreviousChats = () => {
  const [promts, setPromts] = useState<any[]>([]);
  const [isPrevChat, setIsPrevChat] = useState(false);
  const fetchChats = async () => {
    const docRef = doc(db, "users", auth.currentUser?.uid!);
    const val = await getDoc(docRef);
    if (val.data()?.chats.length > 0) {
      setPromts(val.data()?.chats);
      console.log(val.data()?.chats);
    }
    setTimeout(() => {
      setIsPrevChat(true);
    }, 800);
  };
  useEffect(() => {
    fetchChats();
    setIsPrevChat(false);
  }, []);
  const openChat = async (index: number) => {
    console.log(index);
    router.push({ pathname: "/Home", params: { index } });
  };
  const deleteChat = async (index: number) => {
    console.log("chat deleted at index", index);
    try {
      const docRef = doc(db, "users", auth.currentUser?.uid!);
      const chats: any = await getDoc(docRef);
      await updateDoc(docRef, {
        chats: arrayRemove(chats.data().chats[index]), // Use bracket notation for dynamic field names
      });
      if (promts.length == 1) {
        setPromts([]);
      } else {
        fetchChats();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.madal}>
      <AntDesign
        style={{ position: "absolute", right: 20, top: 20 }}
        name="closesquareo"
        size={24}
        color="white"
        onPress={() => {
          router.back();
        }}
      />
      <ScrollView style={styles.scroll}>
        {isPrevChat ? (
          promts.length > 0 ? (
            promts.toReversed().map((item, index) => (
              <View key={index} style={styles.chat}>
                <Feather name="message-square" size={24} color="white" />
                <Text style={styles.text} onPress={() => openChat(index)}>
                  {item.prompts[0]}
                </Text>
                <Ionicons
                  name="trash-bin-outline"
                  size={24}
                  color="white"
                  onPress={() => deleteChat(promts.length - 1 - index)}
                />
              </View>
            ))
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 20,
                margin: "auto",
                alignSelf: "center",
              }}
            >
              No Previous Chats
            </Text>
          )
        ) : (
          <Progress.Circle
            style={{ margin: "auto", alignSelf: "center" }}
            color="white"
            size={50}
            indeterminate={true}
            borderWidth={5}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default PreviousChats;

const styles = StyleSheet.create({
  madal: {
    backgroundColor: "#303030",
    width: "90%",
    height: "100%",
    marginInline: "auto",
    marginTop: 50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    // display:'flex',
    // flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 70,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    width: "70%",
  },
  scroll: {
    width: "100%",
    height: "100%",
    marginTop: 100,
    marginInline: 20,
    display: "flex",
    flexDirection: "column",
  },
  chat: {
    backgroundColor: "#3C3B3B",
    paddingBlock: 10,
    paddingInline: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-between'
    gap: 20,
  },
});
