import { useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import useJourney from '@/hooks/useJourney';
import PuzzleGame from './PuzzleGame';
import { puzzleStages } from './puzzleData';
import './Puzzles.css';

const stageIcon = stage => stage.id === 'uae' ? '🇦🇪' : stage.icon;

export default function Puzzles() {
  const { puzzleCompleted = [], puzzleTileOrders = {}, completePuzzle } = useJourney();
  const [stageIndex, setStageIndex] = useState(() => {
    const firstIncomplete = puzzleStages.findIndex(stage => !puzzleCompleted.includes(stage.id));
    return firstIncomplete === -1 ? puzzleStages.length : firstIncomplete;
  });
  const completedCount = puzzleCompleted.filter(id => puzzleStages.some(stage => stage.id === id)).length;
  const journeyFinished = completedCount === puzzleStages.length;
  const stage = puzzleStages[stageIndex];

  return (
    <main className="puzzle-page min-h-screen">
      <Navbar />
      <section className="puzzle-main mx-auto max-w-6xl px-5 pb-20 pt-32 sm:pt-36">
        <header className="puzzle-heading">
          <span className="rihla-kicker">Rihla exploration</span>
          <h1 className="font-display text-4xl font-bold text-[#F5F0E8] sm:text-5xl">Puzzles <span className="text-[#C8965A]"></span></h1>
          <p className="mt-3 text-[#8FA3BF]">Piece together the UAE.</p>
        </header>

        <section className="puzzle-journey-progress" aria-label={`${completedCount} of 8 puzzles completed`}>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#B7C3D4]">UAE Explorer journey</p>
            <p className="text-sm font-bold text-[#E8B97A]">{completedCount} / 8 completed</p>
          </div>
          <div className="puzzle-progress-track">
            {puzzleStages.map((item, index) => {
              const done = puzzleCompleted.includes(item.id);
              const current = stageIndex === index;
              return (
                <div
                  key={item.id}
                  className={`puzzle-progress-stage${done ? ' is-done' : ''}${current ? ' is-current' : ''}`}
                  aria-current={current ? 'step' : undefined}
                  aria-label={`${index + 1}. ${item.title}${done ? ', completed' : current ? ', current puzzle' : ''}`}
                >
                  <span className="puzzle-stage-icon">{done ? <Check size={18} aria-hidden="true" /> : stageIcon(item)}</span>
                  <span className="puzzle-stage-name">{item.id === 'umm-al-quwain' ? 'Umm Al Quwain' : item.id === 'ras-al-khaimah' ? 'Ras Al Khaimah' : item.title}</span>
                </div>
              );
            })}
          </div>
        </section>

        {journeyFinished ? (
          <section className="puzzle-final" aria-live="polite">
            <span className="text-5xl" aria-hidden="true">🇦🇪</span>
            <p className="rihla-kicker mt-6">UAE journey complete</p>
            <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">You explored all 8 Rihla puzzles.</h2>
            <p className="mt-3 text-[#8FA3BF]">Every stage of the journey is complete.</p>
            <div className="puzzle-final-indicator" aria-label="All eight puzzles completed">
              {puzzleStages.map(item => <span key={item.id} title={item.title}><Check size={16} /></span>)}
            </div>
            <a className="rihla-secondary mt-7" href="/emirates-explorer">Continue Exploring</a>
          </section>
        ) : (
          <>
            <div className="puzzle-stage-heading">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#C8965A]">Puzzle {stageIndex + 1} of 8</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#F5F0E8] sm:text-3xl">{stage.title}</h2>
                <p className="mt-1 text-sm text-[#8FA3BF]">{stage.subtitle}</p>
              </div>
              <span className="puzzle-piece-count">{stage.pieces} pieces</span>
            </div>
            <PuzzleGame
              key={stage.id}
              puzzle={stage}
              trayOrder={puzzleTileOrders[stage.id]}
              onNext={() => setStageIndex(current => Math.min(current + 1, puzzleStages.length - 1))}
              onComplete={completePuzzle}
              isLastStage={stageIndex === puzzleStages.length - 1}
              completedCount={completedCount}
            />
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}