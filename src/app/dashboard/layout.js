import Sidebar from "../components/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-[#020617] min-h-screen">
        <Sidebar></Sidebar>
        <main className="flex-1 ml-0 lg:ml-64 p-6 lg:p-12 mt-16 lg:mt-0 transition-all duration-300">
        {children}
        </main>
    </div>
  );
}