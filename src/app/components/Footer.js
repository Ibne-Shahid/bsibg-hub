"use client";
import { useState } from "react";
import Link from "next/link";
import { FiYoutube, FiFacebook, FiGlobe, FiArrowUpRight, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'ALERT INITIALIZED!',
                    text: data.message || 'Redirecting to Community Hub...',
                    icon: 'success',
                    background: '#1e293b',
                    color: '#fff',
                    confirmButtonColor: '#0891b2',
                    timer: 2500
                });

                setEmail("");

                setTimeout(() => {
                    window.open("https://www.facebook.com/groups/986541809388996/?ref=share_group_link&rdid=I9JOBODJZ7c2SXxE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F1CamGefVsB#", "_blank");
                }, 2000);
            } else {
                throw new Error(data.message || "Something went wrong");
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
                background: '#1e293b',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <footer className="bg-[#020617] border-t border-slate-900 pt-20 pb-10 overflow-hidden">
            <motion.div
                className="container mx-auto px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tighter uppercase">
                            BSIBG <span className="text-cyan-500">Family</span>
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            The premier destination for high-fidelity bus modifications and skins for the simulation community. Built by drivers, for drivers.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: FiFacebook, link: "https://www.facebook.com/profile.php?id=61573062783592&rdid=wI0mWMkBHNOTOxc5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GhQXsy8qU#" },
                                { Icon: FiYoutube, link: "https://www.youtube.com/@bsibg_family" },
                                { Icon: FiGlobe, link: "https://yourwebsite.com" }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all shadow-lg"
                                >
                                    <item.Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8 italic">The Fleet</h4>
                        <ul className="space-y-4">
                            {["All Assets", "Bus Mods", "Custom Skins", "Creator Lab"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 hover:text-white text-sm font-bold uppercase transition-colors flex items-center group">
                                        {item}
                                        <motion.span initial={{ x: -5, opacity: 0 }} whileHover={{ x: 5, opacity: 1 }}>
                                            <FiArrowUpRight className="ml-1 text-cyan-500" />
                                        </motion.span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8 italic">Resources</h4>
                        <ul className="space-y-4">
                            {["Installation Guide", "Compatibility", "Community Forum", "Support Ticket"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-500 hover:text-white text-sm font-bold uppercase transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 shadow-2xl relative group overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[50px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>

                        <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-4 italic">Dispatch Center</h4>
                        <p className="text-slate-500 text-xs mb-6 font-medium">
                            Join <span className="text-white font-bold">10k+ drivers</span> from our Facebook community for early access to premium skins.
                        </p>

                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="YOUR EMAIL"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-[10px] font-black text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700 uppercase"
                            />
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-black transition-all shadow-xl shadow-cyan-900/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <FiLoader className="animate-spin" /> : "Initialize Alert"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">
                        © {currentYear} BSIBG Community. Developed by <span className="text-slate-400">Anas</span>.
                    </div>
                    <div className="flex gap-8">
                        {["Privacy Policy", "Terms of Service"].map((link) => (
                            <Link key={link} href="#" className="text-slate-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
                                {link}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;