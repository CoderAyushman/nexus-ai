import { View, StyleSheet, Image, Text, Button, Pressable, Alert, Dimensions} from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");
const GetStarted = () => {

    const router = useRouter();
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/robot.png')} />
        <View style={styles.box}>
            <Text style={styles.welcomeText}>Welcome to NexusAi 🎉 Your personal AI assistant is here to make life easier. Let's get started! 🚀</Text>
        <Pressable style={styles.button} onPress={()=>{router.push('../LoginPage')}} ><Text style={styles.buttonText}>Get Started</Text></Pressable>
        </View>
    </View>
  )

}

export default GetStarted;

const styles = StyleSheet.create({

    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'white',
        height:'100%',
        width:'100%',
        margin: 0,
        padding: 0,

    },

    text:{
        color: 'black',

    },

    image:{
        marginTop: -60,
        width:  Math.min(width * 1),
        height: Math.min(height * 0.75),

    },

    box:{
        height: Math.min(height * 0.35),
        width: Math.min(width * 1),
        backgroundColor: 'white',
        zIndex: 10,
        marginTop: -60,
        borderStartStartRadius: '22%',
        borderEndStartRadius: '22%',

    },

    welcomeText:{
        textAlign: 'center',
        color: 'black',
        width:250,
        marginInline:'auto',
        marginTop: 50,
        fontSize: 20,
        fontFamily: 'Outfit_500Medium',

    },
    button:{
        width:300,
        borderRadius:50,
        backgroundColor: 'black',
        marginInline:'auto',
        marginTop: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',


    },
    buttonText:{
        color:'white',
        marginInline:'auto',
        fontSize:24,
        marginBlock: 10,
        fontFamily: 'Outfit_700Bold',

    }

})