"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { registerWithEmail, updateUser, loginWithGoogle } = useAuth();
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
      let photoURL = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "bsibg-preset"); 
        
        // Error handling shoho fetch
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dyzfniecr/image/upload`,
          { 
            method: "POST", 
            body: formData 
          }
        ).catch(err => {
          throw new Error("Network error: Please check your internet or disable Ad-blocker.");
        });
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error.message || "Cloudinary upload failed");
        }

        const data = await res.json();
        photoURL = data.secure_url;
      } else {
        photoURL = `https://ui-avatars.com/api/?name=${displayName.replace(/\s+/g, '+')}&background=0ea5e9&color=fff`;
      }

      await registerWithEmail(email, password);
      await updateUser(displayName, photoURL);

      router.push("/");

    } catch (err) {
      console.error("Full Error Details:", err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 py-5 bg-[#020617]">
      <div className="bg-[#1e293b]/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700/50">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Create <span className="text-cyan-400">Account</span></h2>
          <p className="text-slate-400 mt-2">Join to share and download mods</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group w-20 h-20">
              <div className="w-full h-full rounded-full border border-slate-600 bg-[#0f172a] flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleImageChange}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Profile Photo</span>
          </div>

          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Gaming Name"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white placeholder:text-slate-500"
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white placeholder:text-slate-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white placeholder:text-slate-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            disabled={uploading}
            className="w-full bg-linear-to-r from-cyan-500 to-indigo-600 py-3 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
          >
            {uploading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1e293b] px-2 text-slate-500 font-bold tracking-widest">OR</span></div>
        </div>

        <button 
          onClick={async () => { await loginWithGoogle(); router.push("/"); }}
          type="button"
          className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 border border-slate-600 transition-colors text-white"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-slate-400 text-sm font-medium">
          Already have an account? <Link href="/login" className="text-cyan-400 font-bold hover:underline">Login Now</Link>
        </p>
      </div>
    </div>
  );
}