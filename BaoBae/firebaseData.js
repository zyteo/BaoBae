import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Seed data for the items here
// So far for the item types, we have:
// Technology
// Health & Beauty
// Fashion
// Food
const seedData = () => {
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
};

export { seedData };
