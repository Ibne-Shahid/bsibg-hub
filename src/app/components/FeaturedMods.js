"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiInfo } from "react-icons/fi";
import Link from "next/link";

const FeaturedMods = () => {
  const [mods, setMods] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/latest-assets")
      .then((res) => res.json())
      .then((data) => {
        setMods(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

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
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
            BSIBG <span className="text-cyan-500">Showcase</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
            The newest additions to the hangar
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            [1, 2, 3].map(n => <Skeleton key={n} />)
          ) : (
            mods.map((mod, index) => (
              <motion.div
                key={mod._id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <h3 className="text-xl font-bold text-white line-clamp-1 uppercase italic tracking-tighter mb-4">
                    {mod.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-1 uppercase">
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
                      <FiDownload /> Get
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {!loading && mods.length > 0 && (
          <div className="mt-16 text-center">
            <Link 
              href="/mods&skins" 
              className="group inline-flex flex-col items-center"
            >
              <span className="text-slate-500 group-hover:text-cyan-500 font-black uppercase tracking-[0.3em] text-[10px] transition-all">
                Explore Full Hangar
              </span>
              <div className="w-10 h-px bg-slate-800 group-hover:w-24 group-hover:bg-cyan-500 transition-all mt-2"></div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMods;