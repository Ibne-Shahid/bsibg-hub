"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, History, Trophy, Loader2, Edit3, Camera, Save, PlusCircle 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Swal from 'sweetalert2';

const ProfileDashboard = () => {
    const { dbUser, loading, updateUserProfile } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        const name = e.target.name.value;

        const result = await updateUserProfile(name, selectedImage);
        
        if (result.success) {
            setIsEditModalOpen(false);
            setSelectedImage(null);
            setPreview(null);
            
            Swal.fire({
                icon: 'success',
                title: 'PROFILE SYNCED',
                text: 'Your identity has been updated across the network!',
                background: '#1e293b', color: '#fff', confirmButtonColor: '#0891b2',
                timer: 2000, showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'SYNC FAILED',
                text: result.error,
                background: '#1e293b', color: '#fff', confirmButtonColor: '#ef4444'
            });
        }
        setIsUpdating(false);
    };

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-cyan-500">
            <Loader2 className="animate-spin" size={40} />
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-slate-500">Accessing Data...</p>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
            
            <motion.section 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 relative overflow-hidden"
            >
                <div className="relative">
                    <div className="w-32 h-32 rounded-3xl border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden">
                        <img src={dbUser?.photoURL} className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-black px-3 py-1 rounded-lg font-black text-[10px] italic uppercase leading-none shadow-lg">
                        {dbUser?.role || 'User'}
                    </div>
                </div>

                <div className="text-center md:text-left space-y-2 flex-1">
                    <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{dbUser?.name}</h1>
                    <p className="text-slate-500 font-bold text-sm tracking-wide">{dbUser?.email}</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                        <div className="bg-slate-800/50 px-5 py-2.5 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1 leading-none">Lifetime Points</p>
                            <p className="text-cyan-400 font-black text-2xl italic leading-none">{dbUser?.totalPoints?.toLocaleString() || 0}</p>
                        </div>
                        
                        <button 
                            onClick={() => setIsEditModalOpen(true)}
                            className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2 text-[10px] font-black uppercase italic transition-all"
                        >
                            <Edit3 size={14} /> Update Profile
                        </button>
                    </div>
                </div>
            </motion.section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<Calendar size={18}/>} title="Monthly Drive" value={dbUser?.monthlyPoints || 0} color="cyan" />
                <StatCard icon={<Trophy size={18}/>} title="Tournament Best" value={`#${dbUser?.bestPosition || '--'}`} color="orange" />
                <StatCard icon={<History size={18}/>} title="Performance Log" value={dbUser?.pointsHistory?.length || 0} color="purple" subtitle="Activities" />
            </div>

            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                            <h2 className="text-2xl font-black text-white italic uppercase mb-8">Edit Identity</h2>
                            <form onSubmit={handleUpdateSubmit} className="space-y-6">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-slate-700 group-hover:border-cyan-500/50 bg-slate-900 flex items-center justify-center overflow-hidden transition-all">
                                            {preview || dbUser?.photoURL ? (
                                                <img src={preview || dbUser?.photoURL} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <Camera className="text-slate-600" />
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                                        <div className="absolute -bottom-2 -right-2 bg-cyan-600 p-1.5 rounded-lg">
                                            <PlusCircle size={14} className="text-black" />
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-slate-500 font-black uppercase mt-3 tracking-widest">Change Profile Picture</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Display Name</label>
                                    <input name="name" type="text" defaultValue={dbUser?.name} required className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all" />
                                </div>
                                <button disabled={isUpdating} className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-black py-4 rounded-2xl uppercase italic flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50">
                                    {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    {isUpdating ? "Syncing..." : "Confirm Changes"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const StatCard = ({ icon, title, value, color, subtitle = "Current Season" }) => (
    <motion.div whileHover={{ y: -5 }} className="bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-800 hover:border-white/10 transition-all">
        <div className={`flex items-center gap-3 mb-6 text-${color}-500 font-black italic uppercase text-xs`}>
            {icon} {title}
        </div>
        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">{subtitle}</p>
        <p className="text-4xl font-black text-white italic tracking-tighter">{value}</p>
    </motion.div>
);

export default ProfileDashboard;