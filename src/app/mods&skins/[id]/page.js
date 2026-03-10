"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiDownload, FiArrowLeft, FiBox, FiCheckCircle, FiUser, FiHash, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

const ModDetails = () => {
    const { id } = useParams();
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

    if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-cyan-500 font-black uppercase tracking-[0.5em] animate-pulse">Syncing Hangar...</div>;
    if (!mod) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-red-500 font-black uppercase italic">Asset Not Found</div>;

    const technicalGrid = [
        { 
            icon: FiBox, 
            label: "Asset Type", 
            value: mod.category === 'mod' ? 'Vehicle Mod' : 'Custom Skin/Livery' 
        },
        { 
            icon: FiUser, 
            label: "Creator", 
            value: mod.creatorName || "BSIBG Official" 
        },
        { 
            icon: FiHash, 
            label: "Serial", 
            value: `#${mod._id?.slice(-6).toUpperCase()}` 
        },
        { 
            icon: FiCheckCircle, 
            label: "Status", 
            value: "Verified & Active" 
        }
    ];

    return (
        <section className="min-h-screen bg-[#020617] py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/mods&skins" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors uppercase font-black text-[10px] tracking-widest mb-12 group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Hangar
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="aspect-video rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl relative group">
                            <img src={mod.images?.[0] || mod.image} alt={mod.title} className="w-full h-full object-cover" />
                        </div>
                        
                        {mod.images?.length > 1 && (
                            <div className="grid grid-cols-4 gap-4 mt-8">
                                {mod.images.map((img, i) => (
                                    <div key={i} className="h-20 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500 transition-all opacity-60 hover:opacity-100 cursor-pointer">
                                        <img src={img} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                            {mod.title}
                        </h1>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-12">
                            Deployment Protocol: <span className="text-cyan-500">BSIBG-v3.0</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-12">
                            {technicalGrid.map((item, i) => (
                                <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl group hover:border-cyan-500/30 transition-all">
                                    <item.icon className="text-cyan-500 mb-3 opacity-70" size={18} />
                                    <p className="text-slate-600 text-[8px] font-black uppercase tracking-[0.2em]">{item.label}</p>
                                    <p className="text-white text-[11px] font-bold uppercase mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900/20 border-l-4 border-cyan-500 p-8 rounded-r-3xl mb-12">
                            <h4 className="text-white text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FiClock className="text-cyan-500" /> Deployment Briefing
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                                {mod.description || "This premium hangar asset is optimized for high-performance simulation. Ensure your game version is compatible before initiating deployment."}
                            </p>
                        </div>

                        <a 
                          href={mod.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-6 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase text-xs tracking-[0.4em] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-cyan-900/30 active:scale-95 group"
                        >
                            <FiDownload className="group-hover:translate-y-0.5 transition-transform" size={20} /> Deploy to Simulator
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ModDetails;