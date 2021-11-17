// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import {
  FIREBASE_APIKEY,
  FIREBASE_APPID,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_MESSAGING,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
} from "@env";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  increment,
  where,
  query,
} from "firebase/firestore";
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
      // after user is created, add the user in database also
      email = email.toLowerCase();
      setDoc(doc(db, "users", `${email}`), {
        username: `${username}`,
        email: `${email}`,
      });
    })
    .catch((error) => {
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
    })
    .catch((error) => {
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
setDoc(doc(db, "items", "Instant Noodles"), {
  name: "Instant Noodles",
  price: 2,
  quantity: 42000,
  type: "Food",
  comments: {},
  image:
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-TjaKZ5SLIpk%2FUtyiaEKT__I%2FAAAAAAAADIk%2FCp0bYQNp3NM%2Fs1600%2FIMG_9903.jpg&f=1&nofb=1",
  description: "Every broke kid will know this, issa best friend...",
});

// test update doc
updateDoc(doc(db, "items", "Tissue"), {
  comments: { "iloveloot@baobae.com": ["Good", 4, "Bae"] },
});

// const museums = query(
//   collectionGroup(db, "items"),
//   where("type", "==", "Technology")
// );

// get the items from search query
const searchItems = async (searchQuery, setItems) => {
  // Need to clean the search query first
  // want the text to be upper case for the first character
  let cleanedText = searchQuery
    .split(" ")
    .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
    .join(" ");
  const q = query(collection(db, "items"), where("name", "==", cleanedText));
  const itemArray = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    itemArray.push(doc.data());
  });
  setItems(itemArray);
};

// get all the items from items collection
const getItems = async (setItems) => {
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

// get specific user
const getCurrentUser = async (email, setUser) => {
  const docSnap = await getDoc(doc(db, "users", email));
  setUser(docSnap.data());
};

// update items in user cart
// If item doesn't exist, new info created, otherwise, info will be overwritten
const updateCartUser = async (email, itemname, price, quantity, image) => {
  await setDoc(
    doc(db, "users", email),
    {
      cart: {
        [itemname]: {
          name: itemname,
          price: price,
          quantity: quantity,
          image: image,
        },
      },
    },
    { merge: true }
  );
};

// update items that user bought
// If item doesn't exist, new info created, otherwise, info will be overwritten
const updateUserBoughtItems = async (
  email,
  itemname,
  price,
  quantity,
  image
) => {
  await setDoc(
    doc(db, "users", email),
    {
      bought: {
        [itemname]: {
          name: itemname,
          price: price,
          quantity: quantity,
          image: image,
        },
      },
    },
    { merge: true }
  );
};

// update the stock quantity once user purchases item
const updateItemQuantity = async (itemName, quantity) => {
  quantity = -1 * parseInt(quantity);
  await updateDoc(doc(db, "items", itemName), {
    quantity: increment(quantity),
  });
};

export {
  db,
  getItems,
  getItemSpecific,
  getCurrentUser,
  updateCartUser,
  updateUserBoughtItems,
  updateItemQuantity,
  searchItems,
};
