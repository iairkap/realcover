import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbJBIAFDUphzN2s8KxvVFM1eQTva4U-LE",
  authDomain: "real-cover.firebaseapp.com",
  projectId: "real-cover",
  storageBucket: "real-cover.appspot.com",
  messagingSenderId: "308908780968",
  appId: "1:308908780968:web:8a3176ab8b84c34acc019d",
  measurementId: "G-RQFL8DH01N",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app); // <-- Importante: Usar getAuth con el app
const googleProvider = new GoogleAuthProvider();

function extractImageNameFromURL(url) {
  let urlParts = url.split("/");
  let imageNameWithExtension = urlParts[urlParts.length - 1].split("?")[0];
  let imageNameParts = imageNameWithExtension.split(".");
  return imageNameParts[0];
}

export {
  storage,
  ref,
  listAll,
  getDownloadURL,
  extractImageNameFromURL,
  auth,
  googleProvider,
};
