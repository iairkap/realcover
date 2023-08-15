import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: "real-cover.firebaseapp.com",
  projectId: "real-cover",
  storageBucket: "real-cover.appspot.com",
  messagingSenderId: "308908780968",
  appId: "1:308908780968:web:8a3176ab8b84c34acc019d",
  measurementId: "G-RQFL8DH01N",
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
