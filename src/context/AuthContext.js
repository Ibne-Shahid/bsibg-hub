"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const saveUserToDb = async (currentUser) => {
    const userData = {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      role: 'gamer' 
    };

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      setDbUser(data);
    } catch (err) {
      console.error("DB Save Error:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const res = await fetch(`http://localhost:5000/users?email=${currentUser.email}`);
          const data = await res.json();
          setDbUser(data);
        } catch (err) {
          console.error("Error fetching user role:", err);
        }
      } else {
        setDbUser(null);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToDb(result.user); 
      return result;
    } catch (error) {
      console.error("Google Login Error:", error);
      throw error;
    }
  };

  const registerWithEmail = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithEmail = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

  const updateUser = async (displayName, photoURL) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        setUser({ ...auth.currentUser, displayName, photoURL });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ 
      user, 
      dbUser, 
      loading, 
      loginWithGoogle, 
      registerWithEmail, 
      loginWithEmail, 
      logOut, 
      updateUser 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);