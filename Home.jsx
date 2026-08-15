import Navbar from '@/components/rihla/Navbar';
import Hero from '@/components/rihla/Hero';
import Pillars from '@/components/rihla/Pillars';
import EmiratesPreview from '@/components/rihla/EmiratesPreview';
import Footer from '@/components/rihla/Footer';
import Countdown from '@/components/rihla/Countdown';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { timelineEvents } from '@/data/timeline';
import { festivals } from '@/data/festivals';
import { sustainabilityInitiatives } from '@/data/sustainability';
import useJourney from '@/hooks/useJourney';
const stats=[['🇦🇪','7','Emirates'],['📍','80+','Locations'],['🏛','50+','Heritage Sites'],['🚀','2071','Future Vision'],['🌱','Net Zero','by 2050'],['🏆','3','Identity Pillars']];
export default function Home(){
  const { exploredPlaces, points, stamps } = useJourney();
  const upcoming=festivals.find(f=>f.type==='fixed')||festivals[0];
  const timelinePreview=timelineEvents.filter(e=>['1971','2010','2020','2023'].some(y=>e.year.includes(y))).slice(0,4);
  return (<main className="min-h-screen bg-[#050E1D]"><Navbar/><Hero/>
    <section className="border-y border-[#1A3355] px-5 py-7"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center sm:grid-cols-3 lg:grid-cols-6">{stats.map(x=><div key={x[2]}><div className="text-2xl">{x[0]}</div><b className="font-display text-2xl text-[#E8B97A]">{x[1]}</b><p className="text-xs uppercase tracking-wider text-[#8FA3BF]">{x[2]}</p></div>)}</div></section>
    <Pillars/><EmiratesPreview/>
    <section className="px-5 py-24"><div className="mx-auto max-w-7xl"><div className="mb-12 text-center"><span className="rihla-kicker">Journey Through Time</span><h2 className="rihla-heading">UAE History <span>Timeline</span></h2><p className="rihla-subtitle">From ancient settlements to space exploration and beyond.</p></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{timelinePreview.map((e,i)=><Link to="/timeline" key={i} className="group rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-5 transition hover:border-[#C8965A]/40"><span className="text-3xl">{e.type}</span><p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#C8965A]">{e.year}</p><h3 className="mt-1 font-display text-lg font-bold text-[#F5F0E8]">{e.title}</h3><p className="mt-2 text-sm leading-6 text-[#8FA3BF] line-clamp-3">{e.description}</p></Link>)}</div>
      <div className="mt-8 text-center"><Link to="/timeline" className="inline-flex items-center gap-2 font-bold text-[#E8B97A]">View Full Timeline <ArrowRight size={18}/></Link></div>
    </div></section>
    <section className="bg-[#071426] px-5 py-24"><div className="mx-auto max-w-7xl"><div className="mb-12 text-center"><span className="rihla-kicker">Cultural Calendar</span><h2 className="rihla-heading">Upcoming <span>Celebration</span></h2></div>
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#1A3355] bg-[#0A1A30] p-8"><div className="flex items-center justify-between"><div><p className="text-sm text-[#E8B97A]">{upcoming.arabic}</p><h3 className="font-display text-2xl font-bold text-[#F5F0E8]">{upcoming.name}</h3></div><span className="text-4xl">🎉</span></div><p className="mt-4 text-sm leading-6 text-[#8FA3BF]">{upcoming.significance}</p><div className="mt-5"><Countdown festival={upcoming}/></div><Link to="/calendar" className="mt-6 inline-flex items-center gap-2 font-bold text-[#E8B97A]">View Calendar <ArrowRight size={16}/></Link></div>
    </div></section>
    <section className="px-5 py-24"><div className="mx-auto max-w-7xl"><div className="mb-12 text-center"><span className="rihla-kicker">Sustainability</span><h2 className="rihla-heading">Building a <span>Greener Future</span></h2></div>
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#1A3355] bg-[#0A1A30] p-8"><div className="flex items-center gap-4"><span className="text-4xl">{sustainabilityInitiatives[0].icon}</span><div><h3 className="font-display text-2xl font-bold text-[#F5F0E8]">{sustainabilityInitiatives[0].title}</h3><p className="text-sm text-[#C8965A]">UAE Net Zero 2050</p></div></div><p className="mt-4 text-sm leading-7 text-[#8FA3BF]">{sustainabilityInitiatives[0].overview}</p><Link to="/sustainability" className="mt-6 inline-flex items-center gap-2 font-bold text-[#E8B97A]">Explore Sustainability <ArrowRight size={16}/></Link></div>
    </div></section>
    <section className="bg-[#071426] px-5 py-24"><div className="mx-auto max-w-4xl text-center"><span className="rihla-kicker">Your Journey</span><h2 className="rihla-heading">Passport <span>Progress</span></h2><div className="mt-8 grid grid-cols-3 gap-4">{[['⭐',points,'Points'],['📍',exploredPlaces.length,'Places Visited'],['🛂',`${stamps.length}/7`,'Stamps Unlocked']].map(([icon,val,label])=><div key={label} className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-6"><div className="text-3xl">{icon}</div><b className="font-display text-3xl text-[#E8B97A]">{val}</b><p className="text-xs uppercase tracking-wider text-[#8FA3BF]">{label}</p></div>)}</div><Link to="/digital-passport" className="rihla-primary mt-8">View My Passport <ArrowRight size={18}/></Link></div></section>
    <Footer/></main>);
}