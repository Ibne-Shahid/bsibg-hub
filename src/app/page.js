import FeaturedMods from "./components/FeaturedMods";
import Hero from "./components/Hero";
import TournamentSection from "./components/TournamentSection";

export default function Home() {
  return (
    <main className="bg-[#020617]">
      <Hero></Hero>
      <FeaturedMods></FeaturedMods>
      <TournamentSection></TournamentSection>
      <div className="h-screen flex items-center justify-center">
         <h2 className="text-slate-600 font-bold uppercase tracking-widest">More Gaming Content Coming Soon...</h2>
      </div>
    </main>
  );
}