"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiLoader, 
  FiEye, 
  FiEyeOff, 
  FiMail, 
  FiLock, 
  FiArrowRight 
} from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);

  const { loginWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await loginWithEmail(email, password);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password!");
    } finally {
      setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 bg-[#020617] overflow-hidden">
      
      {loading && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-md transition-all">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-cyan-400 font-black tracking-[0.3em] text-sm uppercase animate-pulse italic">
            Authorizing Access...
          </p>
        </div>
      )}

      <div className={`bg-[#1e293b]/30 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-800 transition-all duration-500 ${loading ? "scale-95 opacity-0" : "scale-100"}`}>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white italic tracking-tighter">
            WELCOME <span className="text-cyan-500 font-black">BACK!</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 italic">
            Login to your BSIBG account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-11 py-4 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white font-bold text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-11 py-4 pr-12 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white font-bold text-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="flex justify-end px-2">
            <button type="button" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-500 transition-colors">
              Forgot Password?
            </button>
          </div>

          <button 
            disabled={loading}
            className="group w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-2xl font-black text-black shadow-xl shadow-cyan-900/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase italic tracking-widest text-sm"
          >
            {loading ? <FiLoader className="animate-spin" /> : (
              <>
                Login Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[#0f172a] px-3 text-slate-600 tracking-[0.3em]">OR SECURE LOGIN</span></div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-slate-900/80 hover:bg-slate-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 border border-slate-800 transition-all text-white text-sm group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="google" />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
          New to the crew? <Link href="/register" className="text-cyan-500 hover:text-cyan-400 transition-colors ml-1 underline underline-offset-4">Join Now</Link>
        </p>
      </div>
    </div>
  );
}