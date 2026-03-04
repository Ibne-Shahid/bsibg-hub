"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const registerWithEmail = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithEmail = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

  const updateUser = async (displayName, photoURL) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        // State update korar somoy current user er object ta ke clone kora bhalo
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

// --- EI LINE TA KHUBI JORURI ---
export const useAuth = () => useContext(AuthContext);