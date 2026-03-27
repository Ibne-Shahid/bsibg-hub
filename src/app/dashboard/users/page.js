"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiPlusCircle, FiUser, FiTrendingUp } from "react-icons/fi";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [pointInputs, setPointInputs] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:5000/all-users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            });
    };

    const handlePointUpdate = async (userId, userName) => {
        const points = parseInt(pointInputs[userId]);
        
        if (!points || points <= 0) {
            return Swal.fire({
                title: "Invalid Points!",
                text: "Please enter a positive number to deploy points.",
                icon: "warning",
                background: "#0f172a",
                color: "#fff",
                confirmButtonColor: "#0891b2"
            });
        }

        try {
            const res = await fetch(`http://localhost:5000/users/update-points/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pointsToAdd: points })
            });
            const data = await res.json();
            
            if (data.success) {
                Swal.fire({
                    title: "Points Deployed!",
                    text: `${points} points added to ${userName}'s profile.`,
                    icon: "success",
                    background: "#0f172a",
                    color: "#fff",
                    confirmButtonColor: "#0891b2",
                    timer: 2000,
                    showConfirmButton: false
                });
                
                setPointInputs({ ...pointInputs, [userId]: "" });
                fetchUsers();
            }
        } catch (err) {
            Swal.fire({
                title: "System Error",
                text: "Failed to sync points with the hangar.",
                icon: "error",
                background: "#0f172a",
                color: "#fff"
            });
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 bg-[#020617] min-h-screen text-white">
            <div className="mb-10">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter">Manage <span className="text-cyan-500">Fleet</span></h1>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Admin Personnel & Point Distribution</p>
            </div>

            <div className="relative mb-8 max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search Driver Name or Email..."
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 outline-none transition-all italic"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <tr>
                            <th className="p-6">Driver Info</th>
                            <th className="p-6 text-center">Stats (Total/Monthly)</th>
                            <th className="p-6">Add Tour Points</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {filteredUsers.map((user, index) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={user._id} 
                                className="group hover:bg-cyan-500/5 transition-colors"
                            >
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                                            {user.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : <FiUser className="text-slate-500" />}
                                        </div>
                                        <div>
                                            <p className="font-black italic uppercase text-sm group-hover:text-cyan-400 transition-colors">{user.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-2 text-cyan-500 font-black italic text-sm">
                                            <FiTrendingUp size={14} /> {user.totalPoints || 0}
                                        </div>
                                        <div className="text-[9px] text-slate-600 font-bold uppercase">Monthly: {user.monthlyPoints || 0}</div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <input 
                                        type="number" 
                                        placeholder="Pts"
                                        value={pointInputs[user._id] || ""}
                                        onChange={(e) => setPointInputs({...pointInputs, [user._id]: e.target.value})}
                                        className="w-24 bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 text-xs focus:border-cyan-500 outline-none italic font-bold text-center"
                                    />
                                </td>
                                <td className="p-6 text-right">
                                    <button 
                                        onClick={() => handlePointUpdate(user._id, user.name)}
                                        className="bg-cyan-600 hover:bg-cyan-500 text-black px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all active:scale-95 flex items-center gap-2 ml-auto shadow-lg shadow-cyan-900/20"
                                    >
                                        <FiPlusCircle size={14} /> Update
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;