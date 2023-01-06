import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBk1p9MOdJwUAtFk6XnBoBNMZR5XnCtKuQ",
    authDomain: "firstgram-next.firebaseapp.com",
    projectId: "firstgram-next",
    storageBucket: "firstgram-next.appspot.com",
    messagingSenderId: "1087179565277",
    appId: "1:1087179565277:web:b099abc8765be5a76a5334"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 今回はfirestoreを使う、これでdbにfirebaseに保存されたデータが格納される
const db = getFirestore(app);
const storage = getStorage(app);

// 上記2つの変数をどこででも使えるようにexportする
export { db, storage };

//Firebaseの認証機能を使う場合に必要な記述
export const auth = getAuth(app);
