import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAKEgvqRETpDLPgdO0jheZNAzV_MdokHHE",
  authDomain: "bsibg-hub.firebaseapp.com",
  projectId: "bsibg-hub",
  storageBucket: "bsibg-hub.firebasestorage.app", 
  messagingSenderId: "418370828737",
  appId: "1:418370828737:web:fcff0e0a944039d9fa5740",
  measurementId: "G-3RT5LKCBFG"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;