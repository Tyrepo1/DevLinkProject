import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyASafCzPxYLUgNm_6h9-nhmh55eOTw5b80",
    authDomain: "personalproject-c291a.firebaseapp.com",
    projectId: "personalproject-c291a",
    storageBucket: "personalproject-c291a.appspot.com",
    messagingSenderId: "24699574002",
    appId: "1:24699574002:web:515a14f04d480970ba226b"
  };
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)