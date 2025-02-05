import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
const PreviousChats = () => {
  return (
    <View style={styles.madal}>
      <AntDesign style={{position:'absolute',right:20,top:20}} name="closesquareo" size={24} color="white" onPress={()=>{router.back()}} />
      <Text style={styles.text}>PreviousChats</Text>
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

  },
  text:{
    color:'white'
  }
})