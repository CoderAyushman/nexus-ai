import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { auth, db } from '@/firebaseConfig';
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore"; 
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const SingleImageViewer = () => {
    const { prompt, url,index }: any = useLocalSearchParams();
    const deleteImage=async(index:number)=>{
        console.log('chat deleted at index',index);
        try {
          const docRef = doc(db, "users", auth.currentUser?.uid!);
          const val:any=await getDoc(docRef);
          await updateDoc(docRef, {
            ImageUrls: arrayRemove(val.data().ImageUrls[index]) // Use bracket notation for dynamic field names
          });
          
          
        } catch (error) {
          console.log(error);
        }
      }
    useEffect(() => {
    console.log(prompt, url,index);
    }, [prompt, url,index])
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Ionicons style={styles.back} name="arrow-back" size={30} color="black" onPress={router.back} />
        <MaterialIcons style={{marginTop:5}} name="delete-outline" size={35} color="black" />
        </View>
        <Image style={styles.image} source={{uri:url}} />
        <Text style={styles.promptHeader}>PROMPT:</Text>
        <Text selectable selectionColor={'pink'} style={styles.promptText}>{prompt}</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop:10,
        paddingInline: 20,
      },
    back:{
        // alignSelf:'flex-start',
        // marginLeft:20,
        // marginTop:20
    },
container:{
  display:'flex',
  flexDirection:'column',
//   justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
  height:'100%',
  width:'100%'
},
image:{
  width:300,
  height:300,
  marginTop:30,
  borderRadius:15
},
promptText:{
    width:320,
    fontSize:18,
    fontWeight:'black',
},
promptHeader:{
    fontWeight:'bold',
    left:10,
    alignSelf:'flex-start',
    marginTop:20,
    marginBottom:10,
    fontSize:24
    // position:'absolute',
}
})
export default SingleImageViewer