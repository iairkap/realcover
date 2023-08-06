import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbJBIAFDUphzN2s8KxvVFM1eQTva4U-LE",
  authDomain: "real-cover.firebaseapp.com",
  projectId: "real-cover",
  storageBucket: "real-cover.appspot.com",
  messagingSenderId: "308908780968",
  appId: "1:308908780968:web:8a3176ab8b84c34acc019d",
  measurementId: "G-RQFL8DH01N",
};
/* const firebaseConfig = {
  apiKey: "AIzaSyD4KTDJvXhkegxDEGghcSZLZdOkOd3KuTg",
  authDomain: "real-de130.firebaseapp.com",
  projectId: "real-de130",
  storageBucket: "real-de130.appspot.com",
  messagingSenderId: "411615273883",
  appId: "1:411615273883:web:a1571b15413dc276fcb73e",
  measurementId: "G-Z29JBD80BZ",
}; */

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function extractImageNameFromURL(url) {
  let urlParts = url.split("/");
  let imageNameWithExtension = urlParts[urlParts.length - 1].split("?")[0];
  let imageNameParts = imageNameWithExtension.split(".");
  return imageNameParts[0];
}

export { storage, ref, listAll, getDownloadURL, extractImageNameFromURL };
