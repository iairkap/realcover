import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY_B,
  authDomain: "real-de130.firebaseapp.com",
  projectId: "real-de130",
  storageBucket: "real-de130.appspot.com",
  messagingSenderId: "411615273883",
  appId: "1:411615273883:web:a1571b15413dc276fcb73e",
  measurementId: "G-Z29JBD80BZ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function extractImageNameFromURL(url) {
  let urlParts = url.split("/");
  let imageNameWithExtension = urlParts[urlParts.length - 1].split("?")[0];
  let imageNameParts = imageNameWithExtension.split(".");
  return imageNameParts[0];
}

export { storage, ref, listAll, getDownloadURL, extractImageNameFromURL };
