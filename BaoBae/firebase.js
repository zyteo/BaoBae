// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  collectionGroup,
  query,
  where,
} from "firebase/firestore";
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
const signUpUser = (email, password, Alert) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(userCredentials);
    })
    .catch((error) => {
      console.log(error.code);
      // if email is already in use
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Signup failed!", "Email is already in use.", [
          { text: "OK" },
        ]);
        // if email is not valid
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Signup failed!", "Please enter a valid email.", [
          { text: "OK" },
        ]);
        // other cases where signup fail - shouldn't happen, but just in case
      } else {
        Alert.alert(
          "Signup failed!",
          "Sorry, that didn't work out. Try again?",
          [{ text: "AYE AYE" }]
        );
      }
    });
};

// for logging in
const signInUser = (email, password, Alert) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(userCredentials);
    })
    .catch((error) => {
      console.log(error.code);
      // if email is not valid
      if (error.code === "auth/invalid-email") {
        Alert.alert("Login failed!", "Enter valid email leh plsss", [
          { text: "OK" },
        ]);
        // if user doesn't exist
      } else if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Login failed!",
          "User not found! If you want to buy thing pls make account hor.",
          [{ text: "ROGER" }]
        );
        // if user enters wrong password
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Login failed!", "Wrong password!", [{ text: "OK" }]);
        // other cases where login fail - shouldn't happen, but just in case
      } else {
        Alert.alert(
          "Login failed!",
          "Sorry, that didn't work out. Try again?",
          [{ text: "AYE AYE" }]
        );
      }
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

// Add a new document in collection "items"
setDoc(doc(db, "items", "Tissue"), {
  name: "Tissue",
  price: 1,
  quantity: 1000,
  type: "Lifestyle",
  comments: {},
  image:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-041420-best-facial-tissue-brands-1586973422.png?crop=0.537xw:0.825xh;0.231xw,0.138xh&resize=640:*",
  description:
    "This is a must have! For drying your tears when you code too much.",
});
setDoc(doc(db, "items", "Portable monitor"), {
  name: "Portable monitor",
  price: 150,
  quantity: 1000,
  type: "Technology",
  comments: {},
  image:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-041420-best-facial-tissue-brands-1586973422.png?crop=0.537xw:0.825xh;0.231xw,0.138xh&resize=640:*",
  description:
    "This is a must have! For drying your tears when you code too much.",
});
setDoc(doc(db, "items", "Wireless Earpiece"), {
  name: "Wireless Earpiece",
  price: 20,
  quantity: 1000,
  type: "Technology",
  comments: {},
  image:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-041420-best-facial-tissue-brands-1586973422.png?crop=0.537xw:0.825xh;0.231xw,0.138xh&resize=640:*",
  description:
    "This is a must have! For drying your tears when you code too much.",
});

// test update doc
updateDoc(doc(db, "items", "Tissue"), {
  "comments.rating": 3,
  "comments.text": "very gud",
  "comments.username": "Bae",
});

// get all items data
// const getItems = () => {
//   const itemsForBrowse = getDocs(collection(db, "items"));
//   console.log(itemsForBrowse)
// };

const museums = query(
  collectionGroup(db, "items"),
  where("type", "==", "Technology")
);

const getitem = async (setItems) => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const itemArray = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    itemArray.push(doc.data());
  });
  setItems(itemArray);
};
export { db, getitem };
