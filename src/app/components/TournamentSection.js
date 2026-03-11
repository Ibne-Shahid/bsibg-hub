"use client";
import { motion } from "framer-motion";
import { Globe, Calendar, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";

const TournamentSection = () => {
    const topThree = [
        { name: "Yasin Arafaath", points: 2450, rank: 2, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQebNGy8SPFXp1OiK7FTUF39A1HhpClWxt0ng&s" },
        { name: "Rakib Hossain", points: 2800, rank: 1, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3RfwYLd1s5bv7xIRI0vaa6beIrNWNaTK-g&s" },
        { name: "Tanvir Siyam", points: 2100, rank: 3, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbId-N6PFRcbo0Dyk1sF0170Y04_WB9T9sMQ&s" },
    ];

    return (
        <section className="py-24 bg-[#020617] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="relative group p-1 bg-linear-to-br from-yellow-500/50 to-transparent rounded-[3rem]">
                        <div className="bg-[#0f172a] p-10 rounded-[2.9rem] h-full border border-slate-800">
                            <Globe className="text-yellow-500 w-10 h-10 mb-6" />
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">BSIBG Grand Slam</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 mb-6">Annual Championship • All Communities</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">The ultimate battle for glory. Top drivers from all major bus simulation communities compete once a year for the championship title.</p>
                            <span className="px-6 py-2 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">Ongoing Summer 2026</span>
                        </div>
                    </div>

                    <div className="relative group p-1 bg-linear-to-br from-cyan-500/50 to-transparent rounded-[3rem]">
                        <div className="bg-[#0f172a] p-10 rounded-[2.9rem] h-full border border-slate-800 text-right flex flex-col items-end">
                            <Calendar className="text-cyan-500 w-10 h-10 mb-6" />
                            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">BSIBG Monthly League</h3>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2 mb-6">Community Exclusive • Points Based</p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">Daily terminal-based point updates. Climb the ranks to secure your spot in the Top 3 and earn exclusive community badges.</p>
                            <Link href="/leaderboard" className="px-8 py-3 bg-cyan-600 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all">Join The Race</Link>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 flex items-center justify-center gap-3">
                            <Trophy className="text-cyan-500 w-8 h-8 md:w-12 md:h-12 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                            Top <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Drivers</span>
                        </h2>
                        <div className="h-1 w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent mb-16"></div>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-4 lg:gap-8">
                        {topThree.map((player) => (
                            <motion.div
                                key={player.rank}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`relative w-full max-w-75md:w-64 lg:w-72 group ${player.rank === 1 ? 'order-1 md:order-2 z-10' :
                                        player.rank === 2 ? 'order-2 md:order-1' : 'order-3'
                                    }`}
                            >
                                <div className={`absolute -inset-1 blur-2xl rounded-full transition-all duration-500 opacity-20 group-hover:opacity-40 ${player.rank === 1 ? 'bg-cyan-500' : 'bg-slate-500'
                                    }`}></div>

                                <div className={`relative bg-slate-900/90 backdrop-blur-xl border-2 p-6 rounded-[2.5rem] transition-all duration-300 ${player.rank === 1
                                        ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] md:pb-12'
                                        : 'border-slate-800'
                                    }`}>

                                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-lg ${player.rank === 1 ? 'bg-cyan-600 border-cyan-300 text-black' : 'bg-slate-800 border-slate-600 text-slate-300'
                                        }`}>
                                        Rank #{player.rank}
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className={`relative p-1 rounded-full mb-6 shadow-lg ${player.rank === 1
                                                ? 'bg-linear-to-tr from-cyan-400 to-blue-500 shadow-cyan-500/50'
                                                : 'bg-slate-700 shadow-black'
                                            }`}>
                                            <img
                                                src={player.img}
                                                alt={player.name}
                                                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-slate-900"
                                            />
                                        </div>

                                        <h3 className="text-white font-black uppercase text-lg tracking-tighter italic">
                                            {player.name}
                                        </h3>

                                        <div className="mt-4 w-full bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                                            <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1 text-center">Community Points</p>
                                            <div className="text-cyan-400 font-black text-2xl flex items-center justify-center gap-2">
                                                <TrendingUp size={20} className="drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                                                {player.points.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {player.rank === 1 && (
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-500 animate-bounce">
                                            <Trophy size={32} fill="currentColor" />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TournamentSection;