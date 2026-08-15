import { useState, useRef, useEffect } from 'react';
import { Check, X, Lightbulb, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function ChallengeQuiz({ quiz, quizId, onComplete, onNext }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const containerRef = useRef(null);
  const optionRefs = useRef([]);
  const feedbackRef = useRef(null);
  const iconRef = useRef(null);
  const msgRef = useRef(null);
  const explRef = useRef(null);
  const nextBtnRef = useRef(null);

  useEffect(() => {
    optionRefs.current = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
      .fromTo(optionRefs.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.07, ease: 'power2.out' }, '-=0.2');
    return () => tl.kill();
  }, [quizId]);

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === quiz.correct;
    if (onComplete) onComplete(quizId, isCorrect);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (isCorrect) {
      gsap.to(optionRefs.current[i], { scale: 1.03, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 });
      confetti({ particleCount: 25, spread: 45, startVelocity: 25, origin: { y: 0.7 }, colors: ['#2D6A4F', '#C8965A', '#E8B97A', '#F5F0E8'], disableForReducedMotion: true });
    } else {
      const tl = gsap.timeline();
      tl.to(optionRefs.current[i], { x: -6, duration: 0.05, ease: 'power2.inOut' })
        .to(optionRefs.current[i], { x: 6, duration: 0.05, ease: 'power2.inOut' })
        .to(optionRefs.current[i], { x: -4, duration: 0.04, ease: 'power2.inOut' })
        .to(optionRefs.current[i], { x: 4, duration: 0.04, ease: 'power2.inOut' })
        .to(optionRefs.current[i], { x: 0, duration: 0.04, ease: 'power2.inOut' });
    }
  };

  useEffect(() => {
    if (!answered || !feedbackRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([feedbackRef.current, iconRef.current, msgRef.current, explRef.current, nextBtnRef.current], { opacity: 1, y: 0, scale: 1, x: 0 });
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(feedbackRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .fromTo(iconRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.15')
      .fromTo(msgRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.2')
      .fromTo(explRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.1')
      .fromTo(nextBtnRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.1');
    return () => tl.kill();
  }, [answered]);

  const handleNext = () => {
    if (!onNext) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { onNext(); return; }
    const tl = gsap.timeline({ onComplete: onNext });
    tl.to(containerRef.current, { opacity: 0, x: -20, duration: 0.3, ease: 'power2.in' });
  };

  if (!quiz) return null;
  const isCorrect = answered && selected === quiz.correct;

  return (
    <div ref={containerRef} className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="text-[#C8965A]" size={20} />
        <h4 className="font-display text-lg font-bold text-[#F5F0E8]">Test Your Knowledge</h4>
      </div>
      <p className="mb-4 text-sm text-[#B7C3D4]">{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          const isCorrectOpt = answered && i === quiz.correct;
          const isWrongSel = answered && i === selected && i !== quiz.correct;
          return (
            <button
              key={i}
              ref={el => optionRefs.current[i] = el}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                isCorrectOpt ? 'border-[#2D6A4F] bg-[#2D6A4F]/20 text-[#F5F0E8]' :
                isWrongSel ? 'border-[#C0392B] bg-[#C0392B]/20 text-[#F5F0E8]' :
                answered ? 'border-[#1A3355] bg-[#071426] text-[#8FA3BF]' :
                'border-[#1A3355] bg-[#071426] text-[#B7C3D4] hover:border-[#C8965A]/40 cursor-pointer'
              }`}
            >
              <span>{opt}</span>
              {isCorrectOpt && <Check className="text-[#2D6A4F]" size={18} />}
              {isWrongSel && <X className="text-[#C0392B]" size={18} />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div ref={feedbackRef} className={`mt-4 rounded-xl p-4 ${isCorrect ? 'bg-[#2D6A4F]/15' : 'bg-[#C0392B]/15'}`}>
          <div className="flex items-center gap-3">
            <span ref={iconRef} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${isCorrect ? 'bg-[#2D6A4F]' : 'bg-[#C0392B]'}`}>
              {isCorrect ? <Check className="text-white" size={20} /> : <X className="text-white" size={20} />}
            </span>
            <b ref={msgRef} className={`font-display text-lg ${isCorrect ? 'text-[#2D6A4F]' : 'text-[#C0392B]'}`}>
              {isCorrect ? '✓ Correct!' : '✕ Incorrect'}
            </b>
          </div>
          {!isCorrect && (
            <p className="mt-3 text-sm text-[#E8B97A]">
              The correct answer is: <b>{quiz.options[quiz.correct]}</b>
            </p>
          )}
          <p ref={explRef} className="mt-2 text-sm leading-6 text-[#B7C3D4]">{quiz.explanation}</p>
        </div>
      )}
      {answered && (
        <div ref={nextBtnRef} className="mt-5 text-center">
          <button onClick={handleNext} className="rihla-primary">
            Next Challenge <ArrowRight className="inline" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}