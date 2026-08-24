import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import useJourney from '@/hooks/useJourney';

const words = [
  'DUBAI', 'DHABI', 'CAMEL', 'DUNES', 'OASIS',
  'FALAJ', 'DATES', 'PEARL', 'JEBEL', 'BISHT',
  'HENNA', 'ABAYA', 'HORSE', 'COAST', 'BEACH',
  'CREEK', 'SANDS', 'SOUKS', 'TOWER', 'PALMS',
  'FORTS', 'TRUCE', 'UNION', 'UNITY', 'SEVEN',
  'AFLAJ', 'QURAN', 'ISLAM', 'ADHAN', 'HIJRI',
  'MUSIC', 'DANCE', 'SPICE', 'CRAFT', 'WEAVE',
  'POETS', 'VERSE', 'DRUMS', 'HATTA', 'ROYAL',
  'EMIRS', 'SAFAR', 'SHAMS', 'RIMAL', 'NOORA',
  'MAJID', 'BURQA', 'KHAMS', 'ARABI', 'GULFS'
];

const shuffleWords = array => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i]
    ];
  }

  return shuffled;
};

const feedback = (guess, answer) => {
  const result = Array(guess.length).fill('absent');
  const remaining = [...answer];

  // First check exact matches
  [...guess].forEach((letter, index) => {
    if (letter === answer[index]) {
      result[index] = 'exact';
      remaining[index] = null;
    }
  });

  // Then check letters that exist elsewhere
  [...guess].forEach((letter, index) => {
    if (result[index] === 'exact') return;

    const matchIndex = remaining.indexOf(letter);

    if (matchIndex !== -1) {
      result[index] = 'present';
      remaining[matchIndex] = null;
    }
  });

  return result;
};

export default function GuessUaeWord() {
  const { completeWordGame } = useJourney();

  const [shuffledWords, setShuffledWords] = useState(() => shuffleWords(words));
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);

  const answer = shuffledWords[round];
  const won = guesses.some(item => item.value === answer);
  const finished = won || guesses.length >= 6;

  const submit = event => {
    event.preventDefault();

    const value = guess.trim().toUpperCase();

    if (
      value.length !== 5 ||
      finished ||
      guesses.some(item => item.value === value)
    ) {
      return;
    }

    setGuesses(current => [
      ...current,
      {
        value,
        result: feedback(value, answer)
      }
    ]);

    if (value === answer) {
      completeWordGame(`word-${answer}-${Date.now()}`);
    }

    setGuess('');
  };

  const reset = () => {
    // If all words have been used, reshuffle and start again
    if (round >= shuffledWords.length - 1) {
      setShuffledWords(shuffleWords(words));
      setRound(0);
    } else {
      setRound(value => value + 1);
    }

    setGuess('');
    setGuesses([]);
  };

  return (
    <div className="border-t border-[#1A3355] pt-8">

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="rihla-kicker">
            Interactive Activity
          </span>

          <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
            Guess the UAE Word
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8FA3BF]">
            Find the five-letter UAE word in six tries. Gold means the
            letter belongs elsewhere; green means it is in the right place.
          </p>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm text-[#E8B97A]"
        >
          <RotateCcw size={16} />
          New word
        </button>
      </div>

      <div className="max-w-md">

        <div className="mb-5 space-y-2">
          {guesses.map(item => (
            <div
              key={item.value}
              className="flex gap-2"
            >
              {[...item.value].map((letter, index) => (
                <span
                  key={`${item.value}-${index}`}
                  className={`grid h-12 w-12 place-items-center border text-sm font-bold ${
                    item.result[index] === 'exact'
                      ? 'border-[#2D6A4F] bg-[#2D6A4F] text-white'
                      : item.result[index] === 'present'
                        ? 'border-[#C8965A] bg-[#C8965A] text-[#050E1D]'
                        : 'border-[#1A3355] bg-[#071426] text-[#8FA3BF]'
                  }`}
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>

        {!finished && (
          <form
            onSubmit={submit}
            className="flex gap-3"
          >
            <input
              value={guess}
              onChange={event =>
                setGuess(
                  event.target.value
                    .replace(/[^a-z]/gi, '')
                    .slice(0, 5)
                )
              }
              placeholder="Enter a five-letter word"
              className="min-w-0 flex-1 border-b border-[#C8965A]/60 bg-transparent px-1 py-3 uppercase tracking-[.2em] text-[#F5F0E8] outline-none"
              aria-label="Five-letter UAE word guess"
            />

            <button className="rihla-primary min-w-0 px-5 py-3">
              Guess
            </button>
          </form>
        )}

        {finished && (
          <div className="border-l-2 border-[#C8965A] pl-4 text-sm text-[#B7C3D4]">
            <b className={won ? 'text-[#6FCF97]' : 'text-[#E8B97A]'}>
              {won
                ? 'You found it.'
                : `The word was ${answer}.`
              }
            </b>

            <p className="mt-1">
              {won
                ? 'A sharp eye for UAE vocabulary.'
                : 'Try a fresh word and explore another clue.'
              }
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-[#8FA3BF]">
          {guesses.length} / 6 guesses used
        </p>

      </div>
    </div>
  );
}