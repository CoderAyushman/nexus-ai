import { initializeApp } from 'firebase/app';
import { getAuth,initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAsuAuYh3ZxwT61y1vEm62iJFzrXhY6vCw',
  authDomain: 'nexus-ai-ed5c6.firebaseapp.com',
  projectId: 'nexus-ai-ed5c6',
  messagingSenderId: '108857393027', 
};


const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);

export { auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
