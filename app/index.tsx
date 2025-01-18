import { StyleSheet, View } from 'react-native'
import React from 'react'
import GetStarted from '@/components/GetStarted';


 const index = () => {
  return (
    <View style={styles.container}>
    <GetStarted/>
    </View>
  )
}

export default index;

const styles =StyleSheet.create({
container:{
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'white',
  height:'100%',
  width:'100%'
}
})