"use client";
import { motion } from "framer-motion";
import { Award, Target, Calendar, History, Trophy, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 

const ProfileDashboard = () => {
    const { dbUser, loading } = useAuth(); 

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="text-cyan-500 animate-spin" size={40} />
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Accessing Profile...</p>
            </div>
        );
    }

    if (!dbUser) {
        return (
            <div className="text-center py-20 text-slate-500 uppercase font-black">
                No user data found. Please login again.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
            
            <section className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] border border-slate-800 relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
                
                <div className="relative">
                    <div className="w-32 h-32 rounded-3xl border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden">
                        {dbUser?.photoURL ? (
                            <img 
                                src={dbUser.photoURL} 
                                className="w-full h-full object-cover" 
                                alt="Profile"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 italic font-black">
                                NO IMG
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-black px-3 py-1 rounded-lg font-black text-[10px] italic uppercase shadow-lg">
                        {dbUser?.role || 'Driver'}
                    </div>
                </div>

                <div className="text-center md:text-left space-y-2 flex-1">
                    <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                        {dbUser?.name}
                    </h1>
                    <p className="text-slate-500 font-bold text-sm md:text-base">{dbUser?.email}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                        <div className="bg-slate-800/50 px-5 py-2.5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Lifetime Points</p>
                            <p className="text-cyan-400 font-black text-2xl italic leading-none">
                                {dbUser?.totalPoints?.toLocaleString() || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/40 p-6 rounded-4xl border border-slate-800 hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-center gap-3 mb-6 text-cyan-500">
                        <Calendar size={20} className="group-hover:scale-110 transition-transform" />
                        <h3 className="font-black uppercase italic tracking-tighter text-white">Monthly Drive</h3>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Current Season</p>
                        <p className="text-4xl font-black text-white italic tracking-tighter">
                            {dbUser?.monthlyPoints?.toLocaleString() || 0}
                        </p>
                        <p className="text-[9px] text-cyan-500/50 font-bold uppercase mt-2">Points will reset next month</p>
                    </div>
                </div>

                <div className="bg-slate-900/40 p-6 rounded-4xl border border-slate-800 hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-3 mb-6 text-orange-500">
                        <Trophy size={20} className="group-hover:rotate-12 transition-transform" />
                        <h3 className="font-black uppercase italic tracking-tighter text-white">Tournament Stats</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
                            <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Entries</p>
                            <p className="text-2xl font-black text-white italic leading-none">{dbUser?.tournamentsJoined || 0}</p>
                        </div>
                        <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30">
                            <p className="text-[9px] text-slate-500 font-black uppercase mb-1">Best Finish</p>
                            <p className="text-2xl font-black text-orange-500 italic leading-none">
                                #{dbUser?.bestPosition || '--'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900/40 p-6 rounded-4xl border border-slate-800 hover:border-purple-500/30 transition-all group">
                    <div className="flex items-center gap-3 mb-6 text-purple-500">
                        <History size={20} />
                        <h3 className="font-black uppercase italic tracking-tighter text-white">Performance Log</h3>
                    </div>
                    <div className="space-y-3">
                        {dbUser?.pointsHistory?.length > 0 ? (
                            dbUser.pointsHistory.slice(0, 4).map((h, i) => (
                                <div key={i} className="flex justify-between items-center bg-slate-800/20 p-2 px-3 rounded-xl border border-white/5">
                                    <span className="text-slate-400 text-[10px] font-black uppercase italic">{h.month}</span>
                                    <span className="text-white font-black italic text-sm">+{h.points}</span>
                                </div>
                            ))
                        ) : (
                            <div className="py-4 text-center">
                                <p className="text-[10px] text-slate-700 font-black uppercase italic">No history logged</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;