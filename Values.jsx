import { useState } from 'react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import QuizCard from '@/components/rihla/QuizCard';
import { values } from '@/data/values';
import useJourney from '@/hooks/useJourney';
export default function Values() {
  const [active, setActive] = useState(0);
  const { completeQuiz } = useJourney();
  const v = values[active];
  return <main className="min-h-screen bg-[#050E1D]"><Navbar />
    <section className="px-5 pb-8 pt-36 text-center"><span className="rihla-kicker">القيم · Values</span><h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">UAE <span className="text-[#C8965A]">Values</span></h1><p className="rihla-subtitle">Discover the values that shape Emirati society — respect, compassion, hospitality, tolerance, and more.</p></section>
    <div className="sticky top-20 z-30 border-y border-[#1A3355] bg-[#071426]/95 px-5 py-3 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">{values.map((val, i) => <button key={val.name} onClick={() => setActive(i)} className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${active === i ? 'text-[#050E1D]' : 'border border-[#1A3355] text-[#B7C3D4]'}`} style={active === i ? { background: val.color } : {}}><span>{val.icon}</span>{val.name}</button>)}</div></div>
    <section className="mx-auto max-w-4xl px-5 py-14">
      <div className="rounded-[2rem] border border-[#1A3355] bg-[#0A1A30] p-8">
        <div className="flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-2xl text-3xl" style={{ background: v.color + '20' }}>{v.icon}</span><div><h2 className="font-display text-3xl font-bold text-[#F5F0E8]">{v.name}</h2><p className="text-2xl [font-family:'Architects_Daughter',_system-ui] px-12" style={{ color: v.color }} dir="rtl">{v.arabic}</p></div></div>
        <div className="mt-6 space-y-5">
          <div><b className="text-[#C8965A]">Definition</b><p className="mt-1 leading-7 text-[#B7C3D4]">{v.definition}</p></div>
          <div><b className="text-[#C8965A]">UAE Cultural Context</b><p className="mt-1 leading-7 text-[#B7C3D4]">{v.uaeContext}</p></div>
          <div><b className="text-[#C8965A]">Everyday Example</b><p className="mt-1 leading-7 text-[#B7C3D4]">{v.everydayExample}</p></div>
          <div><b className="text-[#C8965A]">Why It Matters</b><p className="mt-1 leading-7 text-[#B7C3D4]">{v.whyItMatters}</p></div>
          <div className="rounded-xl border border-[#C8965A]/30 bg-[#C8965A]/5 p-4"><b className="text-[#E8B97A]">Reflection Question</b><p className="mt-1 leading-7 text-[#B7C3D4]">{v.reflection}</p></div>
        </div>
      </div>
      <div className="mt-8"><QuizCard quiz={v.scenario} quizId={`value-${v.name}`} onComplete={completeQuiz} /></div>
      <div className="mt-8 flex justify-between"><button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0} className="rounded-full border border-[#1A3355] px-5 py-2 text-sm text-[#B7C3D4] disabled:opacity-30">← Previous</button><span className="text-sm text-[#8FA3BF]">{active + 1} / {values.length}</span><button onClick={() => setActive((a) => Math.min(values.length - 1, a + 1))} disabled={active === values.length - 1} className="rounded-full border border-[#1A3355] px-5 py-2 text-sm text-[#B7C3D4] disabled:opacity-30">Next →</button></div>
    </section><Footer /></main>;
}