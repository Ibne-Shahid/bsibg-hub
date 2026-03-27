"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, TrendingUp, User, ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

const Leaderboard = () => {
    const [topTen, setTopTen] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentMonthYear = new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        year: 'numeric' 
    }).format(new Date());

    useEffect(() => {
        fetch("http://localhost:5000/leaderboard-top-ten")
            .then(res => res.json())
            .then(data => {
                setTopTen(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const getStatus = (points) => {
        if (points >= 250) return "Legend";
        if (points >= 200) return "Pro";
        if (points >= 100) return "Expert";
        return "Driver";
    };

    return (
        <main className="min-h-screen bg-[#020617] pt-32 pb-20 px-4 md:px-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-125 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter">
                            Hall of <span className="text-cyan-500">Fame</span>
                        </h1>
                        <p className="text-slate-400 mt-2 font-medium italic uppercase tracking-tighter text-xs">BSIBG Monthly League - Top 10 Drivers</p>
                    </div>
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Current Season</p>
                            <p className="text-white font-bold italic uppercase">{currentMonthYear}</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="text-cyan-500 animate-pulse font-black italic uppercase tracking-widest">Accessing Driver Database...</div>
                    </div>
                ) : topTen.length > 0 ? (
                    <div className="space-y-3">
                        {topTen.map((player, index) => {
                            const rank = index + 1;
                            return (
                                <motion.div
                                    key={player._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`group relative overflow-hidden flex items-center gap-4 md:gap-8 p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 ${
                                        rank <= 3 
                                        ? 'bg-linear-to-r from-cyan-950/40 to-transparent border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.05)]' 
                                        : 'bg-slate-900/30 border-slate-800/50 hover:border-slate-700'
                                    }`}
                                >
                                    <div className={`w-10 md:w-14 text-2xl md:text-4xl font-black italic ${
                                        rank === 1 ? 'text-yellow-500' : 
                                        rank === 2 ? 'text-slate-300' : 
                                        rank === 3 ? 'text-orange-400' : 'text-slate-600'
                                    }`}>
                                        {rank < 10 ? `0${rank}` : rank}
                                    </div>

                                    <div className="relative">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 ${
                                            rank <= 3 ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-800'
                                        }`}>
                                            {player.photoURL ? (
                                                <img src={player.photoURL} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                                                    <User size={30} />
                                                </div>
                                            )}
                                        </div>
                                        {rank <= 3 && (
                                            <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full p-0.5">
                                                <Medal size={20} className={rank === 1 ? 'text-yellow-500 shadow-yellow-500' : rank === 2 ? 'text-slate-300' : 'text-orange-400'} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-white font-black text-base md:text-xl uppercase tracking-tighter italic group-hover:text-cyan-400 transition-colors truncate">
                                            {player.name}
                                        </h3>
                                        <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] ${
                                            rank <= 3 ? 'text-cyan-500' : 'text-slate-600'
                                        }`}>
                                            {getStatus(player.totalPoints)}
                                        </span>
                                    </div>

                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 md:gap-2 text-cyan-400 font-black text-lg md:text-2xl italic leading-none">
                                            <TrendingUp size={18} className="hidden md:block drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                                            {player.totalPoints?.toLocaleString() || 0}
                                        </div>
                                        <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-600 tracking-tighter mt-1">This Months Points</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900/40 border border-slate-800 border-dashed p-16 rounded-[3rem] text-center"
                    >
                        <Construction className="text-cyan-500 w-16 h-16 mx-auto mb-6 opacity-50" />
                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Ranking System Offline</h2>
                        <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto leading-relaxed font-medium">
                            The Hall of Fame is currently empty. Point deployment from the admin terminal is required to initialize the season rankings.
                        </p>
                    </motion.div>
                )}

                <div className="mt-12 text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.4em]">
                    Syncing with terminal data • Real-time Rank distribution
                </div>
            </div>
        </main>
    );
};

export default Leaderboard;