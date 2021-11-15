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
  getDoc,
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
const signUpUser = (email, password, username, Alert) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(userCredentials);
      // after user is created, add the user in database also
      setDoc(doc(db, "users", `${email}`), {
        username: `${username}`,
        email: `${email}`,
      });
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

// Add items in collection "items"
setDoc(doc(db, "items", "Tissue"), {
  name: "Tissue",
  price: 1,
  quantity: 1000,
  type: "Health & Beauty",
  comments: {},
  image:
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-041420-best-facial-tissue-brands-1586973422.png?crop=0.537xw:0.825xh;0.231xw,0.138xh&resize=640:*",
  description:
    "This is a must have! For drying your tears when you code too much.",
});
setDoc(doc(db, "items", "Clown Mask"), {
  name: "Clown Mask",
  price: 1,
  quantity: 1000,
  type: "Health & Beauty",
  comments: {},
  image:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fpix.iemoji.com%2Fimages%2Femoji%2Fapple%2Fios-12%2F256%2Fclown-face.png&f=1&nofb=1",
  description: "Make yourself beautiful again!",
});
setDoc(doc(db, "items", "Portable Monitor"), {
  name: "Portable Monitor",
  price: 150,
  quantity: 1000,
  type: "Technology",
  comments: {},
  image:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.-kkc8fR5hqCrz-Y8_iKv7QHaEJ%26pid%3DApi&f=1",
  description:
    "When you want a double screen but you don't want a desktop monitor...",
});
setDoc(doc(db, "items", "Bluetooth Earpiece"), {
  name: "Bluetooth Earpiece",
  price: 20,
  quantity: 1000,
  type: "Technology",
  comments: {},
  image:
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgadgetsin.com%2Fuploads%2F2018%2F10%2Fjlab_audio_jbuds_air_true_wireless_bluetooth_earbuds_1.jpg&f=1&nofb=1",
  description:
    "Just hope the connection notification doesn't make you go deaf aight! #TRUESTORY",
});
setDoc(doc(db, "items", "Track Pants"), {
  name: "Track Pants",
  price: 10,
  quantity: 1000,
  type: "Fashion",
  comments: {},
  image:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rebelsport.com.au%2Fdw%2Fimage%2Fv2%2FBBRV_PRD%2Fon%2Fdemandware.static%2F-%2FSites-srg-internal-master-catalog%2Fdefault%2Fdw212cd97a%2Fimages%2F52464401%2FRebel_52464401_greyblack_hi-res.jpg&f=1&nofb=1",
  description: "One size fits all ;)",
});

// test update doc
updateDoc(doc(db, "items", "Tissue"), {
  comments: { rating: 3 },
  "comments.text": "very gud",
  "comments.username": "Bae",
});

// const museums = query(
//   collectionGroup(db, "items"),
//   where("type", "==", "Technology")
// );

// get all the items from items collection
const getitem = async (setItems) => {
  const querySnapshot = await getDocs(collection(db, "items"));
  const itemArray = [];
  querySnapshot.forEach((doc) => {
    itemArray.push(doc.data());
  });
  setItems(itemArray);
};

// get specific item
const getItemSpecific = async (itemName, setItemSpecific) => {
  const docSnap = await getDoc(doc(db, "items", itemName));
  setItemSpecific(docSnap.data());
};

export { db, getitem, getItemSpecific };
