import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB9eO5kEL-npksR-R2rpF2E5mV-32mf9PA",
  authDomain: "mev-shop.firebaseapp.com",
  projectId: "mev-shop",
  storageBucket: "mev-shop.appspot.com",
  messagingSenderId: "789894685341",
  appId: "1:789894685341:web:debb91e416e93bd5fa2a74"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
export default app