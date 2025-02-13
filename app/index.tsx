import { StyleSheet, View } from 'react-native'
import GetStarted from '@/components/GetStarted';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync()
// SplashScreen.setOptions({
//   duration: 10000,
//   fade: true,
// })
 const index = () => {
  const [isUserFind, setisUserFind] = useState<boolean>(false)
  
  useEffect(()=>{

 checkUser();
  },[])
  useEffect(() => {
    if (isUserFind) {
      router.replace('/Home');
    }
  }, [isUserFind]);
  const checkUser = async () => {
    try {
      //hello 
      const user = await AsyncStorage.getItem('user');
      if (user) { 
        console.log(user);
        setisUserFind(true)
        router.replace('/Home')
      } else {
        console.log('No user found');
        // setisUserFind(true
      }
    } catch (error) {
      console.log(error);
    } finally {
      SplashScreen.hideAsync();
    }
  }

  return (
    <View style={styles.container} >
        <GetStarted />
        

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