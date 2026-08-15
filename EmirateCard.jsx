import { Check, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
export default function EmirateCard({emirate, explored, onToggle}){
  return (<article id={emirate.id} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#1A3355] bg-[#0A1A30]">
    <div className="relative h-64"><Image src={`${emirate.image}?auto=format&fit=crop&w=1200&q=85`} alt={emirate.name} className="h-full w-full"/><div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] to-transparent"/><div className="absolute bottom-5 left-6"><p className="text-[#E8B97A]">{emirate.arabic}</p><h2 className="font-display text-3xl font-bold text-white">{emirate.name}</h2><p className="text-[#B7C3D4]">{emirate.tagline}</p></div></div>
    <div className="p-6"><div className="space-y-3">{emirate.locations.map(place=><div key={place.name} className="rounded-2xl border border-[#1A3355] bg-[#071426] p-4"><div className="flex items-start gap-3"><MapPin className="mt-1 shrink-0 text-[#C8965A]" size={17}/><div><div className="flex flex-wrap items-center gap-2"><b className="text-[#F5F0E8]">{place.name}</b><span className="rounded-full bg-[#1A3355] px-2 py-0.5 text-[10px] text-[#B7C3D4]">{place.category}</span></div><p className="mt-1 text-sm text-[#8FA3BF]">{place.fact}</p></div></div></div>)}</div>
      <button onClick={()=>onToggle(emirate.id)} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition ${explored?'bg-[#2D6A4F] text-white':'bg-[#C8965A] text-[#050E1D] hover:bg-[#E8B97A]'}`}><Check size={18}/>{explored?'Explored — stamp collected':'Mark as explored'}</button>
    </div>
  </article>);
}