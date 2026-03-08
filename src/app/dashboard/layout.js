"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-cyan-500 font-black tracking-widest text-xs uppercase animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="flex bg-[#020617] min-h-screen overflow-x-hidden">
      <Sidebar></Sidebar>
      <main className="flex-1 w-full ml-0 lg:ml-64 p-6 md:p-10 lg:p-16 transition-all duration-300 min-h-screen">
        <div className="mt-14 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  ) : null;
}