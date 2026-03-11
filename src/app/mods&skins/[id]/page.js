"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiDownload, FiArrowLeft, FiBox, FiCheckCircle, FiUser, FiHash, FiClock, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ModDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    
    const { user, loading: authLoading } = useAuth

    const [mod, setMod] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/assets/${id}`)
            .then(res => res.json())
            .then(data => {
                setMod(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                <p className="text-cyan-500 font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">Syncing Hangar...</p>
            </div>
        );
    }

    if (!mod) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-500 font-black uppercase italic">Asset Not Found</div>;

    const technicalGrid = [
        { icon: FiBox, label: "Asset Type", value: mod.category === 'mod' ? 'Vehicle Mod' : 'Custom Skin/Livery' },
        { icon: FiUser, label: "Creator", value: mod.creatorName || "BSIBG Official" },
        { icon: FiHash, label: "Serial", value: `#${mod._id?.slice(-6).toUpperCase()}` },
        { icon: FiCheckCircle, label: "Status", value: "Verified & Active" }
    ];

    return (
        <section className="min-h-screen bg-[#020617] py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/mods&skins" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors uppercase font-black text-[10px] tracking-widest mb-12 group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Return to Hangar
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="aspect-video rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl relative group bg-slate-900/50">
                            <img src={mod.images?.[0] || mod.image} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                            {mod.title}
                        </h1>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12">
                            Deployment Protocol: <span className="text-cyan-500 font-black">BSIBG-v3.0</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {technicalGrid.map((item, i) => (
                                <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl group hover:border-cyan-500/30 transition-all">
                                    <item.icon className="text-cyan-500 mb-3 opacity-70" size={18} />
                                    <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.2em]">{item.label}</p>
                                    <p className="text-white text-[11px] font-bold uppercase mt-1 italic leading-none">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900/20 border-l-4 border-cyan-500 p-8 rounded-r-3xl mb-12">
                            <h4 className="text-white text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FiClock className="text-cyan-500" /> Deployment Briefing
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                                {mod.description || "This high-fidelity hangar asset is optimized for precision driving. Ensure version compatibility before deployment."}
                            </p>
                        </div>

                        {user ? (
                            <a 
                                href={mod.downloadUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full py-6 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.4em] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-cyan-900/30 active:scale-95 group"
                            >
                                <FiDownload className="group-hover:translate-y-0.5 transition-transform" size={20} /> Deploy to Simulator
                            </a>
                        ) : (
                            <div className="space-y-4">
                                <button 
                                    onClick={() => router.push('/login')} 
                                    className="w-full py-6 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl flex items-center justify-center gap-3 transition-all border border-white/5 group shadow-xl cursor-pointer"
                                >
                                    <FiLock className="text-cyan-500 group-hover:scale-110 transition-transform" size={18} /> Login to Access Mod
                                </button>
                                <p className="text-center text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] italic">
                                    Secure connection required for file access
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ModDetails;