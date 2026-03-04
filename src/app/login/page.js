"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      router.push("/");
    } catch (err) {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] px-4 bg-[#020617]">
      <div className="bg-[#1e293b]/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Welcome <span className="text-cyan-400">Back!</span></h2>
          <p className="text-slate-400 mt-2">Login to manage your mods</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-white"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-linear-to-r from-cyan-500 to-indigo-600 py-3 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-transform">
            Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#1e293b] px-2 text-slate-500 font-bold tracking-widest">OR</span></div>
        </div>

        <button 
          onClick={() => { loginWithGoogle(); router.push("/"); }}
          className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 border border-slate-600 transition-colors"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-slate-400 text-sm">
          Don't have an account? <Link href="/register" className="text-cyan-400 font-bold hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
}