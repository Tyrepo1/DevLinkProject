import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC91ei87zfyJ7QtX-n2avx_Jp231NTbTwQ",
    authDomain: "devlinkproject.firebaseapp.com",
    projectId: "devlinkproject",
    storageBucket: "devlinkproject.appspot.com",
    messagingSenderId: "918607960638",
    appId: "1:918607960638:web:2d32cfb4bcc41b6f2b8f6f",
    measurementId: "G-XD1HZL8PLL"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)