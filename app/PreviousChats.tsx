import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import {auth, db } from '@/firebaseConfig';
import { doc, getDoc } from "firebase/firestore"; 
import Feather from '@expo/vector-icons/Feather';
type Props = {
  prompt:string;
  answer:string;
}
const PreviousChats = () => {
  const [answer, setAnswer] = useState<any[]>([])
  const fetchChats=async()=>{
    const docRef = doc(db, "users", auth.currentUser?.uid!);
    const val=await getDoc(docRef);
    setAnswer(val.data()?.chats)
    console.log(val.data()?.chats);
    
  }
  useEffect( () => {
    fetchChats();
  }, [])
  return (
    <View style={styles.madal}>
      <AntDesign style={{position:'absolute',right:20,top:20}} name="closesquareo" size={24} color="white" onPress={()=>{router.back()}} />
      <ScrollView style={styles.scroll}>
        {answer.length>0 ? answer.map((item,index)=>(
          <View key={index} style={styles.chat}>
          <Feather name="message-square" size={24} color="white" onPress={()=>router.push('/PreviousChats')} />
          <Text style={styles.text}>{item.answer[0].prompt}</Text>
          </View>
        )):<Text style={{color:'white',fontSize:20,margin:'auto',alignSelf:'center'}}>No Previous Chats</Text>}
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