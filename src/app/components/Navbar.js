"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { FiLayout, FiLogOut, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [shouldHide, setShouldHide] = useState(false);

    const { user, dbUser, logOut } = useAuth();
    const dropdownRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname && pathname.startsWith("/dashboard")) {
            setShouldHide(true);
        } else {
            setShouldHide(false);
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [pathname]);

    if (shouldHide) return null;

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
                            <span className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500 uppercase">
                                BSIBG<span className="text-white ml-1 text-[10px] font-black uppercase tracking-[0.3em] not-italic">Family</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-white font-black italic uppercase text-sm tracking-widest hover:text-cyan-400 transition-all">Home</Link>
                        <Link href="/mods&skins" className="text-white font-black italic uppercase text-sm tracking-widest hover:text-cyan-400 transition-all">Mods & Skins</Link>
                        <Link href="/leaderboard" className="text-white font-black italic uppercase text-sm tracking-widest hover:text-cyan-400 transition-all">
                            Leaderboard
                        </Link>

                        {user && (
                            <Link href="/dashboard" className="flex items-center gap-2 text-cyan-400 font-black italic uppercase text-sm tracking-widest hover:text-cyan-300 transition-all">
                                <FiLayout className="text-lg not-italic" /> Dashboard
                            </Link>
                        )}

                        <div className="h-6 w-px bg-slate-700 mx-2"></div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 pr-3 bg-slate-800/50 border border-slate-700 rounded-full transition-all hover:border-cyan-500/50"
                                    >
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=22d3ee&color=fff`}
                                            alt="User"
                                            className="h-8 w-8 rounded-full border border-cyan-400 shadow-md object-cover"
                                        />
                                        <FiChevronDown className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200">
                                            <div className="px-4 py-2 border-b border-slate-800">
                                                <p className="text-[10px] font-black italic text-white uppercase truncate">{user.displayName || "Driver"}</p>
                                                <p className="text-[9px] text-slate-500 truncate uppercase tracking-tighter">{dbUser?.role || "Member"}</p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    logOut();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-[10px] font-black italic uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition flex items-center gap-2"
                                            >
                                                <FiLogOut className="not-italic" /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-[10px] font-black italic uppercase tracking-widest text-slate-300 hover:text-white transition">Login</Link>
                                <Link href="/register" className="bg-white/10 border border-white/20 px-6 py-2 rounded-full text-[10px] font-black italic uppercase tracking-widest hover:bg-white/20 transition-all text-white">Register</Link>
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

            <div className={`${isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0'} md:hidden bg-[#0f172a] border-b border-slate-700 overflow-hidden transition-all duration-300`}>
                <div className="px-6 space-y-5 flex flex-col">
                    <Link href="/" onClick={() => setIsOpen(false)} className="text-white font-black italic uppercase text-xs tracking-widest">Home</Link>
                    <Link href="/mods&skins" onClick={() => setIsOpen(false)} className="text-white font-black italic uppercase text-xs tracking-widest">All Mods</Link>
                    <Link href="/leaderboard" onClick={() => setIsOpen(false)} className="text-white font-black italic uppercase text-xs tracking-widest">Leaderboard</Link>

                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-cyan-400 font-black italic uppercase text-xs tracking-widest flex items-center gap-2">
                                <FiLayout className="not-italic" /> Dashboard
                            </Link>
                            <button onClick={() => { logOut(); setIsOpen(false); }} className="text-left text-red-400 font-black italic uppercase text-xs tracking-widest flex items-center gap-2">
                                <FiLogOut className="not-italic" /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-4 bg-slate-800 rounded-xl text-[10px] font-black italic uppercase tracking-widest text-white">Login</Link>
                            <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-4 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-xl text-[10px] font-black italic uppercase tracking-widest text-white">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;