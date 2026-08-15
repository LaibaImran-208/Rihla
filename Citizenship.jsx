import { useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import { citizenshipTopics, citizenshipMissions } from '@/data/citizenship';
import useJourney from '@/hooks/useJourney';
export default function Citizenship() {
  const [active, setActive] = useState(0);
  const { addBadge } = useJourney();
  const [completedMissions, setCompletedMissions] = useState(() => {
    try {return JSON.parse(localStorage.getItem('rihla-missions')) || [];} catch {return [];}
  });
  const toggleMission = (id) => {
    const next = completedMissions.includes(id) ? completedMissions.filter((x) => x !== id) : [...completedMissions, id];
    setCompletedMissions(next);
    localStorage.setItem('rihla-missions', JSON.stringify(next));
    if (!completedMissions.includes(id)) addBadge(`mission-${id}`);
  };
  const topic = citizenshipTopics[active];
  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />
      <section className="px-5 pb-8 pt-36 text-center">
        <span className="rihla-kicker">المواطنة · Citizenship</span>
        <h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">UAE <span className="text-[#C8965A]">Citizenship</span></h1>
        <p className="rihla-subtitle">Belonging, volunteering, conservation, and sustainability — your role in the community.</p>
      </section>
      <div className="sticky top-20 z-30 border-y border-[#1A3355] bg-[#071426]/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {citizenshipTopics.map((t, i) =>
          <button key={t.title} onClick={() => setActive(i)} className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${active === i ? 'text-[#050E1D]' : 'border border-[#1A3355] text-[#B7C3D4]'}`} style={active === i ? { background: t.color } : {}}>
              <span>{t.icon}</span>{t.title}
            </button>
          )}
        </div>
      </div>
      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="rounded-[2rem] border border-[#1A3355] bg-[#0A1A30] p-8">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl text-3xl" style={{ background: topic.color + '20' }}>{topic.icon}</span>
            <div>
              <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">{topic.title}</h2>
              <p className="text-2xl [font-family:'Architects_Daughter',_system-ui] px-10" style={{ color: topic.color }} dir="rtl">{topic.arabic}</p>
            </div>
          </div>
          <p className="mt-4 leading-7 text-[#8FA3BF]">{topic.description}</p>
          <div className="mt-6 space-y-4">
            {topic.sections.map((s, i) =>
            <div key={i} className="rounded-xl border border-[#1A3355] bg-[#071426] p-4">
                <b className="text-[#C8965A]">{s.heading}</b>
                <p className="mt-1 text-sm leading-6 text-[#B7C3D4]">{s.text}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="bg-[#071426] px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center font-display text-3xl font-bold text-[#F5F0E8]">Citizenship <span className="text-[#C8965A]">Missions</span></h2>
          <p className="mb-8 text-center text-sm text-[#8FA3BF]">Complete these missions to earn badges and contribute to your citizenship progress.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {citizenshipMissions.map((m) => {
              const done = completedMissions.includes(m.id);
              return (
                <button key={m.id} onClick={() => toggleMission(m.id)} className={`flex items-start gap-3 rounded-2xl border p-5 text-left transition ${done ? 'border-[#2D6A4F] bg-[#2D6A4F]/10' : 'border-[#1A3355] bg-[#0A1A30] hover:border-[#C8965A]/40'}`}>
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <b className="text-[#F5F0E8]">{m.title}</b>
                    <p className="mt-1 text-xs leading-5 text-[#8FA3BF]">{m.description}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-[#C8965A]">{m.topic}</p>
                  </div>
                  {done && <Check size={20} className="text-[#2D6A4F]" />}
                </button>);

            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>);

}