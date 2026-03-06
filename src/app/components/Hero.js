"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#020617]">
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-60 h-60 md:w-80 md:h-80 bg-cyan-500/10 blur-[120px] rounded-full z-0"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-72 h-72 md:w-96 md:h-96 bg-indigo-600/10 blur-[120px] rounded-full z-0"
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-950/30 backdrop-blur-md mb-8"
          >
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-[0.2em]">Welcome to BSIBG Family</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-extrabold md:font-black text-white leading-[1.1] md:leading-[0.85] tracking-tighter"
          >
            DRIVE YOUR <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-600">
              IMAGINATION
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-6 md:mt-8 text-slate-400 text-base md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed px-2"
          >
            Discover the most detailed BUSSID mods, premium bus skins, and exclusive map patches. Join the most active community in Bangladesh.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link href="/mods" className="group px-8 md:px-10 py-4 md:py-5 bg-linear-to-r from-cyan-500 to-blue-600 text-black font-extrabold rounded-2xl flex items-center justify-center gap-3 text-lg transition-all shadow-lg shadow-cyan-500/25">
                <FiDownload className="text-xl group-hover:animate-bounce" />
                Explore Mods
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ x: 5 }} className="w-full sm:w-auto">
              <Link href="/community" className="group px-8 md:px-10 py-4 md:py-5 border-2 border-slate-800 hover:border-slate-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-lg transition-all">
                Join Community
                <FiArrowRight className="text-xl group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#020617] to-transparent z-0" />
    </section>
  );
};

export default Hero;