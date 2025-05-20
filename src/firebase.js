// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFvTIRsW9HXe0Ox2NCra2xEmSe62klZW4",
  authDomain: "comparely-auth.firebaseapp.com",
  projectId: "comparely-auth",
  storageBucket: "comparely-auth.appspot.com",  // fix here
  messagingSenderId: "743513723448",
  appId: "1:743513723448:web:bd161be043013931accccd",
  measurementId: "G-PV2X6FQLHR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
