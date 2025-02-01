import { View, Text ,TextInput,ImageBackground,StyleSheet,ScrollView, Image} from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
const Home = () => {
  return (
    <View style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
      <ImageBackground style={styles.image}  source={require('../../assets/images/logobw.png')} /> 
    <View style={styles.container}>
      <View style={styles.header}>
      <Feather name="message-square" size={24} color="black" />
      <FontAwesome6 name="pen-to-square" size={24} color="black" />
      </View>
      <ScrollView style={styles.scrollView}> 
      <View style={styles.promptArea}>
        <Text style={styles.promptText}>who is modi</Text>
      </View>
      <View style={styles.promptAnswerArea}>
        <Image style={{width:32,height:30}} source={require('../../assets/images/splash.png')} />
        <Text style={styles.promptAnswer}>Narendra Modi is an Indian politician serving as the 14th and current Prime Minister of India since May 26, 2014. He is a member of the Bharatiya Janata Party (BJP) and has been a prominent figure in Indian politics. Before becoming Prime Minister, Modi served as the Chief Minister of Gujarat from 2001 to 2014.</Text>
      </View>
      
      
      </ScrollView>
      <View style={styles.footer}>
        <TextInput style={{marginLeft:20,maxWidth:200}} multiline disableFullscreenUI  placeholder='Message' />
        <AntDesign style={{marginRight:20,padding:10,backgroundColor:"black",borderRadius:30,position:'absolute',right:0}} name="arrowup" size={24} color="white" />
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
 
}
})