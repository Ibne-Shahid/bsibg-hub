"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiInfo, FiLoader, FiLock } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

const AllAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [category, setCategory] = useState("all");
    
    const { user } = useAuth();
    const router = useRouter();

    const fetchAssets = useCallback(async (isNewCategory = false) => {
        if (loading || (!hasMore && !isNewCategory)) return;
        setLoading(true);

        const currentPage = isNewCategory ? 1 : page;

        try {
            const res = await fetch(`http://localhost:5000/all-assets?page=${currentPage}&limit=10&category=${category}`);
            const data = await res.json();

            if (isNewCategory) {
                setAssets(data.assets);
                setPage(2);
            } else {
                setAssets(prev => {
                    const newAssets = data.assets.filter(
                        newAsset => !prev.some(existingAsset => existingAsset._id === newAsset._id)
                    );
                    return [...prev, ...newAssets];
                });
                setPage(prev => prev + 1);
            }

            setHasMore(data.hasMore);
        } catch (err) {
            console.error("Error loading assets:", err);
        } finally {
            setLoading(false);
        }
    }, [category, page, loading, hasMore]);

    useEffect(() => {
        setHasMore(true);
        fetchAssets(true);
    }, [category]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
                fetchAssets();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchAssets, hasMore, loading]);

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

    return (
        <section className="min-h-screen bg-[#020617] py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                            BSIBG <span className="text-cyan-500">Hangar</span>
                        </h1>
                        <p className="text-slate-500 text-xs font-bold tracking-[0.4em] uppercase mt-2">Browse & Deploy Premium Assets</p>
                    </div>

                    <div className="flex items-center bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-md">
                        {["all", "mod", "skin"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setCategory(type)}
                                className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${category === type
                                    ? "bg-cyan-600 text-black shadow-lg shadow-cyan-600/30"
                                    : "text-slate-500 hover:text-white"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <AnimatePresence mode="popLayout">
                        {assets.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: (index % 10) * 0.1 }}
                                className="group relative bg-slate-900/20 border border-slate-800/50 rounded-[3rem] overflow-hidden hover:border-cyan-500/40 transition-all duration-500"
                            >
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={item.images?.[0] || item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute top-8 left-8">
                                        <span className="px-5 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 text-[10px] font-black uppercase rounded-full tracking-widest">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-10 -mt-20 relative z-10">
                                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-4xl shadow-2xl">
                                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                                            Engineering by <span className="text-slate-300 italic">{item.creatorName || "BSIBG Official"}</span>
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={`/mods&skins/${item._id}`}
                                                className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] border border-white/5 transition-all"
                                            >
                                                <FiInfo /> View Specs
                                            </Link>
                                            <a
                                                href={item.downloadUrl}
                                                onClick={(e) => handleDownloadClick(e, item.downloadUrl)}
                                                target={user ? "_blank" : "_self"}
                                                rel="noopener noreferrer"
                                                className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-black rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-cyan-600/20 active:scale-95"
                                            >
                                                {user ? <FiDownload /> : <FiLock />} {user ? "Get" : "Unlock"}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {loading && (
                    <div className="mt-20 flex flex-col items-center justify-center gap-4">
                        <FiLoader className="text-4xl text-cyan-500 animate-spin" />
                        <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em]">Synchronizing Hangar...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllAssets;