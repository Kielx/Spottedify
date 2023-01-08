import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCNIYsOVRr4eqc93HFItN0bhIfcOnH1jXg',
  authDomain: 'react-native-app-b9b54.firebaseapp.com',
  projectId: 'react-native-app-b9b54',
  storageBucket: 'react-native-app-b9b54.appspot.com',
  messagingSenderId: '222155517240',
  appId: '1:222155517240:web:1a990bfca667e3a247a5cd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, app, auth };
