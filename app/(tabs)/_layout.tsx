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
      }}>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Setting" />
    </Tabs>
  );
}
