import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stamp } from 'lucide-react';
import gsap from 'gsap';
import RihlaTitle from './RihlaTitle';

export default function Hero() {
  const kickerRef = useRef(null);
  const arabicRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const els = [kickerRef.current, arabicRef.current, descRef.current, buttonsRef.current].filter(Boolean);
    gsap.set(els, { opacity: 0, y: 20 });
    const tl = gsap.timeline({ delay: 1.5 });
    tl.to(kickerRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }).
    to(arabicRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2').
    to(descRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2').
    to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');
    return () => tl.kill();
  }, []);

  return (
    <section className="relative flex min-h-[790px] items-center overflow-hidden pt-20 text-center">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(5,14,29,.62),rgba(5,14,29,.94)),url('https://images.unsplash.com/photo-1694431452845-719ff1e1eea9?auto=format&fit=crop&w=2000&q=90')] bg-cover bg-center" />
      <div className="absolute inset-0 rihla-pattern opacity-20" />
      <div className="relative mx-auto max-w-5xl px-5 py-24">
        <p ref={kickerRef} className="mb-4 text-sm font-bold uppercase tracking-[.38em] text-[#8FA3BF] [font-family:'Abril_Fatface',_system-ui]">Explore · Learn · Belong</p>
        <RihlaTitle />
        <p ref={arabicRef} className="mt-2 font-display text-3xl text-[#C8965A]">رحلة عبر الإمارات العربية المتحدة</p>
        <p ref={descRef} className="mx-auto mt-8 max-w-3xl text-base leading-8 text-[#B7C3D4] sm:text-lg">Embark on an interactive journey across the United Arab Emirates. Discover its rich heritage, inspiring values, remarkable achievements, and ambitious future.</p>
        <div ref={buttonsRef} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/emirates-explorer" className="rihla-primary">🧭 Start Your Journey <ArrowRight size={18} /></Link>
          <Link to="/digital-passport" className="rihla-secondary"><Stamp size={18} /> View My Passport</Link>
        </div>
      </div>
    </section>);

}