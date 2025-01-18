import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
const LoginModal = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const onPressNext = async () => {
       try {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user:any = userCredential.user;
          Alert.alert('User created successfully',user.email)
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
            if(errorCode === 'auth/weak-password'){
                Alert.alert('Alert','Password should be at least 6 characters')
            }
            else if(errorCode === 'auth/email-already-in-use'){
                Alert.alert('Alert','Email already in use')
            }
            else{
                Alert.alert('Error',errorMessage)
            }
        });
       } catch (error:any) {
        Alert.alert(error)
       }
    }
  return (
    <View style={styles.view}>
    <View style={styles.container}>
      <Entypo style={styles.entypo} name="cross" size={25} color="gray" onPress={()=>{router.back()}}/>
      <Text style={styles.signup}>SIGN IN / SIGN UP</Text>
      <Text style={styles.signupText}>EMAIL</Text>
      <TextInput placeholder='Enter your email' onChangeText={setEmail}></TextInput>
      <Text style={styles.signupText}>PASSWORD</Text>
      <TextInput placeholder='Enter your password' onChangeText={setPassword}></TextInput>
      <Pressable style={styles.pressable} onPress={onPressNext}><Text style={{color:'white',paddingBlock:10,paddingInline:110,fontWeight:'bold'}}>NEXT</Text></Pressable>
      
    </View>
    </View>
  ) 
}

export default LoginModal

const styles=StyleSheet.create({

    view:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
       
    },
    container:{
        backgroundColor: 'white', // Semi-transparent white
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black', // Subtle border
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        width:300,
        height:300
    },
    entypo:{
        marginLeft:'auto',
    },
    signup:{
        marginInline:'auto',
        fontWeight:'bold',
        marginBottom:10,
        fontSize:20
    },
    signupText:{
        fontWeight:'semibold',
        marginTop:5,
        fontSize:15,
       
    },
    pressable:{
        marginInline:'auto',
        marginTop:15,
        backgroundColor:'black',
        borderRadius:30,
    }

})