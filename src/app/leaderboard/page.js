"use client";
import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Leaderboard = () => {
    // Dummy Data for Top 10 (Pore backend theke fetch hobe)
    const topTen = [
        { id: 1, name: "Rakib Hossain", points: 2800, rank: 1, status: "Legend" },
        { id: 2, name: "Sabbir Ahmed", points: 2450, rank: 2, status: "Pro" },
        { id: 3, name: "Tanvir Siyam", points: 2100, rank: 3, status: "Pro" },
        { id: 4, name: "Anik Mondal", points: 1950, rank: 4, status: "Expert" },
        { id: 5, name: "Mahim Islam", points: 1800, rank: 5, status: "Expert" },
        { id: 6, name: "Arif Rayhan", points: 1720, rank: 6, status: "Expert" },
        { id: 7, name: "Sajid Hasan", points: 1650, rank: 7, status: "Driver" },
        { id: 8, name: "Imran Khan", points: 1580, rank: 8, status: "Driver" },
        { id: 9, name: "Emon Ahmed", points: 1420, rank: 9, status: "Driver" },
        { id: 10, name: "Zubayer Alim", points: 1300, rank: 10, status: "Driver" },
    ];

    return (
        <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-4 md:px-10">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-125 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
                            Hall of <span className="text-cyan-500">Fame</span>
                        </h1>
                        <p className="text-slate-400 mt-2 font-medium">BSIBG Monthly League - Top 10 Drivers</p>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Season</p>
                            <p className="text-white font-bold italic uppercase">March 2026</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="space-y-3">
                    {topTen.map((player, index) => (
                        <motion.div
                            key={player.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group relative overflow-hidden flex items-center gap-4 md:gap-8 p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                                player.rank <= 3 
                                ? 'bg-linear-to-r from-cyan-950/40 to-transparent border-cyan-500/30' 
                                : 'bg-slate-900/30 border-slate-800/50 hover:border-slate-700'
                            }`}
                        >
                            {/* Rank Number */}
                            <div className={`w-10 md:w-14 text-2xl md:text-4xl font-black italic ${
                                player.rank === 1 ? 'text-yellow-500' : 
                                player.rank === 2 ? 'text-slate-300' : 
                                player.rank === 3 ? 'text-orange-400' : 'text-slate-600'
                            }`}>
                                {player.rank < 10 ? `0${player.rank}` : player.rank}
                            </div>

                            {/* Avatar */}
                            <div className="relative">
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 ${
                                    player.rank <= 3 ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-800'
                                }`}>
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                                        <User size={30} />
                                    </div>
                                </div>
                                {player.rank <= 3 && (
                                    <div className="absolute -top-2 -right-2">
                                        <Medal size={20} className={player.rank === 1 ? 'text-yellow-500' : player.rank === 2 ? 'text-slate-300' : 'text-orange-400'} />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-white font-black text-base md:text-xl uppercase tracking-tighter italic group-hover:text-cyan-400 transition-colors">
                                    {player.name}
                                </h3>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
                                    {player.status}
                                </span>
                            </div>

                            {/* Points */}
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-1 md:gap-2 text-cyan-400 font-black text-lg md:text-2xl italic leading-none">
                                    <TrendingUp size={18} className="hidden md:block" />
                                    {player.points.toLocaleString()}
                                </div>
                                <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-600 tracking-tighter mt-1">Total Points</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center text-slate-500 text-xs font-medium uppercase tracking-[0.3em]">
                    Points are updated daily based on terminal performance
                </div>
            </div>
        </main>
    );
};

export default Leaderboard;