// Import the functions you need from the SDKs you need
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
  deleteField,
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
      // after user is created, add the user in database also
      // standardise and set email to lowercase - this email will be the key for the users object
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
    .then()
    .catch((error) => {
      // if email is not valid
      if (error.code === "auth/invalid-email") {
        Alert.alert("Login failed!", "Enter valid email please", [
          { text: "OK" },
        ]);
        // if user doesn't exist
      } else if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Login failed!",
          "User not found! If you want to access the app, please make an account",
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
      // bring user back to app opening page
      navigation.replace("Home");
    })
    .catch((error) => console.log(error));
};

export { auth, signInUser, signUpUser, logOutUser };

// for database
const db = getFirestore();

// Add items in collection "items"
// Types:
// Health & Beauty
// Technology
// Fashion
// Food
// Toy
// Pet

// setDoc(doc(db, "items", "Tissue"), {
//   name: "Tissue",
//   price: 1,
//   quantity: 1000,
//   type: "Health & Beauty",
//   comments: {},
//   image:
//     "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gh-041420-best-facial-tissue-brands-1586973422.png?crop=0.537xw:0.825xh;0.231xw,0.138xh&resize=640:*",
//   description:
//     "This is a must have! For drying your tears when you code too much.",
// });
// setDoc(doc(db, "items", "Clown Mask"), {
//   name: "Clown Mask",
//   price: 1,
//   quantity: 1000,
//   type: "Health & Beauty",
//   comments: {},
//   image:
//     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fpix.iemoji.com%2Fimages%2Femoji%2Fapple%2Fios-12%2F256%2Fclown-face.png&f=1&nofb=1",
//   description: "Make yourself beautiful again!",
// });
// setDoc(doc(db, "items", "Portable Monitor"), {
//   name: "Portable Monitor",
//   price: 150,
//   quantity: 1000,
//   type: "Technology",
//   comments: {},
//   image:
//     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.-kkc8fR5hqCrz-Y8_iKv7QHaEJ%26pid%3DApi&f=1",
//   description:
//     "When you want a double screen but you don't want a desktop monitor...",
// });
// setDoc(doc(db, "items", "Bluetooth Earpiece"), {
//   name: "Bluetooth Earpiece",
//   price: 20,
//   quantity: 1000,
//   type: "Technology",
//   comments: {},
//   image:
//     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgadgetsin.com%2Fuploads%2F2018%2F10%2Fjlab_audio_jbuds_air_true_wireless_bluetooth_earbuds_1.jpg&f=1&nofb=1",
//   description:
//     "Just hope the connection notification doesn't make you go deaf aight! #TRUESTORY",
// });
// setDoc(doc(db, "items", "Track Pants"), {
//   name: "Track Pants",
//   price: 10,
//   quantity: 1000,
//   type: "Fashion",
//   comments: {},
//   image:
//     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rebelsport.com.au%2Fdw%2Fimage%2Fv2%2FBBRV_PRD%2Fon%2Fdemandware.static%2F-%2FSites-srg-internal-master-catalog%2Fdefault%2Fdw212cd97a%2Fimages%2F52464401%2FRebel_52464401_greyblack_hi-res.jpg&f=1&nofb=1",
//   description: "One size fits all ;)",
// });
// setDoc(doc(db, "items", "Instant Noodles"), {
//   name: "Instant Noodles",
//   price: 2,
//   quantity: 42000,
//   type: "Food",
//   comments: {},
//   image:
//     "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-TjaKZ5SLIpk%2FUtyiaEKT__I%2FAAAAAAAADIk%2FCp0bYQNp3NM%2Fs1600%2FIMG_9903.jpg&f=1&nofb=1",
//   description: "Every broke kid will know this, issa best friend...",
// });
// setDoc(doc(db, "items", "Leash"), {
//   name: "Leash",
//   price: 5,
//   quantity: 3,
//   type: "Pet",
//   comments: {},
//   image:
//     "https://d7rh5s3nxmpy4.cloudfront.net/C2079/snc/1/strong_leash_1.jpg",
//   description: "For walking your pet",
// });
// setDoc(doc(db, "items", "Cap"), {
//   name: "Cap",
//   price: 14.50,
//   quantity: 10,
//   type: "Fashion",
//   comments: {},
//   image:
//     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iMFBTknhCxJ96oGqzt8TdAHaGG%26pid%3DApi&f=1",
//   description: "Up your attractiveness by 100%!",
// });
// setDoc(doc(db, "items", "Mala Snack"), {
//   name: "Mala Snack",
//   price: 3.50,
//   quantity: 10000,
//   type: "Food",
//   comments: {},
//   image:
//     "https://hk-min-shop.oss-cn-hongkong.aliyuncs.com/202004292029432c8375798.JPG",
//   description: "You don't know what's good until you've tried this...",
// });
// setDoc(doc(db, "items", "Pet Tunnel"), {
//   name: "Pet Tunnel",
//   price: 15,
//   quantity: 10000,
//   type: "Pet",
//   comments: {},
//   image:
//     "https://m.media-amazon.com/images/I/61i30PaSlYS._AC_SL1500_.jpg",
//   description: "Tunnels for your pets, tunnels for your toddler",
// });
// setDoc(doc(db, "items", "Pet Food Game"), {
//   name: "Pet Food Game",
//   price: 13,
//   quantity: 20000,
//   type: "Pet",
//   comments: {},
//   image:
//     "https://i.insider.com/60523f51fe6a340019acf276?width=700",
//   description: "Keep your pet's brain healthy and happy",
// });
// setDoc(doc(db, "items", "Marshmallows"), {
//   name: "Marshmallows",
//   price: 3,
//   quantity: 690,
//   type: "Food",
//   comments: {},
//   image:
//     "https://media.istockphoto.com/photos/marshmallow-background-picture-id506817544",
//   description: "Squishy and yummy but too much may give you diabetes...",
// });
// setDoc(doc(db, "items", "Hot Chocolate"), {
//   name: "Hot Chocolate",
//   price: 1.50,
//   quantity: 5000,
//   type: "Food",
//   comments: {},
//   image:
//     "https://static01.nyt.com/images/2019/02/01/dining/gk-dairy-free-hot-chocolate/gk-dairy-free-hot-chocolate-articleLarge.jpg",
//   description: "The best when it???s cold!",
// });
// setDoc(doc(db, "items", "Ugly Christmas Sweater"), {
//   name: "Ugly Christmas Sweater",
//   price: 19.90,
//   quantity: 10000,
//   type: "Fashion",
//   comments: {},
//   image:
//     `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/wine-ugly-sweater-1544738925.jpg`,
//   description: "Keeps you warm. Bonus: It helps you smuggle your wine into the cinema",
// });
// setDoc(doc(db, "items", "Barney Costume"), {
//   name: "Barney Costume",
//   price: 69.90,
//   quantity: 10000,
//   type: "Fashion",
//   comments: {},
//   image:
//     `https://static.wikia.nocookie.net/barney/images/0/07/BarneyinTUTU.jpg/revision/latest?cb=20210805191524`,
//   description: "Limited edition Barney costume with pink tutu",
// });
// setDoc(doc(db, "items", "Deep Fried Mars Bars"), {
//   name: "Deep Fried Mars Bars",
//   price: 1.50,
//   quantity: 690,
//   type: "Food",
//   comments: {},
//   image:
//     "https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2016/08/946220031_0aa58a55fe_o.jpg",
//   description: "Sounds delicious but you shouldn???t eat too many???",
// });

// add/update comments for item
// If comment doesn't exist, new info created, otherwise, info will be overwritten
const addComment = async (itemName, email, userName, rating, text) => {
  await setDoc(
    doc(db, "items", itemName),
    {
      comments: {
        [email]: {
          username: userName,
          rating: rating,
          text: text,
        },
      },
    },
    { merge: true }
  );
};

// get the items from search query
const searchItems = async (searchQuery, setItems) => {
  // Need to clean the search query first
  // want the text to be upper case for the first character
  let cleanedText = searchQuery
    .split(" ")
    .map((ele) => ele.charAt(0).toUpperCase() + ele.slice(1))
    .join(" ");
  // query for both item name and type
  const q = query(collection(db, "items"), where("name", "==", cleanedText));
  const qType = query(
    collection(db, "items"),
    where("type", "==", cleanedText)
  );
  const itemArray = [];
  const querySnapshot = await getDocs(q);
  const querySnapshot2 = await getDocs(qType);
  querySnapshot.forEach((doc) => {
    itemArray.push(doc.data());
  });
  querySnapshot2.forEach((doc) => {
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
// If item doesn't exist, new info created,
// otherwise, increase the quantity of the item
const updateUserBoughtItems = async (
  email,
  item,
  price,
  quantity,
  image,
  Alert
) => {
  const docSnapItem = await getDoc(doc(db, "items", item));
  // if item quantity > quantity user wants to buy, all good
  if (docSnapItem.data().quantity >= parseInt(quantity)) {
    let itemsBoughtArray = [];
    const docSnap = await getDoc(doc(db, "users", email));
    // want to know all the items that the user bought
    for (let key in docSnap.data().bought) {
      itemsBoughtArray.push(key);
    }

    // if item doesn't exist, add to the user bought item
    if (itemsBoughtArray.indexOf(item) === -1) {
      await setDoc(
        doc(db, "users", email),
        {
          bought: {
            [item]: {
              name: item,
              price: price,
              quantity: quantity,
              image: image,
            },
          },
        },
        { merge: true }
      );
      // item already exists, just need to update quantity
    } else {
      let accessBoughtItemQuantity = "bought." + item + ".quantity";
      await updateDoc(doc(db, "users", email), {
        [accessBoughtItemQuantity]: increment(quantity),
      });
    }

    // decrease item quantity in items db
    updateItemQuantity(item, quantity);
    Alert.alert(
      "Bought!",
      `You bought ${quantity} ${item} at $ ${price} each, for a total of $ ${
        parseInt(quantity) * price
      }.`,
      [{ text: "OK" }]
    );
    // if item quantity < quantity user wants to buy, throw alert
  } else {
    Alert.alert(
      "Stock too low!",
      `You want to buy ${quantity} ${item}, but there is only ${
        docSnapItem.data().quantity
      } left. Try again?`,
      [{ text: "OK" }]
    );
  }
};

// update the stock quantity once user purchases item
const updateItemQuantity = async (itemName, quantity) => {
  quantity = -1 * parseInt(quantity);
  await updateDoc(doc(db, "items", itemName), {
    quantity: increment(quantity),
  });
};

// update user bought items for items in user cart
// first check if item quantity > quantity that user wants to buy
// if item quantity < quantity user wants to buy, throw alert
// Otherwise, if items not bought before, add to user database
// if items bought before, increment the item count in database
// afterwards, remove item from cart
const updateBuyItemsFromCart = async (
  email,
  item,
  price,
  quantity,
  image,
  Alert
) => {
  const docSnapItem = await getDoc(doc(db, "items", item));
  if (docSnapItem.data().quantity >= parseInt(quantity)) {
    let itemsBoughtArray = [];
    const docSnap = await getDoc(doc(db, "users", email));
    // want to know all the items that the user bought
    for (let key in docSnap.data().bought) {
      itemsBoughtArray.push(key);
    }

    if (itemsBoughtArray.indexOf(item) === -1) {
      await setDoc(
        doc(db, "users", email),
        {
          bought: {
            [item]: {
              name: item,
              price: price,
              quantity: quantity,
              image: image,
            },
          },
        },
        { merge: true }
      );
    } else {
      let accessBoughtItemQuantity = "bought." + item + ".quantity";
      await updateDoc(doc(db, "users", email), {
        [accessBoughtItemQuantity]: increment(quantity),
      });
    }
    // remove item from cart
    removeCartItem(email, item);
    // decrease item quantity in items db
    updateItemQuantity(item, quantity);
    Alert.alert(
      "Bought!",
      `You bought ${quantity} ${item} at $ ${price} each, for a total of $ ${
        parseInt(quantity) * price
      }.`,
      [{ text: "OK" }]
    );
  } else {
    Alert.alert(
      "Stock too low!",
      `You want to buy ${quantity} ${item}, but there is only ${
        docSnapItem.data().quantity
      } left. Update cart and try again?`,
      [{ text: "OK" }]
    );
  }
};

// remove item from cart
const removeCartItem = async (email, item) => {
  let accessCartItem = "cart." + item;
  await updateDoc(doc(db, "users", email), {
    [accessCartItem]: deleteField(),
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
  addComment,
  updateBuyItemsFromCart,
  removeCartItem,
};
