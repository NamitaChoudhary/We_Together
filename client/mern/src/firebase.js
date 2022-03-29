import  firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app"

import "firebase/compat/database";
import 'firebase/compat/storage';




var firebaseConfig = {
  apiKey: "AIzaSyD7Pg476xRncR-UzxgvCcxMWquhXQHqXcs",
  authDomain: "wetogether-191fc.firebaseapp.com",
  projectId: "wetogether-191fc",
  storageBucket: "wetogether-191fc.appspot.com",
  messagingSenderId: "257599381626",
  appId: "1:257599381626:web:2310c5ea5f4a043465dbc3",
  measurementId: "G-8HBEYB5B78"
};

// Initialize Firebase


firebase.initializeApp(firebaseConfig);
export default firebase;

