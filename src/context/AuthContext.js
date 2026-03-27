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

  const refetchUser = async (email) => {
    try {
        const res = await fetch(`http://localhost:5000/users?email=${email}`);
        const data = await res.json();
        setDbUser(data);
    } catch (err) {
        console.error("Refetch Error:", err);
    }
};

  const saveUserToDb = async (currentUser) => {
    const userData = {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
      role: 'user'
    };
    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (err) {
      console.error("DB Save Error:", err);
    }
  };

  const updateUserProfile = async (name, imageFile) => {
    try {
      let finalPhotoURL = dbUser.photoURL;

      if (imageFile) {
        const formData = new FormData();
        formData.append("upload_preset", "bsibg-preset");
        formData.append("file", imageFile);

        const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/dyzfniecr/image/upload`, {
          method: "POST",
          body: formData
        });
        const cloudData = await cloudRes.json();
        if (cloudRes.ok) finalPhotoURL = cloudData.secure_url;
      }

      const response = await fetch(`http://localhost:5000/users/update-profile/${dbUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, photoURL: finalPhotoURL })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        await refetchUser(dbUser.email); 
        return { success: true };
      } else {
        return { success: false, error: data.message || "Backend Sync Failed" };
      }

    } catch (error) {
      console.error("Update Error:", error);
      return { success: false, error: "Server unreachable. Check if Backend is running." };
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
        } finally {
          setLoading(false);
        }
      } else {
        setDbUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const savedData = await saveUserToDb(result.user);
      setDbUser(savedData);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const registerWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  return (
    <AuthContext value={{
      user, dbUser, loading, loginWithGoogle, registerWithEmail, loginWithEmail, logOut, updateUserProfile
    }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => useContext(AuthContext);