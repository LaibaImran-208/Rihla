import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import { sustainabilityInitiatives } from '@/data/sustainability';
import { Image } from '@/components/ui/image';
export default function Sustainability(){
  return (<main className="min-h-screen bg-[#050E1D]"><Navbar/>
    <section className="px-5 pb-8 pt-36 text-center"><span className="rihla-kicker">الاستدامة · Sustainability</span><h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">UAE <span className="text-[#C8965A]">Sustainability</span></h1><p className="rihla-subtitle">From renewable energy to conservation — discover how the UAE is building a sustainable future.</p></section>
    <section className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-12 rounded-[2rem] border border-[#2D6A4F]/40 bg-gradient-to-br from-[#0D2240] to-[#0A1A30] p-8 text-center"><span className="text-5xl">🎯</span><h2 className="mt-4 font-display text-3xl font-bold text-[#F5F0E8]">UAE Net Zero 2050</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-[#8FA3BF]">The UAE was the first Middle Eastern country to commit to achieving net zero greenhouse gas emissions by 2050, driving investment in renewable energy and sustainable development.</p></div>
      <div className="grid gap-6 md:grid-cols-2">{sustainabilityInitiatives.map(s=><article key={s.title} className="overflow-hidden rounded-[2rem] border border-[#1A3355] bg-[#0A1A30] transition hover:border-[#C8965A]/40"><div className="relative h-48 overflow-hidden"><Image src={s.image} alt={s.title} className="h-full w-full"/><div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] to-transparent"/><div className="absolute bottom-3 left-4 flex items-center gap-2"><span className="text-2xl">{s.icon}</span><h3 className="font-display text-xl font-bold text-white">{s.title}</h3></div></div><div className="p-7"><p className="text-sm leading-6 text-[#B7C3D4]">{s.overview}</p>
        <div className="mt-4 space-y-2 text-xs"><div><b className="text-[#C8965A]">Goals:</b> <span className="text-[#8FA3BF]">{s.goals}</span></div><div><b className="text-[#C8965A]">Achievements:</b> <span className="text-[#8FA3BF]">{s.achievements}</span></div><div><b className="text-[#C8965A]">Impact:</b> <span className="text-[#8FA3BF]">{s.impact}</span></div></div>
        <div className="mt-4 rounded-xl border border-[#C8965A]/30 bg-[#C8965A]/5 p-3"><b className="text-xs text-[#E8B97A]">Did You Know?</b><p className="mt-1 text-xs leading-5 text-[#B7C3D4]">{s.didYouKnow}</p></div>
      </div></article>)}</div>
    </section><Footer/></main>);
}