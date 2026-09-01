import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react';

import { validCrosswordPuzzles } from '@/data/crosswordData';
import useJourney from '@/hooks/useJourney';

const directions = {
  Across: { row: 0, col: 1 },
  Down: { row: 1, col: 0 },
};

/**
 * @typedef {'Across' | 'Down'} Direction
 *
 * @typedef {{
 *   number?: number,
 *   direction: Direction,
 *   row: number,
 *   col: number,
 *   answer: string,
 *   clue: string
 * }} CrosswordEntry
 *
 * @typedef {{
 *   id: string,
 *   title: string,
 *   description: string,
 *   rows: number,
 *   cols: number,
 *   entries: CrosswordEntry[]
 * }} CrosswordPuzzle
 *
 * @typedef {{
 *   row: number,
 *   col: number,
 *   letter: string,
 *   entries: number[]
 * }} CrosswordCell
 *
 * @typedef {{
 *   key: string,
 *   entryNumber: number
 * }} ActiveCell
 */

/**
 * @param {number} row
 * @param {number} col
 */
const keyFor = (row, col) => `${row}-${col}`;

/**
 * @param {CrosswordEntry} entry
 * @returns {string[]}
 */
const getWordCells = entry =>
  [...entry.answer].map((_, index) =>
    keyFor(
      entry.row +
        directions[entry.direction].row * index,
      entry.col +
        directions[entry.direction].col * index,
    )
  );

/**
 * @param {CrosswordPuzzle} puzzle
 * @returns {Record<string, CrosswordCell>}
 */
const buildPuzzleMap = puzzle =>
  puzzle.entries.reduce((map, entry) => {
    getWordCells(entry).forEach((key, index) => {
      const [row, col] = key
        .split('-')
        .map(Number);

      map[key] = {
        ...map[key],
        row,
        col,
        letter: entry.answer[index],
        entries: [
          ...(map[key]?.entries || []),
          entry.number,
        ],
      };
    });

    return map;
  }, {});

export default function Crossword() {
  const {
    crosswordCompleted = [],
    completeCrossword,
  } = useJourney();

  const [puzzleId, setPuzzleId] = useState(
    validCrosswordPuzzles[0]?.id
  );

  const [answers, setAnswers] = useState({});
  const [activeCell, setActiveCell] =
    useState(null);

  const [activeDirection, setActiveDirection] =
    useState('Across');

  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState({});

  const keyboardRef = useRef(null);

  /*
   * Prevent the completion callback from firing
   * repeatedly because of React re-renders.
   */
  const completedPuzzleRef = useRef(null);

  const puzzle =
    validCrosswordPuzzles.find(
      item => item.id === puzzleId
    ) ||
    validCrosswordPuzzles[0];

  const cellMap = useMemo(
    () => buildPuzzleMap(puzzle),
    [puzzle]
  );

  const activeEntry = puzzle.entries.find(
    entry =>
      entry.number ===
        activeCell?.entryNumber &&
      entry.direction === activeDirection
  );

  const activeWord = activeEntry
    ? getWordCells(activeEntry)
    : [];

  const solved = puzzle.entries.filter(entry =>
    getWordCells(entry).every(
      key =>
        (answers[key] || '').toUpperCase() ===
        cellMap[key].letter
    )
  ).length;

  const complete =
    solved === puzzle.entries.length;

  /*
   * Reset state whenever a new puzzle is selected.
   */
  useEffect(() => {
    setAnswers({});
    setRevealed({});
    setChecked(false);

    completedPuzzleRef.current = null;

    const first =
      puzzle.entries.find(
        entry => entry.direction === 'Across'
      ) ||
      puzzle.entries[0];

    if (first) {
      setActiveDirection(first.direction);

      setActiveCell({
        key: keyFor(first.row, first.col),
        entryNumber: first.number,
      });
    }
  }, [puzzleId, puzzle.entries]);

  /*
   * Save completion only once for the current puzzle.
   */
  useEffect(() => {
    if (
      complete &&
      completedPuzzleRef.current !== puzzle.id
    ) {
      completedPuzzleRef.current = puzzle.id;
      completeCrossword(puzzle.id);
    }
  }, [
    complete,
    completeCrossword,
    puzzle.id,
  ]);

  const focusKeyboard = () => {
    keyboardRef.current?.focus();
  };

  /**
   * @param {string} key
   * @param {Direction} [direction]
   */
  const chooseCell = (
    key,
    direction = activeDirection
  ) => {
    const cell = cellMap[key];

    if (!cell) return;

    const entry =
      puzzle.entries.find(
        item =>
          cell.entries.includes(item.number) &&
          item.direction === direction
      ) ||
      puzzle.entries.find(item =>
        cell.entries.includes(item.number)
      );

    if (!entry) return;

    setActiveDirection(entry.direction);

    setActiveCell({
      key,
      entryNumber: entry.number,
    });

    focusKeyboard();
  };

  /**
   * @param {string} key
   */
  const handleCellClick = key => {
    if (
      activeCell?.key === key &&
      cellMap[key].entries.length > 1
    ) {
      chooseCell(
        key,
        activeDirection === 'Across'
          ? 'Down'
          : 'Across'
      );
    } else {
      chooseCell(key);
    }
  };

  /**
   * @param {string} key
   * @param {Direction} direction
   * @param {number} step
   */
  const moveInWord = (
    key,
    direction,
    step
  ) => {
    const cell = cellMap[key];

    const entry = puzzle.entries.find(
      item =>
        item.direction === direction &&
        cell?.entries.includes(item.number)
    );

    if (!entry) return;

    const wordCells = getWordCells(entry);

    const currentIndex =
      wordCells.indexOf(key);

    const next =
      wordCells[currentIndex + step];

    if (next) {
      chooseCell(next, direction);
    }
  };

  /**
   * @param {string | undefined} key
   * @param {Direction} direction
   * @param {number} step
   */
  const moveByArrow = (
    key,
    direction,
    step
  ) => {
    const cell = cellMap[key];

    if (!cell) return;

    const delta = directions[direction];

    const next = keyFor(
      cell.row + delta.row * step,
      cell.col + delta.col * step
    );

    if (cellMap[next]) {
      chooseCell(next, direction);
    }
  };

  /**
   * @param {string} letter
   */
  const enterLetter = letter => {
    if (!activeCell) return;

    setAnswers(current => ({
      ...current,
      [activeCell.key]:
        letter.toUpperCase(),
    }));

    setChecked(false);

    moveInWord(
      activeCell.key,
      activeDirection,
      1
    );
  };

  /**
   * @param {KeyboardEvent} event
   */
  const handleKeyDown = event => {
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
      enterLetter(event.key);
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();

      if (!activeCell) return;

      if (answers[activeCell.key]) {
        setAnswers(current => {
          const next = {
            ...current,
          };

          delete next[activeCell.key];

          return next;
        });
      } else {
        moveInWord(
          activeCell.key,
          activeDirection,
          -1
        );
      }

      setChecked(false);
      return;
    }

    if (event.key === 'Delete') {
      event.preventDefault();

      if (activeCell) {
        setAnswers(current => {
          const next = {
            ...current,
          };

          delete next[activeCell.key];

          return next;
        });
      }

      setChecked(false);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (
        activeCell &&
        cellMap[activeCell.key].entries
          .length > 1
      ) {
        chooseCell(
          activeCell.key,
          activeDirection === 'Across'
            ? 'Down'
            : 'Across'
        );
      }

      return;
    }

    const keyDirection = {
      ArrowLeft: 'Across',
      ArrowRight: 'Across',
      ArrowUp: 'Down',
      ArrowDown: 'Down',
    }[event.key];

    if (keyDirection) {
      event.preventDefault();

      moveByArrow(
        activeCell?.key,
        keyDirection,
        event.key === 'ArrowLeft' ||
          event.key === 'ArrowUp'
          ? -1
          : 1
      );
    }
  };

  const revealLetter = () => {
    if (!activeCell) return;

    setAnswers(current => ({
      ...current,
      [activeCell.key]:
        cellMap[activeCell.key].letter,
    }));

    setRevealed(current => ({
      ...current,
      [activeCell.key]: true,
    }));

    moveInWord(
      activeCell.key,
      activeDirection,
      1
    );
  };

  const revealPuzzle = () => {
    const solution = Object.fromEntries(
      Object.entries(cellMap).map(
        ([key, cell]) => [
          key,
          cell.letter,
        ]
      )
    );

    setAnswers(solution);

    setRevealed(
      Object.fromEntries(
        Object.keys(solution).map(
          key => [key, true]
        )
      )
    );

    setChecked(true);
  };

  const resetPuzzle = () => {
    setAnswers({});
    setRevealed({});
    setChecked(false);
    completedPuzzleRef.current = null;
  };

  const newPuzzle = () => {
    const currentIndex =
      validCrosswordPuzzles.findIndex(
        item => item.id === puzzle.id
      );

    const nextIndex =
      (currentIndex + 1) %
      validCrosswordPuzzles.length;

    setPuzzleId(
      validCrosswordPuzzles[nextIndex].id
    );
  };

  return (
    <div className="border-t border-[#1A3355] pt-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="rihla-kicker">
            Interactive Activity
          </span>

          <h2 className="font-display text-3xl font-bold text-[#F5F0E8]">
            UAE Crossword
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8FA3BF]">
            Piece together what you know about
            the Emirates.
          </p>

          <p className="mt-3 text-xs text-[#B7C3D4]">
            Select a square to begin. Type
            directly into the grid. Click the same
            square again to switch between Across
            and Down.
          </p>
        </div>

        <button
          onClick={newPuzzle}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#E8B97A]"
        >
          <RotateCcw size={16} />
          New puzzle
        </button>
      </div>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-[#F5F0E8]">
            {puzzle.title}
          </h3>

          <p className="mt-1 text-sm text-[#8FA3BF]">
            {puzzle.description}
          </p>
        </div>

        <div className="text-right text-xs uppercase tracking-wider text-[#B7C3D4]">
          <span className="block">
            {solved}/{puzzle.entries.length}{' '}
            words solved
          </span>

          <span className="mt-1 block text-[#6FCF97]">
            {crosswordCompleted.length}/
            {validCrosswordPuzzles.length}{' '}
            completed
          </span>
        </div>
      </div>

      <div
        ref={keyboardRef}
        onKeyDown={handleKeyDown}
        className="absolute h-px w-px opacity-0"
        aria-label="Type letters into the crossword"
        role="application"
        tabIndex="-1"
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(300px,520px)_1fr]">
        <div className="flex justify-center lg:justify-start">
          <div
            className="grid w-full max-w-[520px] gap-px border-2 border-[#C8965A] bg-[#C8965A] p-px"
            style={{
              gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${puzzle.rows}, minmax(0, 1fr))`,
              aspectRatio: `${puzzle.cols} / ${puzzle.rows}`,
            }}
            onClick={focusKeyboard}
          >
            {Array.from(
              {
                length:
                  puzzle.rows * puzzle.cols,
              },
              (_, index) => {
                const row = Math.floor(
                  index / puzzle.cols
                );

                const col =
                  index % puzzle.cols;

                const key = keyFor(row, col);
                const cell = cellMap[key];

                if (!cell) {
                  return (
                    <div
                      key={key}
                      className="bg-[#050E1D]"
                      aria-hidden="true"
                    />
                  );
                }

                const isActive =
                  activeCell?.key === key;

                const isWord =
                  activeWord.includes(key);

                const isWrong =
                  checked &&
                  answers[key] &&
                  answers[key].toUpperCase() !==
                    cell.letter;

                const number =
                  puzzle.entries.find(
                    entry =>
                      entry.row === row &&
                      entry.col === col
                  )?.number;

                return (
                  <button
                    key={key}
                    onClick={() =>
                      handleCellClick(key)
                    }
                    className={`relative min-w-0 bg-[#F5F0E8] text-lg font-bold text-[#050E1D] transition sm:text-2xl ${
                      isWord
                        ? 'bg-[#E8B97A]'
                        : ''
                    } ${
                      isActive
                        ? 'z-10 bg-[#C8965A] ring-2 ring-[#F5F0E8] ring-inset'
                        : ''
                    } ${
                      isWrong
                        ? 'bg-[#E8B97A] text-[#C0392B]'
                        : ''
                    }`}
                    aria-label={`Row ${
                      row + 1
                    }, column ${col + 1}`}
                  >
                    {answers[key] || ''}

                    {number && (
                      <span className="absolute left-0.5 top-0.5 text-[9px] leading-none sm:text-[11px]">
                        {number}
                      </span>
                    )}

                    {revealed[key] && (
                      <span className="absolute bottom-0.5 right-0.5 h-1 w-1 rounded-full bg-[#2D6A4F]" />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setChecked(true)}
              className="inline-flex items-center gap-2 border border-[#C8965A] px-4 py-2 text-sm font-bold text-[#E8B97A]"
            >
              <Check size={16} />
              Check puzzle
            </button>

            <button
              onClick={revealLetter}
              className="inline-flex items-center gap-2 border border-[#1A3355] px-4 py-2 text-sm text-[#B7C3D4]"
            >
              <Eye size={16} />
              Reveal letter
            </button>

            <button
              onClick={revealPuzzle}
              className="inline-flex items-center gap-2 border border-[#1A3355] px-4 py-2 text-sm text-[#B7C3D4]"
            >
              <EyeOff size={16} />
              Reveal puzzle
            </button>

            <button
              onClick={resetPuzzle}
              className="inline-flex items-center gap-2 border border-[#1A3355] px-4 py-2 text-sm text-[#B7C3D4]"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {complete ? (
            <div className="mb-7 border-l-2 border-[#2D6A4F] bg-[#2D6A4F]/10 p-5">
              <span className="rihla-kicker">
                Crossword Complete
              </span>

              <h3 className="font-display text-2xl font-bold text-[#F5F0E8]">
                Puzzle solved!
              </h3>

              <p className="mt-2 text-sm text-[#B7C3D4]">
                {puzzle.title} is saved as
                completed.
              </p>

              <button
                onClick={newPuzzle}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#E8B97A]"
              >
                Next puzzle
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            checked && (
              <p className="mb-7 border-l-2 border-[#C8965A] pl-4 text-sm text-[#E8B97A]">
                {solved} of {puzzle.entries.length}{' '}
                words are correct. Keep working
                through the clues.
              </p>
            )
          )}

          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-[#E8B97A]">
                Across
              </h4>

              <div className="space-y-3">
                {puzzle.entries
                  .filter(
                    entry =>
                      entry.direction ===
                      'Across'
                  )
                  .map(entry => (
                    <button
                      key={`${entry.number}-Across`}
                      onClick={() =>
                        chooseCell(
                          keyFor(
                            entry.row,
                            entry.col
                          ),
                          'Across'
                        )
                      }
                      className={`block w-full border-l-2 py-1 pl-3 text-left ${
                        activeEntry?.number ===
                          entry.number &&
                        activeEntry.direction ===
                          'Across'
                          ? 'border-[#C8965A] bg-[#C8965A]/10'
                          : 'border-transparent'
                      }`}
                    >
                      <span className="mr-2 text-xs font-bold text-[#C8965A]">
                        {entry.number}.
                      </span>

                      <span className="text-sm text-[#B7C3D4]">
                        {entry.clue}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-[#E8B97A]">
                Down
              </h4>

              <div className="space-y-3">
                {puzzle.entries
                  .filter(
                    entry =>
                      entry.direction ===
                      'Down'
                  )
                  .map(entry => (
                    <button
                      key={`${entry.number}-Down`}
                      onClick={() =>
                        chooseCell(
                          keyFor(
                            entry.row,
                            entry.col
                          ),
                          'Down'
                        )
                      }
                      className={`block w-full border-l-2 py-1 pl-3 text-left ${
                        activeEntry?.number ===
                          entry.number &&
                        activeEntry.direction ===
                          'Down'
                          ? 'border-[#C8965A] bg-[#C8965A]/10'
                          : 'border-transparent'
                      }`}
                    >
                      <span className="mr-2 text-xs font-bold text-[#C8965A]">
                        {entry.number}.
                      </span>

                      <span className="text-sm text-[#B7C3D4]">
                        {entry.clue}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <p className="mt-7 text-xs text-[#8FA3BF]">
            Click a filled cell twice to switch
            Across/Down. Use the keyboard to enter
            letters.
          </p>
        </div>
      </div>
    </div>
  );
}