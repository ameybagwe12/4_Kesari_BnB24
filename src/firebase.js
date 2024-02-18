import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage"
var firebaseConfig = {
    apiKey: "AIzaSyDeVA6feiawWCKxYr5rmPYA4QLJdudAqIo",
    authDomain: "music-83ac8.firebaseapp.com",
    projectId: "music-83ac8",
    storageBucket: "music-83ac8.appspot.com",
    messagingSenderId: "1092509186401",
    appId: "1:1092509186401:web:5fba4105b19c199e38ad20",
    measurementId: "G-FEV4BSG64X"
  };
 
// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
export const storage = getStorage();