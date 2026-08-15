import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { emirates } from '@/data/emirates';
import { Image } from '@/components/ui/image';
export default function EmiratesPreview() {
  return <section className="bg-[#071426] px-5 py-24"><div className="mx-auto max-w-7xl">
    <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><span className="rihla-kicker">Emirates Explorer</span><h2 className="rihla-heading text-left">Seven Emirates, <span>One Nation</span></h2></div><Link to="/emirates-explorer" className="flex items-center gap-2 font-bold text-[#E8B97A]">Explore All <ArrowRight size={18} /></Link></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{emirates.map((e, i) => <Link to={`/explore/${e.id}`} key={e.id} className={`group relative min-h-[310px] overflow-hidden rounded-3xl ${i === 0 ? 'lg:col-span-2' : ''}`}><Image src={`${e.image}?auto=format&fit=crop&w=900&q=85`} alt={e.name} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#050E1D] via-[#050E1D]/35 to-transparent opacity-75" /><div className="absolute inset-x-0 bottom-0 p-6"><p className="text-[#E8B97A] text-3xl [font-family:'Architects_Daughter',_system-ui]">{e.arabic}</p><h3 className="font-display text-2xl font-bold text-white">{e.name}</h3><p className="text-sm text-[#B7C3D4]">{e.tagline} · {e.locations.length} locations</p></div></Link>)}</div>
  </div></section>;
}