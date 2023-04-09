import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC-7NR_Z1Op7V0kKGGk4zb0vCujYuYbEYQ",
  authDomain: "clone-1211.firebaseapp.com",
  projectId: "clone-1211",
  storageBucket: "clone-1211.appspot.com",
  messagingSenderId: "611049512055",
  appId: "1:611049512055:web:2db7f64c5b621dbcfa7a72",
  measurementId: "G-DVXL6XX09D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { storage };
