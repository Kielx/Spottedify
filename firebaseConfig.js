import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCNIYsOVRr4eqc93HFItN0bhIfcOnH1jXg',
  authDomain: 'react-native-app-b9b54.firebaseapp.com',
  projectId: 'react-native-app-b9b54',
  storageBucket: 'react-native-app-b9b54.appspot.com',
  messagingSenderId: '222155517240',
  appId: '1:222155517240:web:1a990bfca667e3a247a5cd',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;