"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiPlusCircle, FiUsers, FiLogOut, FiHome, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { dbUser, logOut } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <FiGrid />, path: "/dashboard", roles: ["admin", "moderator", "user"] },
    { name: "Upload Mod", icon: <FiPlusCircle />, path: "/dashboard/upload", roles: ["admin", "moderator"] },
    { name: "Manage Users", icon: <FiUsers />, path: "/dashboard/users", roles: ["admin"] },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-60 p-3 bg-cyan-600 text-black rounded-xl shadow-lg"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`
        fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col z-50 transition-all duration-300
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-64"}
      `}>
        <div className="mb-10 px-4">
          <h2 className="text-2xl font-black text-white italic tracking-tighter">
            BSIBG <span className="text-cyan-500 text-sm uppercase">Panel</span>
          </h2>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const hasAccess = item.roles.includes(dbUser?.role);
            const isActive = pathname === item.path;
            if (!hasAccess) return null;

            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                  isActive 
                  ? "bg-cyan-600 text-black shadow-lg shadow-cyan-600/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-cyan-400 text-sm">
            <FiHome /> Home
          </Link>
          <button onClick={logOut} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;