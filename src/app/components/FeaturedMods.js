"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiInfo, FiLock } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

const FeaturedMods = () => {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

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

  const handleDownloadClick = (e, downloadUrl) => {
    if (!user) {
      e.preventDefault();
      Swal.fire({
        title: "AUTHENTICATION REQUIRED",
        text: "Please login to your BSIBG account to deploy this asset from the hangar.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#06b6d4",
        cancelButtonColor: "#1e293b",
        confirmButtonText: "LOGIN NOW",
        background: "#0f172a",
        color: "#fff",
        customClass: {
          popup: "rounded-3xl border border-slate-800",
          title: "italic font-black italic",
          confirmButton: "rounded-xl font-bold tracking-widest",
          cancelButton: "rounded-xl font-bold tracking-widest",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

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
            [1, 2, 3].map((n) => <Skeleton key={n} />)
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
                      {mod.category === "mod" ? "Bus Mod" : "Custom Skin"}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-white line-clamp-1 uppercase italic tracking-tighter mb-4">
                    {mod.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-1 uppercase">
                    By{" "}
                    <span className="text-slate-300 font-bold italic">
                      {mod.creatorName || "BSIBG Driver"}
                    </span>
                  </p>

                  <div className="flex gap-3">
                    <Link
                      href={`/mods&skins/${mod._id}`}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white text-center font-black uppercase text-[10px] tracking-widest rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2"
                    >
                      <FiInfo /> View Specs
                    </Link>
                    <a
                      href={mod.downloadUrl}
                      onClick={(e) => handleDownloadClick(e, mod.downloadUrl)}
                      target={user ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 active:scale-95"
                    >
                      {user ? <FiDownload /> : <FiLock />} {user ? "Get" : "Unlock"}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMods;