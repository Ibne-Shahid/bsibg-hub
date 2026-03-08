"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiUploadCloud, FiLink, FiUser, FiInfo, FiLayers, FiX, FiLoader } from "react-icons/fi";
import Swal from 'sweetalert2';

const UploadMod = () => {
    const { dbUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]); 
    const [previews, setPreviews] = useState([]); 
    
    const [formData, setFormData] = useState({
        title: "",
        category: "mod",
        description: "",
        downloadUrl: "",
        creatorName: ""
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please upload at least one image!',
                background: '#1e293b',
                color: '#fff',
                confirmButtonColor: '#0891b2'
            });
        }
        
        setLoading(true); // 🟢 Start Loader
        try {
            const uploadedImageUrls = [];
            for (const file of images) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "bsibg-preset");
                
                const res = await fetch(`https://api.cloudinary.com/v1_1/dyzfniecr/image/upload`, {
                    method: "POST",
                    body: data
                });
                const cloudData = await res.json();
                uploadedImageUrls.push(cloudData.secure_url);
            }

            const finalData = {
                ...formData,
                images: uploadedImageUrls,
                uploaderEmail: dbUser?.email
            };

            const response = await fetch("http://localhost:5000/upload-mod", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData)
            });

            if (response.ok) {
                Swal.fire({
                    title: 'MISSION ACCOMPLISHED!',
                    text: 'Your asset is now live in the store.',
                    icon: 'success',
                    background: '#1e293b',
                    color: '#fff',
                    confirmButtonColor: '#0891b2',
                    timer: 3000
                });

                setFormData({ title: "", category: "mod", description: "", downloadUrl: "", creatorName: "" });
                setImages([]);
                setPreviews([]);
                e.target.reset(); 
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Something went wrong with the server.',
                background: '#1e293b',
                color: '#fff'
            });
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto space-y-8 min-h-screen">
            
            {loading && (
                <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-md">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin"></div>
                    </div>
                    <h2 className="mt-6 text-cyan-400 font-black tracking-[0.3em] text-sm uppercase animate-pulse italic">
                        Uploading to BSIBG Cloud...
                    </h2>
                </div>
            )}

            <header className="text-left">
                <h1 className="text-4xl font-black italic tracking-tighter text-white">
                    PUBLISH <span className="text-cyan-500">ASSETS</span>
                </h1>
                <p className="text-slate-400 font-medium">Add high-quality mods or skins to the BSIBG store.</p>
            </header>

            <form onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ${loading ? "scale-95 opacity-30 pointer-events-none" : "scale-100"}`}>
                
                {/* Details Section */}
                <div className="space-y-6 bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <FiInfo /> Basic Information
                        </label>
                        <input 
                            type="text" value={formData.title} placeholder="Mod/Skin Title" required
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                        <select 
                            value={formData.category}
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="mod">Category: MOD</option>
                            <option value="skin">Category: SKIN</option>
                        </select>
                        <textarea 
                            value={formData.description} placeholder="Brief details about this asset..." rows="4" required
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-cyan-500 transition-all font-medium text-sm"
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <FiLink /> Links & Credits
                        </label>
                        <input 
                            type="url" value={formData.downloadUrl} placeholder="Google Drive / Mega Link" required
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                        />
                        <input 
                            type="text" value={formData.creatorName} placeholder="Original Creator Name" required
                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                            onChange={(e) => setFormData({...formData, creatorName: e.target.value})}
                        />
                    </div>
                </div>

                <div className="bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-800 flex flex-col shadow-2xl">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                        <FiLayers /> Media Gallery (Multiple)
                    </label>
                    
                    <div className="relative group border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-3xl p-10 transition-all flex flex-col items-center justify-center gap-3 bg-slate-950/20">
                        <FiUploadCloud className="text-5xl text-slate-700 group-hover:text-cyan-500 transition-all group-hover:scale-110" />
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Select Screenshots</p>
                        <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        {previews.map((src, i) => (
                            <div key={i} className="relative group aspect-video rounded-xl overflow-hidden border border-slate-800">
                                <img src={src} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all">
                                    <FiX size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8">
                        <button 
                            disabled={loading}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-2xl font-black text-black shadow-xl shadow-cyan-900/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase italic tracking-widest text-sm"
                        >
                            {loading ? <FiLoader className="animate-spin" /> : "Initiate Upload"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UploadMod;