import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU6c8WIBq-nlbbqFaVKpC__b7Q7QFpIYI",
  authDomain: "codepen-clone-4f759.firebaseapp.com",
  projectId: "codepen-clone-4f759",
  storageBucket: "codepen-clone-4f759.appspot.com",
  messagingSenderId: "184482689554",
  appId: "1:184482689554:web:7d12d797efab0ce1331ecb"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
