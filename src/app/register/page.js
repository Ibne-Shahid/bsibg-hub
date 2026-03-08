"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiLoader, 
  FiCheckCircle, 
  FiXCircle, 
  FiEye, 
  FiEyeOff, 
  FiUser, 
  FiMail, 
  FiLock,
  FiCamera 
} from "react-icons/fi"; 

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password Toggle State

  const { registerWithEmail, updateUser, loginWithGoogle } = useAuth();
  const router = useRouter();

  const isPasswordValid = (pass) => {
    const hasNumber = /\d/.test(pass);
    const hasAlpha = /[a-zA-Z]/.test(pass);
    const minLength = pass.length >= 6;
    return hasNumber && hasAlpha && minLength;
  };

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
    if (!isPasswordValid(password)) {
      return alert("Password does not meet requirements!");
    }

    setUploading(true);
    try {
      let photoURL = "";

      if (image) {
        const formData = new FormData();
        formData.append("upload_preset", "bsibg-preset");
        formData.append("file", image);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dyzfniecr/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (res.ok) photoURL = data.secure_url;
      } else {
        photoURL = `https://ui-avatars.com/api/?name=${displayName.replace(/\s+/g, '+')}&background=0ea5e9&color=fff`;
      }

      const result = await registerWithEmail(email, password);
      const user = result.user;

      if (user) {
        await updateUser(displayName, photoURL);

        const userData = {
          uid: user.uid,
          name: displayName,
          email: email,
          photoURL: photoURL,
          role: 'user'
        };

        const dbRes = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

        if (dbRes.ok) {
          router.push("/");
        } else {
          router.push("/");
        }
      }

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-10 bg-[#020617] overflow-hidden">
      
      {uploading && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-md">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="mt-6 text-cyan-400 font-black tracking-[0.3em] text-sm uppercase animate-pulse italic">
            Configuring Profile...
          </h2>
        </div>
      )}

      <div className={`bg-[#1e293b]/30 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-800 transition-all duration-500 ${uploading ? "scale-90 opacity-0" : "scale-100"}`}>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            JOIN THE <span className="text-cyan-500">CREW</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">BSIBG Community Registration</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex flex-col items-center mb-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-slate-700 group-hover:border-cyan-500/50 bg-slate-900/50 flex items-center justify-center overflow-hidden transition-all duration-300">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover shadow-2xl" />
                ) : (
                  <FiCamera className="text-3xl text-slate-600 group-hover:text-cyan-500 transition-colors" />
                )}
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
              <div className="absolute -bottom-2 -right-2 bg-cyan-600 p-1.5 rounded-lg shadow-lg">
                <FiPlusCircle className="text-black text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Gaming Name" className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-11 py-3.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white font-bold text-sm" onChange={(e) => setDisplayName(e.target.value)} required />
            </div>

            <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" placeholder="Email Address" className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-11 py-3.5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white font-bold text-sm" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className={`w-full bg-slate-900/50 border ${password && !isPasswordValid(password) ? "border-red-500/50" : "border-slate-700"} rounded-2xl px-11 py-3.5 pr-12 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white font-bold text-sm`} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-500 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <div className="flex flex-wrap gap-3 px-2">
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${password.length >= 6 ? 'text-cyan-400' : 'text-slate-600'}`}>
                   {password.length >= 6 ? <FiCheckCircle /> : <FiXCircle />} 6+ Chars
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${/\d/.test(password) ? 'text-cyan-400' : 'text-slate-600'}`}>
                   {/\d/.test(password) ? <FiCheckCircle /> : <FiXCircle />} 1 Number
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${/[a-zA-Z]/.test(password) ? 'text-cyan-400' : 'text-slate-600'}`}>
                   {/[a-zA-Z]/.test(password) ? <FiCheckCircle /> : <FiXCircle />} 1 Letter
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={uploading} 
            className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-2xl font-black text-black shadow-xl shadow-cyan-900/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase italic tracking-widest text-sm"
          >
            {uploading ? <FiLoader className="animate-spin" /> : "Start Engine"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[#10192c] px-3 text-slate-600 tracking-[0.3em]">OR CONNECT</span></div>
        </div>

        <button 
          onClick={async () => { await loginWithGoogle(); router.push("/"); }}
          type="button"
          className="w-full bg-slate-900/80 hover:bg-slate-800 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 border border-slate-800 transition-all text-white text-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
          Google Account
        </button>

        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
          Already a driver? <Link href="/login" className="text-cyan-500 hover:text-cyan-400 transition-colors ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
}

const FiPlusCircle = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
);