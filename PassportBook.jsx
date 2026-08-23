import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { emirates } from '@/data/emirates';
import useJourney from '@/hooks/useJourney';

export default function PassportBook() {
  const { exploredPlaces, stamps, points, completedQuizzes } = useJourney();
  const totalPlaces = emirates.reduce((s, e) => s + e.locations.length, 0);
  const placePercent = Math.round((exploredPlaces.length / totalPlaces) * 100);
  const stampGridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !stampGridRef.current) return;
    const earnedStamps = stampGridRef.current.querySelectorAll('[data-stamp-earned]');
    if (!earnedStamps.length) return;
    const tl = gsap.timeline();
    tl.fromTo(earnedStamps, { scale: 0.7, rotation: -10, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' });
    return () => tl.kill();
  }, [stamps.length]);

  const stats = [
    ['Points', points, '⭐'],
    ['Places', `${exploredPlaces.length}/${totalPlaces}`, '📍'],
    ['Quizzes', completedQuizzes.length, '🧠'],
    ['Stamps', `${stamps.length}/7`, '🛂']
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#C8965A]/40 bg-[#0D2240] p-6 shadow-2xl sm:p-10">
      <div className="absolute inset-0 rihla-pattern opacity-10" />
      <div className="relative">
        <div className="flex items-start justify-between border-b border-[#C8965A]/30 pb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#C8965A]">United Arab Emirates</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#F5F0E8]">Digital Passport</h2>
            <p className="text-[#8FA3BF] text-3xl [font-family:'Architects_Daughter',_system-ui]">رحلة عبر الإمارات</p>
          </div>
          <span className="text-5xl">🇦🇪</span>
        </div>

        <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(([label, val, icon]) => (
            <div key={label} className="rounded-2xl border border-[#1A3355] bg-[#071426] p-4 text-center">
              <div className="text-2xl">{icon}</div>
              <b className="font-display text-xl text-[#E8B97A]">{val}</b>
              <p className="text-xs uppercase tracking-wider text-[#8FA3BF]">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-[#B7C3D4]">Journey completion</span>
            <b className="text-[#E8B97A]">{placePercent}%</b>
          </div>
          <div className="h-2 rounded-full bg-[#050E1D]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#A67340] to-[#E8B97A] transition-all"
              style={{ width: `${placePercent}%` }}
            />
          </div>
        </div>

        <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#8FA3BF]">Emirate stamps</p>
        <div ref={stampGridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {emirates.map(e => {
            const done = stamps.includes(e.id);
            return (
              <div
                key={e.id}
                data-stamp-earned={done || undefined}
                className={`grid min-h-28 place-items-center rounded-2xl border p-3 text-center ${done ? 'border-[#C8965A]/60 bg-[#C8965A]/10' : 'border-[#1A3355] bg-[#071426]'}`}
              >
                <div>
                  <span className={`text-2xl ${done ? '' : 'grayscale opacity-30'}`}>{done ? e.icon : '🔒'}</span>
                  <p className={`mt-2 text-xs font-bold ${done ? 'text-[#E8B97A]' : 'text-[#65758D]'}`}>{e.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}