import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import {auth, db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore"; 
import Feather from '@expo/vector-icons/Feather';
import { useVideoPlayer } from 'expo-video';
import * as Progress from 'react-native-progress';
import index from './index';

type Props = {
  prompt:string;
  answer:string;
}
const PreviousChats = () => {
  const player = useVideoPlayer('./assets/images/animationgif.gif', player => {
    player.loop = true;
    player.play();
    player.allowsExternalPlayback = false;
  });
  const [answer, setAnswer] = useState<any[]>([])
  const [isPrevChat,setIsPrevChat]=useState(false)
  const fetchChats=async()=>{
    const docRef = doc(db, "users", auth.currentUser?.uid!);
    const val=await getDoc(docRef);
    if(val.data()?.chats.length>0){
      setAnswer(val.data()?.chats)
      console.log(val.data()?.chats);
    }
    setTimeout(() => {
      setIsPrevChat(true)
    }, 800);
  }
  useEffect( () => {
    fetchChats();
    setIsPrevChat(false)
  }, [])
  const openChat=async(index:number)=>{
    console.log(index);
    router.push({pathname:'/Home',params:{index}})
  }
  return (
    <View style={styles.madal}>
      <AntDesign style={{position:'absolute',right:20,top:20}} name="closesquareo" size={24} color="white" onPress={()=>{router.back()}} />
      <ScrollView style={styles.scroll}>
        { isPrevChat?answer.length>0 ? answer.map((item,index)=>(
          <TouchableOpacity key={index} style={styles.chat} onPress={()=>openChat(index)}>
          <Feather name="message-square" size={24} color="white" onPress={()=>router.push('/PreviousChats')} />
          <Text style={styles.text} >{item.answer[0].prompt}</Text>
          </TouchableOpacity>
        )):<Text style={{color:'white',fontSize:20,margin:'auto',alignSelf:'center'}}>No Previous Chats</Text>: <Progress.Circle style={{margin:'auto',alignSelf:'center'}} color="white"  size={50} indeterminate={true} borderWidth={5}   />}
      </ScrollView>
    </View>
  )
}

export default PreviousChats

const styles=StyleSheet.create({
  madal:{
    backgroundColor:'#303030',
    width:'90%',
    height:'100%',
    marginInline:'auto',
    marginTop:50,
    borderTopStartRadius:30,
    borderTopEndRadius:30,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:'white',
    fontWeight:'bold'

  },
  scroll:{
    width:'100%',
    height:'100%',
    marginTop:100,
    marginInline:20,

  },
  chat:{
    backgroundColor:'#3C3B3B',
    paddingBlock:10,
    paddingInline:20,
    marginBottom:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    // justifyContent:'space-between'
    gap:20
  }
})