"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiUsers, FiPackage, FiActivity, FiArrowUpRight, FiLayers } from "react-icons/fi";

const DashboardOverview = () => {
  const { dbUser } = useAuth();
  const [stats, setStats] = useState({ totalUsers: 0, totalMods: 0, totalSkins: 0 });
  const [loading, setLoading] = useState(true);

  const [greeting, setGreeting] = useState("Hello");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin-stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statsCards = [
    { 
        label: "Community Members", 
        count: stats.totalUsers, 
        icon: <FiUsers />,
        color: "from-cyan-500 to-blue-600" 
    },
    { 
        label: "Total Mods", 
        count: stats.totalMods, 
        icon: <FiPackage />,
        color: "from-indigo-500 to-purple-600" 
    },
    { 
        label: "Total Skins", 
        count: stats.totalSkins, 
        icon: <FiLayers />,
        color: "from-emerald-500 to-teal-600" 
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto text-white space-y-10">
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tight italic">
                {greeting}, <span className="text-cyan-500">{dbUser?.name?.split(' ')[0] || "Driver"}</span>!
            </h1>
            <span className="px-3 py-1 bg-slate-800 text-cyan-500 text-[10px] font-black uppercase rounded-lg border border-slate-700">
                {dbUser?.role || "Member"}
            </span>
          </div>
          <p className="text-slate-400 mt-2 font-medium italic">
            {dbUser?.role === 'admin' || dbUser?.role === 'moderator'
              ? "Fleet management and system controls are ready." 
              : "Welcome to the BSIBG driver's lounge."}
          </p>
        </div>
        <div className="bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2 self-start md:self-center">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Database Connected</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, i) => (
          <div key={i} className="relative group overflow-hidden bg-slate-900 border border-slate-800 p-1 rounded-[2.5rem] transition-all hover:border-slate-700 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="bg-slate-950 p-8 rounded-[2.4rem] h-full">
                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center text-white text-2xl mb-4 shadow-lg`}>
                    {stat.icon}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                <h3 className="text-4xl font-black mt-2 tracking-tighter">
                    {loading ? <span className="animate-pulse text-slate-800 italic">...</span> : stat.count}
                </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10">
            <h2 className="text-2xl font-black mb-8 italic">Control Center</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {(dbUser?.role === 'admin' || dbUser?.role === 'moderator') ? (
                    <button className="group flex items-center justify-between p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:bg-cyan-600 hover:border-cyan-500 transition-all cursor-pointer shadow-lg hover:shadow-cyan-600/20">
                        <div className="text-left">
                            <p className="font-black text-lg group-hover:text-black italic">Upload Mod/Skin</p>
                            <p className="text-xs text-slate-400 group-hover:text-black/70 font-medium">Add new community assets</p>
                        </div>
                        <FiArrowUpRight className="text-2xl group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                ) : (
                    <div className="p-6 bg-slate-800/20 rounded-3xl border border-dashed border-slate-700 flex flex-col justify-center">
                        <p className="font-bold text-slate-500 italic">Upload Disabled</p>
                        <p className="text-[10px] text-slate-600 uppercase tracking-tighter mt-1">Contact admin to become a contributor</p>
                    </div>
                )}
                
                {dbUser?.role === 'admin' && (
                    <button className="group flex items-center justify-between p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 transition-all cursor-pointer">
                        <div className="text-left">
                            <p className="font-black text-lg group-hover:text-black italic">User Management</p>
                            <p className="text-xs text-slate-400 group-hover:text-black/70 font-medium">Configure roles & access</p>
                        </div>
                        <FiArrowUpRight className="text-2xl group-hover:text-black transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                )}
            </div>
        </div>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-[3rem] p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="z-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                    <FiActivity className="text-3xl text-cyan-500 animate-pulse" />
                </div>
                <h3 className="font-bold text-lg italic">Recent Activity</h3>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    {stats.totalUsers > 0 ? `New members recently joined the community.` : `Waiting for new activity...`}
                </p>
            </div>
            <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-bold transition-all">
                View Detailed Logs
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;