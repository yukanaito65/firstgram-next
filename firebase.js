// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
//   const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_REACT_APP_NOT_SECRET_CODE,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: "firstgram-next.appspot.com",
//   messagingSenderId: "1087179565277",
//   appId: "1:1087179565277:web:b099abc8765be5a76a5334"
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_NOT_SECRET_CODE,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: "firstgram-next.appspot.com",
  messagingSenderId: "1087179565277",
  appId: "1:1087179565277:web:b099abc8765be5a76a5334"
};

console.log(process.env)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 今回はfirestoreを使う、これでdbにfirebaseに保存されたデータが格納される

// const db = getFirestore(app);
const storage = getStorage(app);
//Firebaseの認証機能を使う場合に必要な記述
const auth = getAuth(app);

// 上記2つの変数をどこででも使えるようにexportする
export { storage, auth };
