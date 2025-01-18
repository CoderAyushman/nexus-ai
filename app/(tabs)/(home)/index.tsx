import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HOME</Text>
      <Link style={styles.text} href="/details"> Go to Details</Link>
      <Link style={styles.text} href="/setting"> Go to Setting</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
  },
  text:{
    color: 'white',
  }
  
});
