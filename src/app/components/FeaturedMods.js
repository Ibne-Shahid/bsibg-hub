"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const FeaturedMods = () => {
  const [filter, setFilter] = useState("all");

  const mods = [
    {
      id: 1,
      name: "Hanif Enterprise - Volvo B11R",
      category: "mod",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
      downloads: "1.2k"
    },
    {
      id: 2,
      name: "Ena Transport Premium Skin",
      category: "skin",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600",
      downloads: "3.5k"
    },
    {
      id: 3,
      name: "Green Line Sleeper - Scania",
      category: "mod",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=601",
      downloads: "2.1k"
    },
  ];

  const filteredMods = filter === "all" ? mods : mods.filter(m => m.category === filter);

  return (
    <section className="py-24 bg-[#020617]">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
              BSIBG <span className="text-cyan-500">Showcase</span>
            </h2>
          </div>

          <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
            {["all", "mod", "skin"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                  filter === type 
                  ? "bg-cyan-600 text-black shadow-lg shadow-cyan-600/20" 
                  : "text-slate-400 hover:text-white"
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
          <AnimatePresence mode="popLayout">
            {filteredMods.map((mod) => (
              <motion.div
                key={mod.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group bg-slate-900/40 border border-slate-800/50 rounded-4xl overflow-hidden backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img src={mod.image} alt={mod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-cyan-500 text-black text-[10px] font-black uppercase rounded-full tracking-widest">
                      {mod.category === 'mod' ? 'Bus Mod' : 'Skin'}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6 line-clamp-1">{mod.name}</h3>
                  <div className="flex gap-3">
                    <Link href={`/mods/${mod.id}`} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-center font-bold rounded-xl transition-all border border-white/5">
                      Details
                    </Link>
                    <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20">
                      <FiDownload /> Get
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedMods;