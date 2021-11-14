// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

import {
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGING,
  FIREBASE_APPID,
} from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGING,
  appId: FIREBASE_APPID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// for authentication
const auth = firebase.auth();

// for signing up
const signUpUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(userCredentials);
    })
    .catch((error) => console.log(error));
};
// for logging in
const signInUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(userCredentials);
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Oops!", "Login failed!", [{ text: "OK" }]);
    });
};
// for logging out
const logOutUser = (navigation) => {
  auth
    .signOut()
    .then(() => {
      navigation.replace("Home");
    })
    .catch((error) => console.log(error));
};

export { auth, signInUser, signUpUser, logOutUser };

// for database
const db = getFirestore();
export { db };
