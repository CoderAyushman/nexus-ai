import { View, Text ,TextInput,ImageBackground,StyleSheet} from 'react-native'
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
      <View style={styles.promptArea}>
        <Text>Start a new chat</Text>
      </View>
      <View style={styles.footer}>
        <TextInput style={{marginLeft:20,maxWidth:200}} multiline disableFullscreenUI  placeholder='Message' />
        <AntDesign style={{marginRight:20,padding:10,backgroundColor:"black",borderRadius:30,position:'absolute',right:0}} name="arrowup" size={24} color="white" />
      </View>
    </View>
    </View>
  )
}

export default Home

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
  position:'absolute'
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
  position:'absolute', 
  bottom:0
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
  marginTop:100,
  zIndex:10,
  color:'black',
  display:'flex',
  alignItems:'flex-end'
}
})