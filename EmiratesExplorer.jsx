import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import GlobalSearch from '@/components/rihla/GlobalSearch';
import { emirates } from '@/data/emirates';
import { Image } from '@/components/ui/image';
import useJourney from '@/hooks/useJourney';

export default function EmiratesExplorer() {
  const { exploredPlaces, stamps } = useJourney();
  const [searchActive, setSearchActive] = useState(false);

  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />
      <section className="px-5 pb-8 pt-36 text-center">
        <span className="rihla-kicker">Interactive map of discovery</span>
        <h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">Emirates <span className="text-[#C8965A]">Explorer</span></h1>
        <p className="rihla-subtitle">Choose an emirate to discover its remarkable places, learn their stories, and collect a passport stamp for every emirate you explore.</p>
      </section>

      {/* Global UAE Search */}
      <section className="mx-auto max-w-3xl px-5 pb-4">
        <GlobalSearch onActiveChange={setSearchActive} />
      </section>

      {/* Emirates grid — hidden while global search is active */}
      {!searchActive &&
      <section className="mx-auto max-w-7xl px-5 py-14">
          <div className="mb-8 text-center">
            <span className="rihla-kicker">explore by emirate</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {emirates.map((e, i) => {
            const exploredCount = e.locations.filter((p) => exploredPlaces.includes(p.id)).length;
            const hasStamp = stamps.includes(e.id);
            const stampThreshold = Math.max(1, Math.ceil(e.locations.length / 2));
            return (
              <Link
                to={`/explore/${e.id}`}
                key={e.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#1A3355] bg-[#0A1A30] transition hover:border-[#C8965A]/40 hover:-translate-y-1">
                
                  <div className="relative h-56 overflow-hidden">
                    <Image src={`${e.image}?auto=format&fit=crop&w=800&q=85`} alt={e.name} className="h-full w-full transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] via-[#0A1A30]/30 to-transparent" />
                    {hasStamp &&
                  <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#C8965A] text-lg shadow-lg">🛂</div>
                  }
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-3xl text-[hsl(var(--chart-5))] opacity-100 [font-family:'Architects_Daughter',_system-ui]">{e.arabic}</p>
                      <h2 className="font-display text-2xl font-bold text-white">{e.name}</h2>
                      <p className="text-sm text-[#B7C3D4]">{e.tagline}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-6 text-[#8FA3BF]">{e.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-[#B7C3D4]">
                        <MapPin size={14} className="text-[#C8965A]" />
                        {e.locations.length} locations
                      </span>
                      <span className="text-xs text-[#8FA3BF]">
                        {exploredCount}/{e.locations.length} explored
                        {exploredCount >= stampThreshold && !hasStamp && ' · stamp ready!'}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#E8B97A]">
                      Explore <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>);

          })}
          </div>
        </section>
      }
      <Footer />
    </main>);

}