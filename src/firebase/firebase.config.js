import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbJBIAFDUphzN2s8KxvVFM1eQTva4U-LE",
  authDomain: "real-cover.firebaseapp.com",
  projectId: "real-cover",
  storageBucket: "real-cover.appspot.com",
  messagingSenderId: "308908780968",
  appId: "1:308908780968:web:8a3176ab8b84c34acc019d",
  measurementId: "G-RQFL8DH01N",
};

let app;
let analytics;

if (typeof window !== "undefined" && !firebase.apps.length) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
