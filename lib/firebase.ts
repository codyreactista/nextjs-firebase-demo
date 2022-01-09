import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBf4IBPEFj7fUjIeJLFl1cFQ4Yy0oqLiU8",
  authDomain: "nextjs-firebase-demo-928b0.firebaseapp.com",
  projectId: "nextjs-firebase-demo-928b0",
  storageBucket: "nextjs-firebase-demo-928b0.appspot.com",
  messagingSenderId: "1024899548781",
  appId: "1:1024899548781:web:be1acdc02d0907f7632164",
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore();
export const storage = getStorage(app);

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = (await getDocs(q)).docs[0];

  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
