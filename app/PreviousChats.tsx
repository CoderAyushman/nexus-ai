import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PreviousChats = () => {
  return (
    <View style={styles.madal}>
      <Text style={styles.text}>PreviousChats</Text>
    </View>
  )
}

export default PreviousChats

const styles=StyleSheet.create({
  madal:{
    backgroundColor:'black',
    width:'100%',
    height:'100%',
    
  },
  text:{
    color:'white'
  }
})