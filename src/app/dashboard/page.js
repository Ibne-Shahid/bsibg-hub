"use client";
import { useEffect, useState } from "react";
import { FiUsers, FiBox, FiLayers } from "react-icons/fi";

const DashboardOverview = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalMods: 0, totalSkins: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/admin-stats")
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => console.error("Stats fetch error:", err));
    }, []);

    const statCards = [
        { label: "Total Drivers", value: stats.totalUsers, icon: <FiUsers />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
        { label: "Active Mods", value: stats.totalMods, icon: <FiBox />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
        { label: "Custom Skins", value: stats.totalSkins, icon: <FiLayers />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ];

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-black italic tracking-tighter text-white">
                    SYSTEM <span className="text-cyan-500 text-2xl border border-cyan-500/30 px-3 py-1 rounded-xl uppercase ml-2">Overview</span>
                </h1>
                <p className="text-slate-400 mt-2 font-medium">Real-time statistics of BSIBG community assets.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-all group">
                        <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                            {card.icon}
                        </div>
                        <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">{card.label}</h3>
                        <p className="text-4xl font-black text-white mt-2 tabular-nums">
                            {loading ? "..." : card.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8">
                <h2 className="text-xl font-bold text-white mb-4">Recent System Logs</h2>
                <p className="text-slate-500 text-sm italic">All systems are operational. No recent errors found.</p>
            </div>
        </div>
    );
};

export default DashboardOverview;