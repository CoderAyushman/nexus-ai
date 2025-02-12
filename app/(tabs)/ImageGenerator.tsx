import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";
const ImageGenerator = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [imageUrl, setimageUrl] = useState<string>();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [prompts, setPrompts] = useState<string[]>([]);
  const [promptText, setPromptText] = useState<string>("");

  const imgUrl = async (prompt: string, width: number, height: number) => {
    console.log(prompt, width, height);
    const seed = 42;
    const model = "flux";
    const response: any = await fetch(
      `https://pollinations.ai/p/${prompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`
    );
    console.log(response.url);
    setimageUrl(response.url);
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
          FileSystem.documentDirectory + "small.png"
        )
          .then(({ uri }) => {
            console.log("Finished downloading to ", uri);
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
      />
      <View>
        <View style={styles.image}>
          {imageUrl ? (
            <Image style={styles.image} source={{ uri: imageUrl }} />
          ) : (
            <Ionicons name="image-outline" size={150} color="white" />
          )}
        </View>
        {/* <Text style={{fontSize:20,fontWeight:'bold',marginTop:10}} onPress={()=>imgUrl("Generate a high-resolution image of a breathtaking natural landscape. The scene should feature a lush green valley surrounded by towering mountains, with a crystal-clear river flowing through the center. The sky is a blend of warm sunset colors, casting a golden glow over the landscape. Mist gently rises from the water, and wildflowers in vibrant hues dot the grassy fields. The atmosphere should feel serene and untouched, evoking a sense of peace and wonder.",1024,1024)}>Click</Text>
        <Text style={{fontSize:20,fontWeight:'bold',marginTop:10}} onPress={()=>downloadImage(imageUrl)}>Download</Text> */}
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
              defaultValue="1024"
              placeholder="1024"
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
              defaultValue="1024"
              placeholder="1024"
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
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
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
        <View style={styles.parameters}>
         <Text style={{fontWeight:'bold',fontSize:20,paddingInline:20,paddingBlock:10,backgroundColor:'black',color:'white',width:140,textAlign:'center',borderRadius:15}}>download</Text>
         <Text style={{fontWeight:'bold',fontSize:20,paddingInline:20,paddingBlock:10,backgroundColor:'black',color:'white',width:140,textAlign:'center',borderRadius:15}}>save</Text>
        </View>
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
          style={{ marginLeft: 20, width: "75%" }}
          multiline
          disableFullscreenUI
          placeholder="Message"
          onChangeText={setPromptText}
          value={promptText}
        />
        {promptText.trim() ? (
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
    // flexDirection:'column',
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  gallery: {
    position: "absolute",
    alignSelf: "flex-start",
    top: 30,
    left: 30,
    zIndex: 20,
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    marginInline: "auto",
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
    // fontWeight: "bold",
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
  },
});

export default ImageGenerator;
