import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBf4IBPEFj7fUjIeJLFl1cFQ4Yy0oqLiU8",
  authDomain: "nextjs-firebase-demo-928b0.firebaseapp.com",
  projectId: "nextjs-firebase-demo-928b0",
  storageBucket: "nextjs-firebase-demo-928b0.appspot.com",
  messagingSenderId: "1024899548781",
  appId: "1:1024899548781:web:be1acdc02d0907f7632164"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
