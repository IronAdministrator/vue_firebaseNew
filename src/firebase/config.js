import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp0kL_AzhBldOvfHXA7mKTDfQGYExMVJE",
  authDomain: "reading-list-fb.firebaseapp.com",
  projectId: "reading-list-fb",
  storageBucket: "reading-list-fb.appspot.com",
  messagingSenderId: "429102613509",
  appId: "1:429102613509:web:ebab8ff8b53b24690bc86c",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

export { db, auth };
