"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { registerWithEmail, loginWithGoogle, updateUser } = useAuth();
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!displayName) return alert("Please enter your Gaming Name");
    
    setUploading(true);
    try {
      const userCredential = await registerWithEmail(email, password);
      const user = userCredential.user;

      let photoURL = "";
      
      if (image) {
        try {
          const imageRef = ref(storage, `profiles/${user.uid}`);
          const uploadResult = await uploadBytes(imageRef, image);
          photoURL = await getDownloadURL(uploadResult.ref);
        } catch (storageErr) {
          console.error("Storage Error:", storageErr);
          photoURL = `https://ui-avatars.com/api/?name=${displayName.replace(/\s+/g, '+')}&background=0ea5e9&color=fff`;
        }
      } else {
        photoURL = `https://ui-avatars.com/api/?name=${displayName.replace(/\s+/g, '+')}&background=0ea5e9&color=fff`;
      }

      await updateUser(displayName, photoURL);

      window.location.href = "/"; 

    } catch (err) {
      console.error("Reg Error:", err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-4 bg-[#020617]">
      <div className="bg-[#1e293b]/30 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-lg border border-slate-700/50 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[120px]"></div>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Join the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">Crew</span>
          </h2>
          <p className="text-slate-400 mt-2 font-medium">BSIBG Hub - Bangladesh Gaming Community</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Avatar Upload Container */}
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group w-28 h-28">
              <div className="w-full h-full rounded-full border-2 border-indigo-500/50 p-1 group-hover:border-cyan-400 transition-all duration-300 overflow-hidden bg-slate-800">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 text-xs">Upload Photo</div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleImageChange}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">Driver Identity Photo</span>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Gaming Name"
              className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all"
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email"
              className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-cyan-500 outline-none text-white transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            disabled={uploading}
            className="group relative w-full overflow-hidden rounded-2xl p-0.5 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-indigo-500 to-purple-600 animate-gradient-x group-hover:animate-pulse"></div>
            <div className="relative flex h-full w-full items-center justify-center bg-slate-950 rounded-[14px] py-4 transition-all group-hover:bg-transparent">
              <span className="font-black text-white tracking-widest uppercase">
                {uploading ? "SYNCING DATA..." : "CREATE PROFILE"}
              </span>
            </div>
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold"><span className="bg-[#131b2b] px-4 text-slate-500 italic">Quick Setup</span></div>
        </div>

        <button 
          onClick={handleGoogleSignup}
          type="button"
          className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border border-slate-700 hover:bg-white hover:text-black transition-all duration-300"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
          GOOGLE SIGNUP
        </button>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            Already a driver? <Link href="/login" className="text-cyan-400 font-bold hover:text-white">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}