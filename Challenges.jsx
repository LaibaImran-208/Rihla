import { useState, useRef, useEffect } from 'react';
import { Star, Trophy, CheckCircle, Award } from 'lucide-react';
import gsap from 'gsap';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import ChallengeQuiz from '@/components/rihla/ChallengeQuiz';
import { allPlaces, emirates } from '@/data/emirates';
import { values } from '@/data/values';
import useJourney from '@/hooks/useJourney';

const placeQuizzes = allPlaces.map(p => {
  const emirate = emirates.find(e => e.locations.includes(p));
  return { id: p.id, question: p.quiz.question, options: p.quiz.options, correct: p.quiz.correct, explanation: p.quiz.explanation, category: emirate ? emirate.name : 'UAE', source: p.name };
});
const valueQuizzes = values.map(v => ({ id: `value-${v.name}`, question: v.scenario.question, options: v.scenario.options, correct: v.scenario.correct, explanation: v.scenario.explanation, category: 'Values', source: v.name }));
const allQuizzes = [...placeQuizzes, ...valueQuizzes];

export default function Challenges() {
  const { completeQuiz, completedQuizzes, points } = useJourney();
  const [score, setScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(() => {
    const idx = allQuizzes.findIndex(q => !completedQuizzes.includes(q.id));
    return idx === -1 ? 0 : idx;
  });
  const [showComplete, setShowComplete] = useState(() =>
    allQuizzes.every(q => completedQuizzes.includes(q.id))
  );

  const scoreRef = useRef(null);
  const completionRef = useRef(null);

  const quiz = allQuizzes[currentIdx];
  const remaining = allQuizzes.filter(q => !completedQuizzes.includes(q.id)).length;

  useEffect(() => {
    if (scoreRef.current && score > 0) {
      gsap.fromTo(scoreRef.current, { scale: 1.4 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    }
  }, [score]);

  useEffect(() => {
    if (!showComplete || !completionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const elements = completionRef.current.querySelectorAll('[data-animate]');
    const tl = gsap.timeline();
    tl.fromTo(completionRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
      .fromTo(elements, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, ease: 'power2.out' }, '-=0.2');
    return () => tl.kill();
  }, [showComplete]);

  const handleComplete = (id, correct) => {
    completeQuiz(id, correct);
    if (correct) setScore(s => s + 10);
  };

  const handleNext = () => {
    for (let i = currentIdx + 1; i < allQuizzes.length; i++) {
      if (!completedQuizzes.includes(allQuizzes[i].id)) { setCurrentIdx(i); return; }
    }
    for (let i = 0; i < currentIdx; i++) {
      if (!completedQuizzes.includes(allQuizzes[i].id)) { setCurrentIdx(i); return; }
    }
    setShowComplete(true);
  };

  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />
      <section className="px-5 pb-8 pt-36 text-center">
        <span className="rihla-kicker">Test Your Knowledge</span>
        <h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">Challenges & <span className="text-[#C8965A]">Quizzes</span></h1>
        <p className="rihla-subtitle">Answer questions from across the UAE journey. Each correct answer earns you 10 points. Your progress is saved automatically.</p>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-5">
          <div className="flex items-center gap-3">
            <Star className="text-[#E8B97A]" size={24} />
            <div><b ref={scoreRef} className="font-display text-2xl text-[#E8B97A]">{score}</b><p className="text-xs text-[#8FA3BF]">Session Score</p></div>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="text-[#C8965A]" size={24} />
            <div><b className="font-display text-2xl text-[#E8B97A]">{completedQuizzes.length}</b><p className="text-xs text-[#8FA3BF]">Completed</p></div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#2D6A4F]" size={24} />
            <div><b className="font-display text-2xl text-[#E8B97A]">{remaining}</b><p className="text-xs text-[#8FA3BF]">Remaining</p></div>
          </div>
        </div>
        {showComplete ? (
          <div ref={completionRef} className="rounded-2xl border border-[#C8965A]/40 bg-[#0A1A30] p-8 text-center">
            <div data-animate className="text-5xl">🏆</div>
            <h2 data-animate className="mt-4 font-display text-2xl font-bold text-[#F5F0E8]">All Challenges Completed!</h2>
            <p data-animate className="mt-2 text-sm text-[#8FA3BF]">You've answered all {allQuizzes.length} questions. Great work on your UAE journey!</p>
            <div data-animate className="mt-6 flex justify-center gap-4">
              <div className="rounded-xl border border-[#1A3355] bg-[#071426] px-6 py-3">
                <b className="font-display text-2xl text-[#E8B97A]">{score}</b>
                <p className="text-xs text-[#8FA3BF]">Session Points</p>
              </div>
              <div className="rounded-xl border border-[#1A3355] bg-[#071426] px-6 py-3">
                <b className="font-display text-2xl text-[#E8B97A]">{points}</b>
                <p className="text-xs text-[#8FA3BF]">Total Points</p>
              </div>
            </div>
            <div data-animate className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C8965A]/40 bg-[#C8965A]/10 px-5 py-2 text-sm font-bold text-[#E8B97A]">
              <Award size={18} /> Achievement Unlocked
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-[#1A3355] px-3 py-1 text-xs text-[#B7C3D4]">{quiz.category}</span>
              <span className="text-xs text-[#8FA3BF]">{quiz.source}</span>
            </div>
            <ChallengeQuiz key={quiz.id} quiz={quiz} quizId={quiz.id} onComplete={handleComplete} onNext={handleNext} />
            {remaining > 0 && <p className="mt-4 text-center text-xs text-[#8FA3BF]">{remaining} questions remaining</p>}
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}