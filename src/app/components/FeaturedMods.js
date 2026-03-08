"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiInfo, FiLoader } from "react-icons/fi";
import Link from "next/link";

const FeaturedMods = () => {
  const [filter, setFilter] = useState("all");
  const [mods, setMods] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/all-assets")
      .then((res) => res.json())
      .then((data) => {
        const latestAssets = Array.isArray(data) 
          ? [...data].reverse().slice(0, 3) 
          : [];
        
        setMods(latestAssets);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredMods = filter === "all" ? mods : mods.filter(m => m.category === filter);

  const Skeleton = () => (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-4xl overflow-hidden animate-pulse">
      <div className="h-64 bg-slate-800/50"></div>
      <div className="p-8 space-y-4">
        <div className="h-6 bg-slate-800 rounded w-3/4"></div>
        <div className="flex gap-3">
          <div className="h-12 bg-slate-800 rounded-xl flex-1"></div>
          <div className="h-12 bg-slate-800 rounded-xl flex-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-[#020617]">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
              BSIBG <span className="text-cyan-500">Showcase</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Latest assets from the community</p>
          </div>

          <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
            {["all", "mod", "skin"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === type 
                  ? "bg-cyan-600 text-black shadow-lg shadow-cyan-600/40" 
                  : "text-slate-500 hover:text-white"
                }`}
              >
                {type === "all" ? "All" : type === "mod" ? "Mods" : "Skins"}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {loading ? (
            [1, 2, 3].map(n => <Skeleton key={n} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredMods.map((mod) => (
                <motion.div
                  key={mod._id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-slate-900/40 border border-slate-800/50 rounded-4xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/30 transition-colors"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={mod.images?.[0] || mod.image} 
                      alt={mod.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-5 left-5">
                      <span className="px-4 py-1.5 bg-cyan-500 text-black text-[10px] font-black uppercase rounded-full tracking-widest shadow-xl">
                        {mod.category === 'mod' ? 'Bus Mod' : 'Custom Skin'}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white line-clamp-1 uppercase italic tracking-tighter">{mod.title}</h3>
                    </div>
                    
                    <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-2 uppercase">
                        By <span className="text-slate-300 font-bold italic">{mod.creatorName || "BSIBG Driver"}</span>
                    </p>

                    <div className="flex gap-3">
                      <Link 
                        href={`/mods/${mod._id}`} 
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-center font-black uppercase text-[10px] tracking-widest rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
                      >
                        <FiInfo /> Details
                      </Link>
                      
                      <a 
                        href={mod.downloadUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 active:scale-95"
                      >
                        <FiDownload /> Get Asset
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {!loading && mods.length > 0 && (
          <div className="mt-16 text-center">
             <Link href="/all-mods" className="text-slate-500 hover:text-cyan-500 font-black uppercase tracking-[0.3em] text-[10px] transition-all border-b border-slate-800 pb-2">
                Explore Full Hangar →
             </Link>
          </div>
        )}

        {!loading && filteredMods.length === 0 && (
            <div className="text-center py-20 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
                <FiLoader className="mx-auto text-4xl text-slate-700 mb-4 animate-spin" />
                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm">No assets found in this category</h3>
            </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMods;