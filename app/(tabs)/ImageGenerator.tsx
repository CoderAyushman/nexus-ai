import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import { Picker } from '@react-native-picker/picker';
const { width,height } = Dimensions.get("window");
const ImageGenerator = () => {
  const router = useRouter();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [imageUrl, setimageUrl] = useState<string>();
  const [promptText, setPromptText] = useState<any>("");
  const [width, setWidth] = useState<any>("1024");
  const [height, setHeight] = useState<any>("1024");
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState<string[]>(["flux"]);
  const [items, setItems] = useState([
    { label: "default", value: "flux" },
    { label: "realism", value: "flux-realism" },
    { label: "dark", value: "any-dark" },
    { label: "anime", value: "flux-anime" },
    { label: "3d", value: "flux-3d" },
    { label: "turbo", value: "turbo" },
  ]);
  const [isImageGenerated, setIsImageGenerated] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  const [isAiPromptGenerated, setIsAiPromptGenerated] =
    useState<boolean>(false);

  //ai api configuration
  const [history, setHistory] = useState<any[]>([
    {
      role: "user",
      parts: [
        {
          text: "Give prompt for random image generation",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "A futuristic city at sunset, with towering neon skyscrapers reflecting off a glassy river. Flying cars zoom between the buildings, and holographic billboards light up the sky. In the foreground, a cyberpunk-style street market is bustling with people wearing high-tech augmented reality glasses. The atmosphere is vibrant, with a mix of warm and cool lighting, creating a visually stunning sci-fi scene.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Give prompt for random image generation",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Generate a high-resolution image of a breathtaking natural landscape. The scene should feature a lush green valley surrounded by towering mountains, with a crystal-clear river flowing through the center. The sky is a blend of warm sunset colors, casting a golden glow over the landscape. Mist gently rises from the water, and wildflowers in vibrant hues dot the grassy fields. The atmosphere should feel serene and untouched, evoking a sense of peace and wonder.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Give prompt for random image generation",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Create a whimsical illustration of a fluffy, purple dragon sitting atop a giant mushroom in a magical forest. The dragon has large, friendly eyes and is wearing a tiny crown. The mushroom is glowing with soft, bioluminescent light. The surrounding forest is filled with strange and colorful plants, sparkling fireflies, and hidden pathways. The overall tone should be playful and enchanting, reminiscent of a children's storybook illustration.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Give prompt for random image generation",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "An epic fantasy scene depicting a lone warrior facing a massive, fire-breathing dragon on a desolate, rocky mountain peak. The warrior is clad in shining armor, wielding a glowing sword. The dragon's scales shimmer in the light of the setting sun, and smoke billows from its nostrils. The sky is filled with swirling clouds and lightning. Focus on creating a sense of scale and dramatic tension.",
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: "Give prompt for random image generation",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "A photorealistic image of a bioluminescent jellyfish gracefully floating in the deep ocean. The surrounding water is dark and mysterious, with faint shafts of light piercing through. The jellyfish is radiating a soft, ethereal glow, with intricate patterns visible on its bell and tentacles. Small, glowing particles drift around it, creating a magical and otherworldly atmosphere. The composition should be close-up, focusing on the beauty and fragility of the creature.",
        },
      ],
    },
  ]);

  const apiKey: any = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const aiModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const askRandomPrompt = async () => {
    try {
      setIsAiPromptGenerated(true);
      const chatSession = aiModel.startChat({
        generationConfig,
        history: history,
      });

      await chatSession
        .sendMessage("Give prompt for random image generation")
        .then((response) => {
          setPromptText(response.response.text());
          setIsAiPromptGenerated(false);
        })
        .catch((error) => {
          console.log(error);
          setIsAiPromptGenerated(false);
        });
    } catch (error) {
      console.log(error);
      setIsAiPromptGenerated(false);
    }
  };
  const updateImageUrl = async (prompt: string, url: string) => {
    try {
      const docRef = doc(db, "users", auth.currentUser?.uid!);
      const val = (await getDoc(docRef)).data()?.ImageUrls;
      await updateDoc(docRef, {
        ImageUrls: val.concat({ prompt: prompt, url: url }),
      })
        .then(() => {
          console.log("Image url added successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const imgUrl = async (promptText: string) => {
    try {
      setIsImageGenerated(true);
      setIsImage(false);
      setPromptText("");
      const seed = 42;
      if (parseInt(width) < 200 || parseInt(width) > 1024) {
        alert("Width should be greater than 200 and less than 1024");
      } else if (parseInt(height) < 200 || parseInt(height) > 1024) {
        alert("Height should be greater than 200 and less than 1024");
      } else {
        await fetch(
          `https://pollinations.ai/p/${promptText}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`
        )
          .then((res) => {
            setIsImage(true);
            updateImageUrl(promptText, res.url);
            setimageUrl(res.url);
            setIsImageGenerated(false);
          })
          .catch((error) => {
            console.log(error);
            setIsImage(false);
            setIsImageGenerated(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const downloadImage = async (uri: any) => {
    console.log(uri);
    try {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      } else {
        console.log("permission granted");
        FileSystem.downloadAsync(
          uri,
          FileSystem.documentDirectory + "nexusai.png"
        )
          .then(({ uri }) => {
            console.log("Finished downloading to ", uri);
            ToastAndroid.showWithGravity(
              "Image successfully downloaded to your Gallerys DCMI folder!",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            MediaLibrary.saveToLibraryAsync(uri);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Entypo
        style={styles.gallery}
        name="folder-images"
        size={40}
        color="black"
        onPress={() => router.push("/ImagesFetcher")}
      />
      <View>
        <View style={styles.image}>
          {imageUrl ? (
            <Image style={styles.image} source={{ uri: imageUrl }} />
          ) : (
            <View>
              {/* <Ionicons style={{alignSelf:"center"}} name="image-outline" size={150} color="white" /> */}
              <ImageBackground
                style={{ alignSelf: "center", width: 150, height: 150 }}
                source={require("../../assets/images/logobw.png")}
              />
            </View>
          )}
          {isImageGenerated && (
            <Progress.Circle
              style={{ alignSelf: "center", zIndex: 30, position: "absolute" }}
              color="yellow"
              size={100}
              indeterminate={true}
              borderWidth={10}
            />
          )}
        </View>
        <View style={styles.parameters}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>width:</Text>
            <TextInput
              style={styles.parameterText}
              value={width}
              keyboardType="numeric"
              onChangeText={setWidth}
              placeholder="width"
              maxLength={4}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>height:</Text>
            <TextInput
              style={styles.parameterText}
              value={height}
              keyboardType="numeric"
              onChangeText={setHeight}
              placeholder="height"
              maxLength={4}
            />
          </View>
        </View>
        <View style={styles.parameters}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>model:</Text>
            <View style={{ borderRadius: 15, overflow: "hidden" }}>
            <Picker
                style={styles.picker}
                mode="dropdown"
                selectedValue={model}
                onValueChange={(itemValue, itemIndex) => setModel(itemValue)}
              >
                <Picker.Item label="default" value="flux" />
                <Picker.Item label="realism" value="flux-realism" />
                <Picker.Item label="dark" value="any-dark" />
                <Picker.Item label="anime" value="flux-anime" />
                <Picker.Item label="3d" value="flux-3d" />
                <Picker.Item label="turbo" value="turbo" />
              </Picker>
            </View>
          </View>
        </View>
        {isImage && (
          <View style={styles.parameters}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                paddingInline: 20,
                paddingBlock: 10,
                backgroundColor: "#979797",
                color: "white",
                width: 300,
                textAlign: "center",
                borderRadius: 15,
              }}
              onPress={() => downloadImage(imageUrl)}
            >
              download
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          width: "100%",
          bottom: 0,
          position: "absolute",
          zIndex: 20,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          minHeight: 60,
          borderTopWidth: 1,
        }}
      >
        <TextInput
          style={{
            marginLeft: 20,
            width: "75%",
            fontWeight: "bold",
            color: "black",
          }}
          multiline
          disableFullscreenUI
          placeholder={
            isAiPromptGenerated
              ? "Ai is generating prompt..."
              : "Enter your prompt..."
          }
          onChangeText={setPromptText}
          defaultValue={promptText}
        />
        {promptText?.trim() ? (
          <AntDesign
            style={{
              marginRight: 20,
              padding: 10,
              backgroundColor: "black",
              borderRadius: 30,
              position: "absolute",
              right: 0,
            }}
            name="arrowup"
            size={24}
            color="white"
            onPress={() => imgUrl(promptText)}
          />
        ) : (
          <MaterialIcons
            style={{
              marginRight: 20,
              padding: 10,
              backgroundColor: "black",
              borderRadius: 30,
              position: "absolute",
              right: 0,
            }}
            name="auto-awesome"
            size={24}
            color="white"
            onPress={askRandomPrompt}
          />
        )}
      </View>
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
  gallery: {
    position: "absolute",
    alignSelf: "flex-start",
    top: 30,
    left: 35,
  },
  image: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width:  Math.min(width * 0.85),
    height:  Math.min(width * 0.85),
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    marginInline: "auto",
    borderWidth:1,
    borderColor:'purple' 
  },
  parameters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "75%",
    gap: 10,
    marginTop: 20,
    marginInline: "auto",
  },
  parameterText: {
    height: 50,
    width: 80,
    color: "gray",
    paddingBlock: 30,
    marginInline: 5,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
  },
  picker: {
    width: 200,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    color: "gray",
    overflow: "hidden",
    zIndex: 20,
  },
});

export default ImageGenerator;
