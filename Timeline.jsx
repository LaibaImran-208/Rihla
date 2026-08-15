import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import { Image } from '@/components/ui/image';
import { timelineEvents } from '@/data/timeline';
import { allPlaces, emirates } from '@/data/emirates';

gsap.registerPlugin(ScrollTrigger);

const eras = ['Ancient UAE', 'Traditional UAE', 'Trucial States', 'Oil Era', '1971', 'Post-1971', 'Modern UAE', 'Future'];
const eraColors = { 'Ancient UAE': '#4A90E2', 'Traditional UAE': '#C8965A', 'Trucial States': '#8FA3BF', 'Oil Era': '#2D6A4F', '1971': '#C0392B', 'Post-1971': '#1ABC9C', 'Modern UAE': '#9B59B6', 'Future': '#E8B97A' };

function getRelatedLink(relatedPlace) {
  const place = allPlaces.find(p => p.name === relatedPlace);
  if (place) return `/place/${place.id}`;
  const emirate = emirates.find(e => e.name === relatedPlace);
  if (emirate) return `/explore/${emirate.id}`;
  return '/emirates-explorer';
}

export default function Timeline() {
  const [filter, setFilter] = useState('All');
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const eventsRef = useRef(null);

  const visible = filter === 'All' ? timelineEvents : timelineEvents.filter(e => e.era === filter);

  // Heading scroll-triggered entrance.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !headingRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
    });
    tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    return () => { tl.kill(); ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  // Timeline line progressive reveal.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !lineRef.current) return;
    const st = gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: { trigger: eventsRef.current, start: 'top center', end: 'bottom center', scrub: 0.5 }
      }
    );
    return () => { st.scrollTrigger?.kill(); st.kill(); };
  }, []);

  // Event card scroll-triggered animations.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !eventsRef.current) return;
    const cards = eventsRef.current.querySelectorAll('[data-event-card]');
    const triggers = [];
    cards.forEach((card) => {
      const img = card.querySelector('[data-event-image]');
      const content = card.querySelector('[data-event-content]');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 85%' }
      });
      tl.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      if (img) tl.fromTo(img, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.3');
      if (content) tl.fromTo(content, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
      triggers.push(tl);
    });
    return () => { triggers.forEach(t => { t.scrollTrigger?.kill(); t.kill(); }); };
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />
      <section ref={headingRef} className="px-5 pb-8 pt-36 text-center">
        <span className="rihla-kicker">UAE History</span>
        <h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">History <span className="text-[#C8965A]">Timeline</span></h1>
        <p className="rihla-subtitle">Journey through time from ancient settlements to the UAE of the future.</p>
      </section>
      <div className="sticky top-20 z-30 border-y border-[#1A3355] bg-[#071426]/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          <button onClick={() => setFilter('All')} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${filter === 'All' ? 'bg-[#C8965A] text-[#050E1D]' : 'border border-[#1A3355] text-[#B7C3D4]'}`}>All</button>
          {eras.map(e => <button key={e} onClick={() => setFilter(e)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${filter === e ? 'text-[#050E1D]' : 'border border-[#1A3355] text-[#B7C3D4]'}`} style={filter === e ? { background: eraColors[e] } : {}}>{e}</button>)}
        </div>
      </div>
      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="relative">
          <div ref={lineRef} className="absolute bottom-0 left-[19px] top-0 w-0.5 origin-top bg-gradient-to-b from-[#4A90E2] via-[#C8965A] to-[#E8B97A] sm:left-1/2 sm:-translate-x-1/2" />
          <div ref={eventsRef} className="space-y-8">
            {visible.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <div key={i} data-event-card className={`relative flex ${left ? 'sm:justify-start' : 'sm:justify-end'}`}>
                  <div className="absolute left-[11px] top-2 z-10 grid h-4 w-4 place-items-center rounded-full border-2 border-[#050E1D] sm:left-1/2 sm:-translate-x-1/2" style={{ background: eraColors[e.era] }} />
                  <div className={`ml-12 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${left ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                    <div className="overflow-hidden rounded-2xl border border-[#1A3355] bg-[#0A1A30] transition hover:border-[#C8965A]/40">
                      {e.image && <div data-event-image className="relative h-40 overflow-hidden"><Image src={e.image} alt={e.title} className="h-full w-full"/><div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] to-transparent"/></div>}
                      <div data-event-content className="p-5">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{e.type}</span>
                          <div>
                            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: eraColors[e.era] + '30', color: eraColors[e.era] }}>{e.era}</span>
                            <p className="mt-1 font-display text-lg font-bold text-[#E8B97A]">{e.year}</p>
                          </div>
                        </div>
                        <h3 className="mt-3 font-display text-xl font-bold text-[#F5F0E8]">{e.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#B7C3D4]">{e.description}</p>
                        <p className="mt-3 text-xs leading-5 text-[#8FA3BF]"><b className="text-[#C8965A]">Why it matters:</b> {e.importance}</p>
                        {e.relatedPlace && <Link to={getRelatedLink(e.relatedPlace)} className="mt-3 inline-block text-xs font-bold text-[#E8B97A]">📍 {e.relatedPlace}</Link>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}