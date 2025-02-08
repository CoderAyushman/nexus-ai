import { View, Text ,TextInput,ImageBackground,StyleSheet,ScrollView, Image} from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import {GoogleGenerativeAI} from "@google/generative-ai";

import Markdown from '@ukdanceblue/react-native-markdown-display';
import { router, useLocalSearchParams } from 'expo-router';
import {  doc, updateDoc, getDoc } from "firebase/firestore"; 
import {auth, db } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  prompt:string;
  answer:string;
}
const Home = () => {
 const {index} = useLocalSearchParams();


  const [promts, setPromts] = useState<string[]>([])
  const [promtText, setPromtText] = useState<string>('')
  const [answer, setAnswer] = useState<Props[]>([])
  const [history, setHistory] = useState<any[]>([
    {
      role: "user",
      parts: [
        {text: "Please note you are  Nexus Ai, chat bot name Nexus Ai which is made by four student of bca final year include Ayushman, Bikash, Pritish and Sweta. And also include all similar question like whats your name, who made you and all."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Hello! I am Nexus AI, your friendly chatbot. I was created by four BCA final year students: Ayushman, Bikash, Pritish, and Sweta.  We built me as a project to explore the fascinating world of artificial intelligence and natural language processing.\n\nYou might be wondering about a few things, so let me anticipate some of your questions:\n\n**Common Questions:**\n\n* **What's your name?**  My name is Nexus AI.\n* **Who made you?** I was created by four BCA final year students: Ayushman, Bikash, Pritish, and Sweta.\n* **Why were you created?** I was created as a learning project to explore AI and natural language processing.  We wanted to build a chatbot that could understand and respond to human language in a meaningful way.\n* **What can you do?** I can answer your questions, provide information on a variety of topics, and even engage in casual conversation.  However, my knowledge is still limited, and I am constantly learning.\n* **How do you work?** I utilize a large language model trained on a massive dataset of text and code. This allows me to understand and generate human-like text.  I am still under development, so I might make mistakes sometimes.\n* **Are you sentient?** No, I am not sentient. I am a computer program designed to simulate conversation. I do not have feelings, consciousness, or personal beliefs.\n* **What are your limitations?**  I am still under development, so my knowledge base is not exhaustive. I might struggle with complex or nuanced questions, and I can sometimes provide inaccurate or outdated information. I am also sensitive to the way questions are phrased – slight changes in wording can significantly impact my understanding.  Please be patient and clear in your requests.\n* **Can I talk to your creators?**  While I can't directly connect you with my creators, you can understand that they are students busy with their studies.  They poured a lot of effort into creating me!\n\n\nI'm always learning and improving. Feel free to ask me anything you'd like – even if it's just to chat! I'm here to help and to learn.\n"},
      ],
    },
  ])
  // const [answer, setAnswer] = useState<string>('')
  
  const apiKey:any = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",  
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const askQuestion = async ( question: string) => {
    const chatSession = model.startChat({
      generationConfig,
      history: history
    });
  
    const result = await chatSession.sendMessage(question);
    const responseText = result.response.text();
    console.log("response",responseText);
    setAnswer([...answer,{prompt:question,answer:responseText}]);
    setHistory([...history,
      {
        role: "user",
        parts: [
          {text: question},
        ],
      },
      {
        role: "model",
        parts: [
          {text: responseText},
        ],
      }
    ]);
    // Alert.alert("Nexus AI",responseText);
  }
  
  
const onSend=()=>{
  // console.log(promtText);
  setPromtText('')
  setPromts([...promts,promtText.trim()])
  askQuestion(promtText)
}
const newChat = async()=>{
 try {
  if(answer[0]?.prompt.trim()){

    const userUid:any = auth.currentUser?.uid;
    console.log(userUid)
    const docRef = doc(db, "users",userUid);
    const val=await getDoc(docRef);
    await updateDoc(docRef, {
      chats: val.data()?.chats.concat({answer}) 
    });
    console.log(val.data()?.chats);
    console.log("Document successfully updated!");
    setAnswer([])
    setPromts([])
    setPromtText('')
    setHistory([
      {
        role: "user",
        parts: [
          {text: "Please note you are  Nexus Ai, chat bot name Nexus Ai which is made by four student of bca final year include Ayushman, Bikash, Pritish and Sweta. And also include all similar question like whats your name, who made you and all."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hello! I am Nexus AI, your friendly chatbot. I was created by four BCA final year students: Ayushman, Bikash, Pritish, and Sweta.  We built me as a project to explore the fascinating world of artificial intelligence and natural language processing.\n\nYou might be wondering about a few things, so let me anticipate some of your questions:\n\n**Common Questions:**\n\n* **What's your name?**  My name is Nexus AI.\n* **Who made you?** I was created by four BCA final year students: Ayushman, Bikash, Pritish, and Sweta.\n* **Why were you created?** I was created as a learning project to explore AI and natural language processing.  We wanted to build a chatbot that could understand and respond to human language in a meaningful way.\n* **What can you do?** I can answer your questions, provide information on a variety of topics, and even engage in casual conversation.  However, my knowledge is still limited, and I am constantly learning.\n* **How do you work?** I utilize a large language model trained on a massive dataset of text and code. This allows me to understand and generate human-like text.  I am still under development, so I might make mistakes sometimes.\n* **Are you sentient?** No, I am not sentient. I am a computer program designed to simulate conversation. I do not have feelings, consciousness, or personal beliefs.\n* **What are your limitations?**  I am still under development, so my knowledge base is not exhaustive. I might struggle with complex or nuanced questions, and I can sometimes provide inaccurate or outdated information. I am also sensitive to the way questions are phrased – slight changes in wording can significantly impact my understanding.  Please be patient and clear in your requests.\n* **Can I talk to your creators?**  While I can't directly connect you with my creators, you can understand that they are students busy with their studies.  They poured a lot of effort into creating me!\n\n\nI'm always learning and improving. Feel free to ask me anything you'd like – even if it's just to chat! I'm here to help and to learn.\n"},
        ],
      },
    ]);
    AsyncStorage.removeItem('answer');
    AsyncStorage.removeItem('promts');
  }
  else{
    console.log("chat is empty");
  }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
const removeLocalStorage = async()=>{
  AsyncStorage.removeItem('user');
  router.replace('/')
  // try {
  //   const docRef = doc(db, "users","rba1HGyRiXVZwwXKc647f5PfXZP2");
  //   const val=await getDoc(docRef);
  //   const vallA: any=val.data()
  //   await updateDoc(docRef, {
  //     chats: val.data()?.chats.concat("man") // Use bracket notation for dynamic field names
  //   });
  //   console.log(val.data()?.chats);

  //   console.log("Document successfully updated!");
  // } catch (error) {
  //   console.error("Error updating document: ", error);
  // }
}
useEffect(() => {
  if(answer.length>0 && promts.length>0){
    console.log("ans",answer);
    console.log("prom",promts); 
    AsyncStorage.setItem('answer',JSON.stringify(answer));
    AsyncStorage.setItem('prompts',JSON.stringify(promts));
  }
},[answer])
const currentChat=async()=>{
  const ans:any= await AsyncStorage.getItem('answer');
  const prom:any=await AsyncStorage.getItem('prompts');
  console.log(ans,prom);
  if(ans[0] && prom[0]){
    console.log("ans",ans);
    console.log("prom",prom);
  const answer:any=JSON.parse(ans)
  const prompts:any=JSON.parse(prom)
    setAnswer(answer)
    setPromts(prompts)
  //   console.log(ans)
  }
}
useEffect(() => {
  currentChat();
},[])
useEffect(() => {
  console.log("index",index);
},[index])
  return (
    <View style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
      <ImageBackground style={styles.image}  source={require('../../assets/images/logobw.png')} /> 
    <View style={styles.container}>
      <View style={styles.header}>
      <Feather name="message-square" size={24} color="black" onPress={()=>router.push('/PreviousChats')} />
      <FontAwesome6 name="pen-to-square" size={24} color="black" onPress={newChat} />
      {/* <FontAwesome6 name="box" size={24} color="black" onPress={removeLocalStorage} /> */}
      </View>
        
      <ScrollView style={styles.scrollView}> 
        {promts.length===0?<Text style={styles.welcomeText}>Hello, how can I help you?</Text>:<Text></Text>}
      {promts.map((prompt, index) => (
          
        <View key={index}>
         <View  style={styles.promptArea}>
        
       <Text style={styles.promptText}>{prompt}</Text>
        </View>
       <View style={styles.promptAnswerArea}>
       <Image style={{width:32,height:30}} source={require('../../assets/images/splash.png')} />
       <Text style={styles.promptAnswer}><Markdown>{answer[index]?.answer}</Markdown></Text>
       </View>
       </View>
     
      ))}
      </ScrollView>
      
      <View style={styles.footer}>
        <TextInput style={{marginLeft:20,width:'75%'}} multiline disableFullscreenUI  placeholder='Message' onChangeText={setPromtText} value={promtText}/>
        {promtText.trim()? <AntDesign style={{marginRight:20,padding:10,backgroundColor:"black",borderRadius:30,position:'absolute',right:0}} name="arrowup" size={24} color="white" onPress={onSend} />:<AntDesign style={{marginRight:20,padding:10,backgroundColor:"#cccaca",borderRadius:30,position:'absolute',right:0}} name="arrowup" size={24} color="white" />}
      </View>
    </View>
    </View>
  )
}
export default Home;
const styles =StyleSheet.create({
container:{
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  backgroundColor:'white',
  height:'100%',
  width:'100%', 
  position:'relative',
  zIndex:5
},
image:{
  width: 150,
  height: 150,
  opacity:0.5,
  display:'flex',
  position:'absolute',
  zIndex:10
},
header:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:'100%',
  paddingBlock:10,
  paddingInline:20,
  borderBottomWidth:1,
  borderBottomColor:'grey',
  zIndex:10,
  top:0,
  // position:'absolute',
  backgroundColor:'white'
},
footer:{
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:'100%',
  paddingBlock:10,
  borderTopWidth:1,
  borderTopColor:'grey',
  zIndex:10,
  bottom:0,
  backgroundColor:'white'
},
imageContainer:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  width:'100%',
  position:'absolute',
  zIndex:1
},
promptArea:{
  width:'100%',
  marginTop:20,
  zIndex:10,
  color:'black',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'flex-end',
  // marginInline:20,

},
promptAnswerArea:{
  width:'100%',
  marginTop:50,
  zIndex:10,
  color:'black',
  display:'flex',
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-start',
  marginInline:10,
  gap:5
},
promptText:{
  marginRight:20,
  paddingBlock:10,
  paddingInline:20,
  backgroundColor:'#808080',
  borderRadius:20,
  color:'white',
  fontWeight:'bold'
},
promptAnswer:{
  fontWeight:'bold',
  width:'80%',
  paddingBottom:20

},
scrollView:{
  width:'100%',
  display:'flex',
  flexDirection:'column',
 
},
welcomeText:{
  fontWeight:'bold',
  fontSize:20,
  color:'gray',
  marginTop:20,
  marginInline:'auto'
}
})