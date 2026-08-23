import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function RihlaTitle({ onComplete }) {
  const maskRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const mask = maskRef.current;
    const plane = planeRef.current;
    if (!mask || !plane) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(mask, { attr: { width: 600 } });
      gsap.set(plane, { opacity: 0 });
      onComplete?.();
      return;
    }

    let cleanup = null;
    const startAnimation = () => {
      gsap.set(mask, { attr: { width: 0 } });
      gsap.set(plane, { opacity: 0, x: 0, y: 80, rotation: 20 });
      const tl = gsap.timeline({ onComplete: () => onComplete?.() });
      tl.to(plane, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .to(mask, {
          attr: { width: 600 },
          duration: 2.8,
          ease: 'power1.inOut',
          onUpdate: function() {
            const p = this.progress();
            gsap.set(plane, {
              x: 600 * p,
              y: 80 - Math.sin(p * Math.PI) * 8,
              rotation: 20 - p * 15
            });
          }
        }, '-=0.1')
        .to(plane, { opacity: 0, x: 700, y: 70, rotation: 0, duration: 0.6, ease: 'power2.in' });
      cleanup = () => tl.kill();
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startAnimation);
    } else {
      startAnimation();
    }
    return () => { if (cleanup) cleanup(); };
  }, [onComplete]);

  return (
    <div className="relative w-full" style={{ minHeight: '140px' }}>
      <svg viewBox="0 0 600 200" className="w-full overflow-visible" style={{ maxHeight: '200px' }}>
        <defs>
          <clipPath id="rihla-clip">
            <rect ref={maskRef} x="0" y="0" width="0" height="200" />
          </clipPath>
        </defs>
        <text x="300" y="150" textAnchor="middle" fontSize="140" fontFamily="'Sacramento', cursive" fill="#F5F0E8" clipPath="url(#rihla-clip)">Rihla</text>
        <g ref={planeRef}>
          <path d="M0,0 L30,10 L0,22 L10,10 Z" fill="#F5F0E8" stroke="#C8965A" strokeWidth="1.5" />
          <path d="M10,10 L30,10" stroke="#C8965A" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
}