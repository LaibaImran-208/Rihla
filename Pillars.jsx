import { Link } from 'react-router-dom';
import { pillars } from '@/data/emirates';
export default function Pillars() {
  return <section className="relative overflow-hidden px-5 py-24"><div className="mx-auto max-w-7xl">
    <div className="mb-14 text-center"><span className="rihla-kicker">National Identity Mark</span><h2 className="rihla-heading">Three Pillars of <span>Identity</span></h2><p className="rihla-subtitle">Every experience on Rihla contributes to one or more of the UAE's National Identity pillars.</p></div>
    <div className="grid gap-6 md:grid-cols-3">{pillars.map((p) => <article key={p.name} className="group flex min-h-[420px] flex-col rounded-[2rem] border border-[#1A3355] p-8 transition duration-300 hover:-translate-y-2 hover:border-[#C8965A]/40 bg-[#040c3e]">
      <div className="mb-8 flex items-center justify-between"><span className="text-4xl">{p.icon}</span><span className="opacity-60 text-4xl [font-family:'Architects_Daughter',_system-ui]" style={{ color: p.color }}>{p.arabic}</span></div><h3 className="font-display text-3xl font-bold text-[#F5F0E8]">{p.name}</h3><p className="mt-4 text-sm leading-7 text-[#8FA3BF]">{p.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="rounded-full border border-[#1A3355] px-3 py-1 text-xs text-[#B7C3D4]">{t}</span>)}</div><div className="mt-auto pt-7"><Link to={p.name === 'Culture' ? '/culture' : p.name === 'Values' ? '/values' : '/citizenship'} className="mt-6 inline-block text-sm font-bold" style={{ color: p.color }}>Explore {p.name} →</Link></div>
    </article>)}</div>
  </div></section>;
}