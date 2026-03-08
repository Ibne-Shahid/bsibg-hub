"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import { FiGrid, FiPlusCircle, FiUsers, FiLogOut, FiHome, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { dbUser, logOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter(); 

  const menuItems = [
    { name: "Overview", icon: <FiGrid />, path: "/dashboard", roles: ["admin", "moderator", "user"] },
    { name: "Upload Mod", icon: <FiPlusCircle />, path: "/dashboard/upload", roles: ["admin", "moderator"] },
    { name: "Manage Users", icon: <FiUsers />, path: "/dashboard/users", roles: ["admin"] },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-70 p-3 bg-cyan-600 text-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-55 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-60 bg-[#0f172a] border-r border-slate-800 p-6 flex flex-col transition-all duration-500 ease-in-out
        ${isOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0 lg:w-64"}
      `}>
        <div className="mb-10 px-4 mt-12 lg:mt-0">
          <h2 className="text-2xl font-black text-white italic tracking-tighter">
            BSIBG <span className="text-cyan-500 text-xs border border-cyan-500/30 px-2 py-0.5 rounded-md uppercase">Panel</span>
          </h2>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const hasAccess = item.roles.includes(dbUser?.role);
            const isActive = pathname === item.path;
            if (!hasAccess) return null;

            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                  isActive 
                  ? "bg-cyan-600 text-black shadow-xl shadow-cyan-600/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-5 py-3 text-slate-400 hover:text-cyan-400 text-sm font-semibold transition-colors">
            <FiHome /> Back to Site
          </Link>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl text-sm font-semibold transition-all cursor-pointer"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;