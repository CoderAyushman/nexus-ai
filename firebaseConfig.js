import { initializeApp,getApps,getApp } from 'firebase/app';
import { getAuth,initializeAuth,getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGE_SENDER_ID, 
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getApps().length === 0
  ? initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    })
  : getAuth(app);

export { auth,db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
