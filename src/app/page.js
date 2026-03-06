import FeaturedMods from "./components/FeaturedMods";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="bg-[#020617]">
      <Hero></Hero>
      <FeaturedMods></FeaturedMods>
      <div className="h-screen flex items-center justify-center">
         <h2 className="text-slate-600 font-bold uppercase tracking-widest">More Gaming Content Coming Soon...</h2>
      </div>
    </main>
  );
}