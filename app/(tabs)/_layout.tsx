import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs  screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown:false
      }}>
      <Tabs.Screen name="Home" options={{  headerShown:false,title:'Home',tabBarIcon: ({ color, size }) => (<Entypo name="home" size={size} color={color} />)}} />
      <Tabs.Screen name="Setting" options={{  headerShown:false,title:'User',tabBarIcon: ({ color, size }) => (<Entypo name="user" size={size} color={color} />)}} />
    </Tabs>
  );
}
