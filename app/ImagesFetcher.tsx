import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import * as Progress from "react-native-progress";
const { width } = Dimensions.get("window");
const ImagesFetcher = () => {
  const router = useRouter();
  const [images, setImages] = useState<any[]>([]);
  const [isImagesAvailable, setIsImagesAvailable] = useState(false);
  const fetchImages = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser?.uid!);
      await getDoc(docRef)
        .then((val: any) => {
          setImages(val.data().ImageUrls);
          setIsImagesAvailable(true);
        })
        .catch((error: any) => {
          console.log("Image url error", error);
          setIsImagesAvailable(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("page loaded");
    fetchImages();
    setIsImagesAvailable(false);
  }, []);
  const openImage = async (prompt: string, url: string, index: number) => {
    router.replace({
      pathname: "/SingleImageViewer",
      params: { prompt: prompt, url: url, index: index },
    });
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
      {/* <Text style={styles.header}>Gallery</Text> */}
      <ScrollView style={styles.scroll}>
        {isImagesAvailable ? (
          images.length > 0 ? (
            <View style={styles.imageContainer}>
              {images.toReversed().map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    openImage(item.prompt, item.url, images.length - 1 - index);
                  }}
                >
                  <Image
                    style={styles.image}
                    source={{ uri: item.url }}
                  />
                </Pressable>
              ))}
            </View>
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 20,
                margin: "auto",
                alignSelf: "center",
              }}
            >
              No Previous Images Saved
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

export default ImagesFetcher;

const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 30,
    alignSelf: "flex-start",
    marginTop: 50,
    marginLeft: 10,
    fontWeight: "bold",
  },
  imageContainer: {
    // width:'80%',
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginInline:5,
    justifyContent: "space-between",
    marginBottom:150

  },
  madal: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#303030",
    width: "90%",
    height: "100%",
    marginInline: "auto",
    marginTop: 50,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    // alignItems: "center",
    // justifyContent: "center",
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
    marginInline: "auto",
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
    gap: 20,
  },
  image:{ width: Math.min(width * 0.42), height: Math.min(width * 0.42), borderRadius: 10,borderWidth:1,borderColor:'purple' }
});
