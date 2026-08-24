const makeCrossword = (id, title, description, across, downs, size = 11) => {
  const acrossRow = 5;
  const acrossCol = 1;
  const entries = [{ direction: 'Across', row: acrossRow, col: acrossCol, answer: across.answer, clue: across.clue }];

  for (const down of downs) {
    const crossIndex = down.crossIndex;
    if (across.answer[down.col - acrossCol] !== down.answer[crossIndex]) return null;
    entries.push({
      direction: 'Down',
      row: acrossRow - crossIndex,
      col: down.col,
      answer: down.answer,
      clue: down.clue,
    });
  }

  return { id, title, description, size, entries };
};

export const crosswordPuzzles = [
  makeCrossword('seven-emirates', 'The Seven Emirates', 'Name the places that make up the federation.', { answer: 'EMIRATE', clue: 'One of the seven parts that form the UAE.' }, [
    { col: 2, answer: 'MUSEUM', crossIndex: 5, clue: 'A place where history and culture are preserved.' },
    { col: 4, answer: 'PEAR', crossIndex: 3, clue: 'A coastal treasure from the sea.' },
    { col: 7, answer: 'EID', crossIndex: 0, clue: 'A festival celebrated by Muslims.' },
  ]),
  makeCrossword('uae-landmarks', 'UAE Landmarks', 'Recognise famous buildings and places.', { answer: 'LANDMARK', clue: 'A famous place or structure.' }, [
    { col: 1, answer: 'PEARL', crossIndex: 4, clue: 'A treasure once central to coastal life.' },
    { col: 4, answer: 'ISLAND', crossIndex: 5, clue: 'Sir Bani Yas is a famous UAE one.' },
    { col: 7, answer: 'PEAR', crossIndex: 3, clue: 'A coastal treasure from the sea.' },
  ]),
  makeCrossword('emirati-heritage', 'Emirati Heritage', 'Explore customs and places that carry memory.', { answer: 'HERITAGE', clue: 'History and traditions passed down.' }, [
    { col: 1, answer: 'SHAH', crossIndex: 3, clue: 'A historical title used in the region.' },
    { col: 4, answer: 'ISLAND', crossIndex: 0, clue: 'Sir Bani Yas is a famous UAE one.' },
    { col: 7, answer: 'GULF', crossIndex: 0, clue: 'The Arabian body of water beside the UAE.' },
  ]),
  makeCrossword('traditional-culture', 'Traditional Culture', 'Put familiar Emirati traditions into place.', { answer: 'TRADITION', clue: 'A custom passed from one generation to another.' }, [
    { col: 1, answer: 'TENT', crossIndex: 0, clue: 'A portable shelter used by desert communities.' },
    { col: 4, answer: 'DATES', crossIndex: 0, clue: 'Sweet fruit often served with coffee.' },
    { col: 7, answer: 'ISLAM', crossIndex: 0, clue: 'The faith central to many UAE traditions.' },
  ]),
  makeCrossword('uae-history', 'UAE History', 'Trace important threads through the past.', { answer: 'UNITY', clue: 'Togetherness among the emirates.' }, [
    { col: 1, answer: 'UMM', crossIndex: 0, clue: 'First word in Umm Al Quwain.' },
    { col: 3, answer: 'ISLAM', crossIndex: 0, clue: 'A major influence on regional history.' },
    { col: 5, answer: 'YAS', crossIndex: 0, clue: 'Island known for culture and entertainment.' },
  ]),
  makeCrossword('national-identity', 'National Identity', 'Words that express belonging and shared purpose.', { answer: 'UNITY', clue: 'Togetherness among people and emirates.' }, [
    { col: 1, answer: 'UMM', crossIndex: 0, clue: 'First word in Umm Al Quwain.' },
    { col: 3, answer: 'ISLAM', crossIndex: 0, clue: 'A faith that shapes the region’s identity.' },
    { col: 5, answer: 'YAS', crossIndex: 0, clue: 'Island known for culture and entertainment.' },
  ]),
  makeCrossword('sustainability', 'Sustainability', 'Discover natural systems worth protecting.', { answer: 'MANGROVE', clue: 'Coastal tree that shelters wildlife.' }, [
    { col: 1, answer: 'MARINE', crossIndex: 0, clue: 'Related to the sea.' },
    { col: 4, answer: 'GULF', crossIndex: 0, clue: 'The sea beside the UAE.' },
    { col: 7, answer: 'VILLA', crossIndex: 0, clue: 'A type of building found in many communities.' },
  ]),
  makeCrossword('festivals-traditions', 'Festivals & Traditions', 'Celebrate occasions and practices that bring people together.', { answer: 'RAMADAN', clue: 'Holy month observed by Muslims.' }, [
    { col: 1, answer: 'RAM', crossIndex: 0, clue: 'An animal associated with Eid traditions.' },
    { col: 3, answer: 'MAJLIS', crossIndex: 0, clue: 'A gathering place for welcoming guests.' },
    { col: 5, answer: 'DATES', crossIndex: 0, clue: 'Fruit traditionally used to break a fast.' },
  ]),
  makeCrossword('famous-places', 'Famous Places', 'Match clues to destinations across the Emirates.', { answer: 'ABUDHABI', clue: 'Capital of the United Arab Emirates.' }, [
    { col: 1, answer: 'ABU', crossIndex: 0, clue: 'First word in Abu Dhabi.' },
    { col: 4, answer: 'DATES', crossIndex: 0, clue: 'Fruit traditionally used in UAE hospitality.' },
    { col: 7, answer: 'BURJ', crossIndex: 0, clue: 'Arabic word for tower, as in Burj Khalifa.' },
  ]),
  makeCrossword('uae-geography', 'UAE Geography', 'Find the landscapes and waters of the country.', { answer: 'DESERT', clue: 'A dry landscape of sand and rock.' }, [
    { col: 2, answer: 'EID', crossIndex: 0, clue: 'A festival celebrated across the UAE.' },
    { col: 4, answer: 'EAST', crossIndex: 0, clue: 'Fujairah is on the UAE’s coast.' },
    { col: 6, answer: 'TENT', crossIndex: 0, clue: 'Traditional shelter of desert life.' },
  ]),
];

const getCells = puzzle => {
  const cells = {};
  for (const entry of puzzle.entries) {
    const delta = entry.direction === 'Across' ? [0, 1] : [1, 0];
    for (let index = 0; index < entry.answer.length; index += 1) {
      const row = entry.row + delta[0] * index;
      const col = entry.col + delta[1] * index;
      const key = `${row}-${col}`;
      if (row < 0 || col < 0 || row >= puzzle.size || col >= puzzle.size) return null;
      if (cells[key] && cells[key].letter !== entry.answer[index]) return null;
      cells[key] = { row, col, letter: entry.answer[index], entries: [...(cells[key]?.entries || []), entry] };
    }
  }
  return cells;
};

export const validateCrosswordPuzzle = puzzle => {
  if (!puzzle?.id || !puzzle?.title || !Number.isInteger(puzzle.size) || !Array.isArray(puzzle.entries) || puzzle.entries.length < 2) return false;
  const cells = getCells(puzzle);
  if (!cells) return false;
  const starts = new Map();
  for (const entry of puzzle.entries) {
    if (!/^[A-Z]+$/.test(entry.answer) || !['Across', 'Down'].includes(entry.direction)) return false;
    const start = `${entry.row}-${entry.col}`;
    const existing = starts.get(start);
    if (existing && existing.direction === entry.direction) return false;
    starts.set(start, entry);
  }
  const graph = new Map(puzzle.entries.map(entry => [entry, new Set()]));
  Object.values(cells).forEach(cell => cell.entries.forEach(entry => cell.entries.filter(other => other !== entry).forEach(other => graph.get(entry).add(other))));
  const visited = new Set([puzzle.entries[0]]);
  const pending = [puzzle.entries[0]];
  while (pending.length) graph.get(pending.pop()).forEach(entry => { if (!visited.has(entry)) { visited.add(entry); pending.push(entry); } });
  if (visited.size !== puzzle.entries.length) return false;
  for (const cell of Object.values(cells)) {
    for (const [rowOffset, colOffset] of [[0, 1], [1, 0]]) {
      const adjacent = cells[`${cell.row + rowOffset}-${cell.col + colOffset}`];
      if (!adjacent || cell.entries.some(entry => adjacent.entries.includes(entry))) continue;
      if (cell.entries.some(entry => adjacent.entries.some(other => entry.direction === other.direction))) return false;
    }
  }
  return true;
};

const numberPuzzles = puzzles => puzzles.map(puzzle => {
  const startCells = [...new Set(puzzle.entries.map(entry => `${entry.row}-${entry.col}`))]
    .map(key => key.split('-').map(Number))
    .sort(([rowA, colA], [rowB, colB]) => rowA - rowB || colA - colB);
  const numbers = new Map(startCells.map(([row, col], index) => [`${row}-${col}`, index + 1]));
  return { ...puzzle, entries: puzzle.entries.map(entry => ({ ...entry, number: numbers.get(`${entry.row}-${entry.col}`) })) };
});

const getBoundingBox = puzzle => {
  const occupied = [];
  for (const entry of puzzle.entries) {
    const rowDelta = entry.direction === 'Down' ? 1 : 0;
    const colDelta = entry.direction === 'Across' ? 1 : 0;
    for (let index = 0; index < entry.answer.length; index += 1) {
      occupied.push({
        row: entry.row + rowDelta * index,
        col: entry.col + colDelta * index,
      });
    }
  }
  const rows = occupied.map(cell => cell.row);
  const cols = occupied.map(cell => cell.col);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);
  return { minRow, minCol, rows: maxRow - minRow + 1, cols: maxCol - minCol + 1 };
};

const normalizePuzzle = puzzle => {
  const bounds = getBoundingBox(puzzle);
  return {
    ...puzzle,
    rows: bounds.rows,
    cols: bounds.cols,
    entries: puzzle.entries.map(entry => ({
      ...entry,
      row: entry.row - bounds.minRow,
      col: entry.col - bounds.minCol,
    })),
  };
};

export const validCrosswordPuzzles = numberPuzzles(crosswordPuzzles.filter(validateCrosswordPuzzle).map(normalizePuzzle));
