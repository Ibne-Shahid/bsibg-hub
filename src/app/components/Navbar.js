"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/context/AuthContext"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logOut } = useAuth(); 
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#0f172a] text-white border-b border-slate-700 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
              <div className="relative h-10 w-10 p-0.5 rounded-full bg-linear-to-r from-cyan-400 to-indigo-500">
                <Image 
                  src="/Gemini_Generated_Image_pc55zdpc55zdpc55.png" 
                  alt="Logo"
                  width={40}
                  height={40}
                  className="rounded-full bg-[#0f172a]"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">
                BSIBG<span className="text-white ml-1 text-sm font-light uppercase tracking-widest">Family</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Home</Link>
            <Link href="/mods" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">All Mods</Link>
            
            <div className="h-6 w-px bg-slate-700 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/upload" className="bg-linear-to-r from-cyan-500 to-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
                  Upload
                </Link>
                
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 outline-none focus:ring-2 focus:ring-cyan-500 rounded-full transition-all"
                  >
                    <img 
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=22d3ee&color=fff`} 
                      alt="User" 
                      className="h-9 w-9 rounded-full border-2 border-cyan-400 shadow-md object-cover"
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-slate-800">
                        <p className="text-sm font-bold text-white truncate">{user.displayName || "Driver"}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition">
                        My Profile
                      </Link>
                      <button 
                        onClick={() => {
                          logOut();
                          setIsProfileOpen(false);
                        }} 
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition">Login</Link>
                <Link href="/register" className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/20 transition-all">Register</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2 focus:outline-none">
               <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 {isOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" /> : <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth={2} strokeLinecap="round" />}
               </svg>
             </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'} md:hidden bg-[#0f172a] border-b border-slate-700 overflow-hidden transition-all duration-300`}>
        <div className="px-4 space-y-3 flex flex-col">
          <Link href="/" onClick={() => setIsOpen(false)} className="py-2 text-slate-300 border-b border-slate-800/50">Home</Link>
          <Link href="/mods" onClick={() => setIsOpen(false)} className="py-2 text-slate-300 border-b border-slate-800/50">All Mods</Link>
          {user ? (
             <>
               <div className="flex items-center gap-3 py-2 border-b border-slate-800/50">
                 <img src={user.photoURL} className="h-8 w-8 rounded-full object-cover" alt="user" />
                 <span className="text-sm font-bold">{user.displayName}</span>
               </div>
               <Link href="/upload" onClick={() => setIsOpen(false)} className="py-2 text-cyan-400">Upload Mod</Link>
               <button onClick={() => { logOut(); setIsOpen(false); }} className="text-left py-2 text-red-400 font-bold">Logout</button>
             </>
          ) : (
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-slate-800 rounded-xl">Login</Link>
              <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-xl font-bold">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;