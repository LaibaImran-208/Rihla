import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Compass, Play, Trophy } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import ChallengeQuiz from '@/components/rihla/ChallengeQuiz';
import Crossword from '@/components/rihla/Crossword';
import GuessUaeWord from '@/components/rihla/GuessUaeWord';
import { challengeTopics } from '@/data/challengesData';
import useJourney from '@/hooks/useJourney';

/** @typedef {{ score: number, total: number }} TopicScore */

/** @param {TopicScore | undefined} score */
const formatScore = score => score ? `${score.score}/${score.total}` : 'Not completed';

export default function Challenges() {
  const {
    completeQuiz,
    addPoints,
    topicScores = {},
    points,
    saveTopicScore,
    recordActivity
  } = useJourney();

  const [view, setView] = useState('hub');
  const [selectedTopic, setSelectedTopic] = useState(/** @type {string | null} */ (null));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [result, setResult] = useState(/** @type {TopicScore | null} */ (null));
  const [activity, setActivity] = useState(/** @type {'crossword' | 'word' | null} */ (null));

  const topic = challengeTopics.find(item => item.id === selectedTopic);
  const question = topic?.questions[questionIndex];

  /** @param {string} topicId */
  const startTopic = topicId => {
    setSelectedTopic(topicId);
    setQuestionIndex(0);
    setQuizScore(0);
    setResult(null);
    setView('quiz');
  };

  /** @param {string} id @param {boolean} correct */
  const handleComplete = (id, correct) => {
    completeQuiz(id, correct);

    if (correct) {
      addPoints(10);
      setQuizScore(score => score + 1);
    }
  };

  const handleNext = () => {
    if (!topic) return;

    if (questionIndex < topic.questions.length - 1) {
      setQuestionIndex(index => index + 1);
      return;
    }

    const finalScore = quizScore;

    recordActivity('CHALLENGE_COMPLETED', {
      challengeId: topic.id,
      kind: 'quiz',
      score: finalScore,
      total: topic.questions.length,
    });

    saveTopicScore(
      topic.id,
      finalScore,
      topic.questions.length
    );

    setResult({
      score: finalScore,
      total: topic.questions.length,
    });
  };

  const returnToHub = () => {
    setView('hub');
    setActivity(null);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />

      <section className="px-5 pb-8 pt-36 text-center">
        <span className="rihla-kicker">The Rihla Challenge Hub</span>

        <h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">
          Challenges <span className="text-[#C8965A]">& Activities</span>
        </h1>

        <p className="rihla-subtitle">
          Test what you know about the UAE through focused topic quizzes, clues, and playful challenges.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">

        {view === 'hub' && (
          <>
            <div className="mb-14 flex flex-wrap items-center justify-between gap-6 border-y border-[#1A3355] py-7">
              <div>
                <span className="rihla-kicker">Your Progress</span>

                <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
                  Total Score
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <Trophy className="text-[#C8965A]" size={28} />

                <strong className="font-display text-4xl text-[#E8B97A]">
                  {points}
                </strong>

                <span className="text-sm text-[#8FA3BF]">
                  points
                </span>
              </div>
            </div>

            <div className="mb-16">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
                    Quiz
                  </h2>
                </div>

                <Compass className="text-[#C8965A]" size={30} />
              </div>

              <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                {challengeTopics.map(item => (
                  <button
                    key={item.id}
                    onClick={() => startTopic(item.id)}
                    className="group border-b border-[#1A3355] py-5 text-left transition hover:border-[#C8965A]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-[#F5F0E8] group-hover:text-[#E8B97A]">
                          {item.name}
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-[#8FA3BF]">
                          {item.description}
                        </p>
                      </div>

                      <ArrowRight
                        className="mt-1 shrink-0 text-[#C8965A] transition group-hover:translate-x-1"
                        size={20}
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs uppercase tracking-wider text-[#B7C3D4]">
                      <span>
                        {item.questions.length} Questions
                      </span>

                      <span className="text-[#C8965A]">
                        {formatScore(topicScores[item.id])}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-7">
                <span className="rihla-kicker">Play Beyond the Quiz</span>

                <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
                  Interactive Activities
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2">

                <button
                  onClick={() => {
                    setActivity('crossword');
                    setView('activity');
                  }}
                  className="group border-l-2 border-[#C8965A] bg-[#0A1A30] p-7 text-left transition hover:bg-[#0D2038]"
                >
                  <h3 className="font-display text-2xl font-bold text-[#F5F0E8]">
                    UAE Crossword
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#8FA3BF]">
                    Decode clues about heritage, landmarks, and traditions in a playable crossing-word puzzle.
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#E8B97A]">
                    Start puzzle
                    <Play size={15} />
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActivity('word');
                    setView('activity');
                  }}
                  className="group border-l-2 border-[#2D6A4F] bg-[#0A1A30] p-7 text-left transition hover:bg-[#0D2038]"
                >
                  <h3 className="font-display text-2xl font-bold text-[#F5F0E8]">
                    Guess the UAE Word
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#8FA3BF]">
                    Find a five-letter UAE-themed word using letter-position clues and six guesses.
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#E8B97A]">
                    Start game
                    <Play size={15} />
                  </span>
                </button>

              </div>
            </div>
          </>
        )}

        {view === 'quiz' && topic && question && !result && (
          <div className="mx-auto max-w-3xl">

            <button
              onClick={returnToHub}
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#E8B97A]"
            >
              <ArrowLeft size={16} />
              Choose another topic
            </button>

            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <span className="rihla-kicker">
                  {topic.name}
                </span>

                <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
                  Question {questionIndex + 1} of {topic.questions.length}
                </h2>
              </div>

              <span className="text-sm text-[#8FA3BF]">
                {quizScore} correct
              </span>
            </div>

            <div className="mb-6 h-2 overflow-hidden bg-[#1A3355]">
              <div
                className="h-full bg-[#C8965A] transition-all"
                style={{
                  width: `${((questionIndex + 1) / topic.questions.length) * 100}%`
                }}
              />
            </div>

            <ChallengeQuiz
              key={question.id}
              quiz={question}
              quizId={question.id}
              onComplete={handleComplete}
              onNext={handleNext}
            />

          </div>
        )}

        {view === 'quiz' && topic && result && (
          <div className="mx-auto max-w-2xl border-t border-[#C8965A] pt-10 text-center">

            <span className="rihla-kicker">
              {topic.name}
            </span>

            <h2 className="font-display text-4xl font-bold text-[#F5F0E8]">
              Quiz complete
            </h2>

            <p className="mt-6 text-sm uppercase tracking-wider text-[#8FA3BF]">
              You scored
            </p>

            <p className="mt-2 font-display text-7xl text-[#E8B97A]">
              {result.score}
              <span className="text-3xl text-[#8FA3BF]">
                /{result.total}
              </span>
            </p>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-[#6FCF97]">
              <CheckCircle size={17} />
              Result saved for this topic
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">

              <button
                onClick={() => startTopic(topic.id)}
                className="rihla-primary min-w-0 px-6 py-3"
              >
                Try again
              </button>

              <button
                onClick={returnToHub}
                className="inline-flex items-center gap-2 border border-[#1A3355] px-6 py-3 text-sm font-bold text-[#B7C3D4]"
              >
                Choose another topic
              </button>

            </div>
          </div>
        )}

        {view === 'activity' && (
          <div>
            <button
              onClick={returnToHub}
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#E8B97A]"
            >
              <ArrowLeft size={16} />
              Back to Challenges
            </button>

            {activity === 'crossword'
              ? <Crossword />
              : <GuessUaeWord />
            }
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}