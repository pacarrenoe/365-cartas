import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdsPxOXnq51S0HdbDtZU5f9_uVOqUakSg",
  authDomain: "cartas-365.firebaseapp.com",
  projectId: "cartas-365",
  storageBucket: "cartas-365.firebasestorage.app",
  messagingSenderId: "787439820293",
  appId: "1:787439820293:web:6843424f167ac6dbedc66c",
  measurementId: "G-CFLCG8B7TM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
