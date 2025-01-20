import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const [user, setUser] = useState<string>('')
  useEffect(() => { getUser() }, [])  
  const getUser=async()=>{
    const user=await AsyncStorage.getItem('user')
    if(user) setUser(user)
    console.log(user)
  }
  return (
    <View>
      <Text>{user}</Text>
    </View>
  )
}

export default Home