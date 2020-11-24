import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBR4URm4mLIsJ2XuPpH6lAQEyBE4METE54",
  authDomain: "project-electronic-d071e.firebaseapp.com",
  databaseURL: "https://project-electronic-d071e.firebaseio.com",
  projectId: "project-electronic-d071e",
  storageBucket: "project-electronic-d071e.appspot.com",
  messagingSenderId: "299209210610",
  appId: "1:299209210610:web:a284c69a0c8394580b6e6b",
  measurementId: "G-RV8C181J6E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
