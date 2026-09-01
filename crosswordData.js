const makeCrossword = (id, title, description, size, entries) => ({
  id,
  title,
  description,
  size,
  entries,
});

export const crosswordPuzzles = [
  makeCrossword(
    'seven-emirates',
    'The Seven Emirates',
    'Piece together the places and ideas that form the UAE federation.',
    30,
    [
      {
        direction: 'Across',
        row: 8,
        col: 1,
        answer: 'FUJAIRAH',
        clue: 'The only emirate on the UAE’s Gulf of Oman coast.',
      },
      {
        direction: 'Down',
        row: 7,
        col: 3,
        answer: 'AJMAN',
        clue: 'The smallest emirate by area.',
      },
      {
        direction: 'Across',
        row: 10,
        col: 1,
        answer: 'KHAIMAH',
        clue: 'Second word in Ras Al Khaimah.',
      },
      {
        direction: 'Down',
        row: 5,
        col: 6,
        answer: 'SHARJAH',
        clue: 'Emirate known for museums and cultural institutions.',
      },
      {
        direction: 'Across',
        row: 6,
        col: 5,
        answer: 'DHABI',
        clue: 'Second word in Abu Dhabi.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 9,
        answer: 'QUWAIN',
        clue: 'Second word in Umm Al Quwain.',
      },
      {
        direction: 'Across',
        row: 3,
        col: 8,
        answer: 'DUBAI',
        clue: 'Emirate known for Burj Khalifa and its global skyline.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 12,
        answer: 'EMIRATE',
        clue: 'One of the seven parts that make up the UAE.',
      },
      {
        direction: 'Across',
        row: 1,
        col: 11,
        answer: 'SEVEN',
        clue: 'Number of emirates in the federation.',
      },
    ],
  ),

  makeCrossword(
    'uae-landmarks',
    'UAE Landmarks',
    'Connect iconic buildings, attractions and places from across the Emirates.',
    30,
    [
      {
        direction: 'Across',
        row: 5,
        col: 1,
        answer: 'AQUARIUM',
        clue: 'A place where visitors can discover marine life.',
      },
      {
        direction: 'Down',
        row: 4,
        col: 1,
        answer: 'YAS',
        clue: 'Island in Abu Dhabi known for major attractions.',
      },
      {
        direction: 'Down',
        row: 3,
        col: 5,
        answer: 'FORT',
        clue: 'Historic structure built for defence.',
      },
      {
        direction: 'Across',
        row: 3,
        col: 5,
        answer: 'FERRARI',
        clue: 'Brand behind the theme park on Yas Island.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 10,
        answer: 'CREEK',
        clue: 'Historic waterway at the heart of old Dubai.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 3,
        answer: 'MOSQUE',
        clue: 'Place of worship in Islam.',
      },
      {
        direction: 'Across',
        row: 1,
        col: 3,
        answer: 'MUSEUM',
        clue: 'Institution where history, art or culture is preserved.',
      },
      {
        direction: 'Across',
        row: 6,
        col: 10,
        answer: 'KHALIFA',
        clue: 'Name shared by Dubai’s famous tower and Abu Dhabi’s Grand Mosque.',
      },
      {
        direction: 'Down',
        row: 3,
        col: 16,
        answer: 'PALACE',
        clue: 'Grand royal residence or ceremonial complex.',
      },
    ],
  ),

  makeCrossword(
    'emirati-heritage',
    'Emirati Heritage',
    'Explore traditions, crafts and symbols rooted in Emirati heritage.',
    30,
    [
      {
        direction: 'Across',
        row: 5,
        col: 5,
        answer: 'HERITAGE',
        clue: 'Traditions and history passed down through generations.',
      },
      {
        direction: 'Down',
        row: 5,
        col: 10,
        answer: 'AYALA',
        clue: 'Traditional group performance featuring rhythmic movement.',
      },
      {
        direction: 'Across',
        row: 7,
        col: 6,
        answer: 'DALLAH',
        clue: 'Traditional Arabic coffee pot.',
      },
      {
        direction: 'Across',
        row: 9,
        col: 7,
        answer: 'FALAJ',
        clue: 'Traditional water channel used for irrigation.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 5,
        answer: 'BISHT',
        clue: 'Traditional cloak worn on formal occasions.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 12,
        answer: 'DATES',
        clue: 'Fruit commonly served in Emirati hospitality.',
      },
      {
        direction: 'Across',
        row: 3,
        col: 8,
        answer: 'HENNA',
        clue: 'Plant dye commonly used in festive designs.',
      },
      {
        direction: 'Across',
        row: 3,
        col: 1,
        answer: 'MAJLIS',
        clue: 'Traditional gathering space for receiving guests.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 2,
        answer: 'PEARL',
        clue: 'Sea treasure central to the UAE’s historic pearling tradition.',
      },
    ],
  ),

  makeCrossword(
    'uae-history',
    'UAE History',
    'Follow the words that shaped the formation of the United Arab Emirates.',
    30,
    [
      {
        direction: 'Across',
        row: 2,
        col: 1,
        answer: 'FEDERATION',
        clue: 'A union of states or territories under one system.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 2,
        answer: 'SEVEN',
        clue: 'Number of emirates in the UAE.',
      },
      {
        direction: 'Across',
        row: 4,
        col: 1,
        answer: 'DECEMBER',
        clue: 'Month in which UAE National Day is celebrated.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 7,
        answer: 'TREATY',
        clue: 'Formal agreement between states.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 10,
        answer: 'UNION',
        clue: 'The joining together of the seven emirates.',
      },
      {
        direction: 'Across',
        row: 7,
        col: 5,
        answer: 'ZAYED',
        clue: 'First President of the UAE.',
      },
      {
        direction: 'Across',
        row: 5,
        col: 10,
        answer: 'NATIONAL',
        clue: 'Relating to the whole country.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 13,
        answer: 'TRUCIAL',
        clue: 'Word in the historical name Trucial States.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 15,
        answer: 'FOUNDERS',
        clue: 'Leaders who established the federation.',
      },
    ],
  ),

  makeCrossword(
    'national-identity',
    'National Identity',
    'Discover words connected with belonging, values and shared identity.',
    30,
    [
      {
        direction: 'Across',
        row: 4,
        col: 2,
        answer: 'HERITAGE',
        clue: 'Traditions and history passed down through generations.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 7,
        answer: 'FLAG',
        clue: 'National symbol flown at public occasions.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 5,
        answer: 'PRIDE',
        clue: 'A strong feeling of belonging to a place or community.',
      },
      {
        direction: 'Across',
        row: 6,
        col: 1,
        answer: 'EMBLEM',
        clue: 'An official symbol representing a nation or organisation.',
      },
      {
        direction: 'Across',
        row: 2,
        col: 7,
        answer: 'FUTURE',
        clue: 'What the next generations are building toward.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 11,
        answer: 'ARABIC',
        clue: 'Official language of the UAE.',
      },
      {
        direction: 'Across',
        row: 5,
        col: 10,
        answer: 'CITIZEN',
        clue: 'A legally recognised member of a country.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 15,
        answer: 'VALUES',
        clue: 'Principles that guide behaviour and society.',
      },
      {
        direction: 'Down',
        row: 3,
        col: 13,
        answer: 'UNITY',
        clue: 'Togetherness among the emirates.',
      },
    ],
  ),

  makeCrossword(
    'sustainability',
    'Sustainability',
    'Connect natural systems and ideas that support a more sustainable UAE.',
    30,
    [
      {
        direction: 'Across',
        row: 7,
        col: 3,
        answer: 'MANGROVE',
        clue: 'Coastal tree that provides habitat for wildlife.',
      },
      {
        direction: 'Down',
        row: 5,
        col: 5,
        answer: 'DUNE',
        clue: 'Hill of sand shaped by wind.',
      },
      {
        direction: 'Across',
        row: 5,
        col: 5,
        answer: 'DESERT',
        clue: 'Dry landscape made up of sand and rock.',
      },
      {
        direction: 'Down',
        row: 7,
        col: 7,
        answer: 'REEF',
        clue: 'Marine ecosystem rich in underwater life.',
      },
      {
        direction: 'Across',
        row: 10,
        col: 1,
        answer: 'WILDLIFE',
        clue: 'Animals and plants living in natural habitats.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 7,
        answer: 'OASIS',
        clue: 'Green habitat found in a dry region.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 9,
        answer: 'SOLAR',
        clue: 'Relating to energy from the sun.',
      },
      {
        direction: 'Down',
        row: 10,
        col: 1,
        answer: 'WATER',
        clue: 'Vital natural resource that must be conserved.',
      },
      {
        direction: 'Across',
        row: 14,
        col: 1,
        answer: 'RECYCLE',
        clue: 'Process materials so they can be used again.',
      },
    ],
  ),

  makeCrossword(
    'festivals-traditions',
    'Festivals & Traditions',
    'Explore words connected with celebrations, worship and community.',
    30,
    [
      {
        direction: 'Across',
        row: 9,
        col: 4,
        answer: 'RAMADAN',
        clue: 'Holy month observed by Muslims.',
      },
      {
        direction: 'Down',
        row: 7,
        col: 8,
        answer: 'EID',
        clue: 'Festival celebrated by Muslims.',
      },
      {
        direction: 'Across',
        row: 7,
        col: 4,
        answer: 'PRAYER',
        clue: 'Act of worship performed at set times.',
      },
      {
        direction: 'Down',
        row: 3,
        col: 6,
        answer: 'HENNA',
        clue: 'Plant dye often used for festive designs.',
      },
      {
        direction: 'Across',
        row: 4,
        col: 3,
        answer: 'DATES',
        clue: 'Fruit traditionally served when breaking the fast.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 4,
        answer: 'IFTAR',
        clue: 'Meal eaten to break the daily fast.',
      },
      {
        direction: 'Across',
        row: 1,
        col: 1,
        answer: 'FAMILY',
        clue: 'People often brought together during celebrations.',
      },
      {
        direction: 'Down',
        row: 9,
        col: 6,
        answer: 'MAJLIS',
        clue: 'Gathering space traditionally used to welcome guests.',
      },
      {
        direction: 'Across',
        row: 14,
        col: 4,
        answer: 'MOSQUE',
        clue: 'Place of worship in Islam.',
      },
    ],
  ),

  makeCrossword(
    'famous-places',
    'Famous Places',
    'Travel across the Emirates through clues about well-known destinations.',
    30,
    [
      {
        direction: 'Across',
        row: 6,
        col: 1,
        answer: 'ABUDHABI',
        clue: 'Capital city of the United Arab Emirates.',
      },
      {
        direction: 'Down',
        row: 5,
        col: 1,
        answer: 'YAS',
        clue: 'Island known for major attractions and motorsport.',
      },
      {
        direction: 'Down',
        row: 5,
        col: 7,
        answer: 'ABRA',
        clue: 'Traditional boat used to cross Dubai Creek.',
      },
      {
        direction: 'Across',
        row: 8,
        col: 4,
        answer: 'DUBAI',
        clue: 'Emirate and city famous for its modern skyline.',
      },
      {
        direction: 'Down',
        row: 2,
        col: 3,
        answer: 'MOSQUE',
        clue: 'Place of worship.',
      },
      {
        direction: 'Across',
        row: 3,
        col: 2,
        answer: 'LOUVRE',
        clue: 'Abu Dhabi museum recognised for its distinctive dome.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 6,
        answer: 'FORT',
        clue: 'Historic defensive structure.',
      },
      {
        direction: 'Across',
        row: 1,
        col: 6,
        answer: 'FALAJ',
        clue: 'Traditional irrigation channel found in Al Ain.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 9,
        answer: 'ALAIN',
        clue: 'Garden city in Abu Dhabi Emirate.',
      },
    ],
  ),

  makeCrossword(
    'uae-geography',
    'UAE Geography',
    'Piece together landscapes, waterways and geographical features of the UAE.',
    30,
    [
      {
        direction: 'Across',
        row: 10,
        col: 1,
        answer: 'FUJAIRAH',
        clue: 'Emirate located on the UAE’s Gulf of Oman coast.',
      },
      {
        direction: 'Down',
        row: 8,
        col: 4,
        answer: 'SEA',
        clue: 'Large body of salt water.',
      },
      {
        direction: 'Across',
        row: 8,
        col: 2,
        answer: 'DESERT',
        clue: 'Dry landscape of sand and rock.',
      },
      {
        direction: 'Down',
        row: 6,
        col: 7,
        answer: 'HATTA',
        clue: 'Mountainous destination in Dubai Emirate.',
      },
      {
        direction: 'Down',
        row: 3,
        col: 2,
        answer: 'ISLAND',
        clue: 'Land completely surrounded by water.',
      },
      {
        direction: 'Across',
        row: 4,
        col: 2,
        answer: 'STRAIT',
        clue: 'Narrow passage of water connecting larger bodies of water.',
      },
      {
        direction: 'Across',
        row: 6,
        col: 1,
        answer: 'OASIS',
        clue: 'Green area found within a dry region.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 6,
        answer: 'ALAIN',
        clue: 'Garden city in Abu Dhabi Emirate.',
      },
      {
        direction: 'Across',
        row: 1,
        col: 1,
        answer: 'MOUNTAIN',
        clue: 'Natural high landform rising above its surroundings.',
      },
    ],
  ),

  makeCrossword(
    'culture-community',
    'Culture & Community',
    'Explore ideas of hospitality, creativity and community in Emirati culture.',
    30,
    [
      {
        direction: 'Across',
        row: 8,
        col: 1,
        answer: 'HOSPITALITY',
        clue: 'Warm and generous treatment of guests.',
      },
      {
        direction: 'Down',
        row: 7,
        col: 2,
        answer: 'SOUQ',
        clue: 'Traditional marketplace.',
      },
      {
        direction: 'Down',
        row: 7,
        col: 5,
        answer: 'BISHT',
        clue: 'Traditional cloak worn on formal occasions.',
      },
      {
        direction: 'Down',
        row: 7,
        col: 7,
        answer: 'DANCE',
        clue: 'Movement performed to rhythm.',
      },
      {
        direction: 'Across',
        row: 10,
        col: 7,
        answer: 'CRAFT',
        clue: 'Skilled making of traditional objects.',
      },
      {
        direction: 'Down',
        row: 3,
        col: 11,
        answer: 'POETRY',
        clue: 'Art form with a strong place in Gulf culture.',
      },
      {
        direction: 'Across',
        row: 5,
        col: 6,
        answer: 'COFFEE',
        clue: 'A traditional part of Emirati hospitality.',
      },
      {
        direction: 'Down',
        row: 1,
        col: 6,
        answer: 'MUSIC',
        clue: 'Art using rhythm, melody and sound.',
      },
      {
        direction: 'Across',
        row: 1,
        col: 6,
        answer: 'MAJLIS',
        clue: 'Traditional gathering space for community and guests.',
      },
    ],
  ),
];

const getCells = puzzle => {
  const cells = {};

  for (const entry of puzzle.entries) {
    const delta =
      entry.direction === 'Across'
        ? [0, 1]
        : [1, 0];

    for (let index = 0; index < entry.answer.length; index += 1) {
      const row = entry.row + delta[0] * index;
      const col = entry.col + delta[1] * index;
      const key = `${row}-${col}`;

      if (
        row < 0 ||
        col < 0 ||
        row >= puzzle.size ||
        col >= puzzle.size
      ) {
        return null;
      }

      if (
        cells[key] &&
        cells[key].letter !== entry.answer[index]
      ) {
        return null;
      }

      cells[key] = {
        row,
        col,
        letter: entry.answer[index],
        entries: [
          ...(cells[key]?.entries || []),
          entry,
        ],
      };
    }
  }

  return cells;
};

export const validateCrosswordPuzzle = puzzle => {
  if (
    !puzzle?.id ||
    !puzzle?.title ||
    !Number.isInteger(puzzle.size) ||
    !Array.isArray(puzzle.entries) ||
    puzzle.entries.length < 2
  ) {
    return false;
  }

  const cells = getCells(puzzle);

  if (!cells) return false;

  const starts = new Map();

  for (const entry of puzzle.entries) {
    if (
      !/^[A-Z]+$/.test(entry.answer) ||
      !['Across', 'Down'].includes(entry.direction)
    ) {
      return false;
    }

    const start = `${entry.row}-${entry.col}`;
    const existing = starts.get(start);

    if (
      existing &&
      existing.direction === entry.direction
    ) {
      return false;
    }

    starts.set(start, entry);
  }

  const graph = new Map(
    puzzle.entries.map(entry => [entry, new Set()])
  );

  Object.values(cells).forEach(cell => {
    cell.entries.forEach(entry => {
      cell.entries
        .filter(other => other !== entry)
        .forEach(other => {
          graph.get(entry).add(other);
        });
    });
  });

  const visited = new Set([puzzle.entries[0]]);
  const pending = [puzzle.entries[0]];

  while (pending.length) {
    const current = pending.pop();

    graph
      .get(current)
      .forEach(entry => {
        if (!visited.has(entry)) {
          visited.add(entry);
          pending.push(entry);
        }
      });
  }

  if (visited.size !== puzzle.entries.length) {
    return false;
  }

  /*
   * Prevent two separate words running directly beside
   * each other in the same direction.
   */
  for (const cell of Object.values(cells)) {
    for (const [rowOffset, colOffset] of [
      [0, 1],
      [1, 0],
    ]) {
      const adjacent =
        cells[
          `${cell.row + rowOffset}-${cell.col + colOffset}`
        ];

      if (!adjacent) continue;

      if (
        cell.entries.some(entry =>
          adjacent.entries.some(other => {
            if (entry === other) return false;

            return (
              entry.direction === other.direction
            );
          })
        )
      ) {
        return false;
      }
    }
  }

  return true;
};

const numberPuzzles = puzzles =>
  puzzles.map(puzzle => {
    const startCells = [
      ...new Set(
        puzzle.entries.map(
          entry => `${entry.row}-${entry.col}`
        )
      ),
    ]
      .map(key => key.split('-').map(Number))
      .sort(
        ([rowA, colA], [rowB, colB]) =>
          rowA - rowB || colA - colB
      );

    const numbers = new Map(
      startCells.map(
        ([row, col], index) => [
          `${row}-${col}`,
          index + 1,
        ]
      )
    );

    return {
      ...puzzle,
      entries: puzzle.entries.map(entry => ({
        ...entry,
        number: numbers.get(
          `${entry.row}-${entry.col}`
        ),
      })),
    };
  });

const getBoundingBox = puzzle => {
  const occupied = [];

  for (const entry of puzzle.entries) {
    const rowDelta =
      entry.direction === 'Down' ? 1 : 0;

    const colDelta =
      entry.direction === 'Across' ? 1 : 0;

    for (
      let index = 0;
      index < entry.answer.length;
      index += 1
    ) {
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

  return {
    minRow,
    minCol,
    rows: maxRow - minRow + 1,
    cols: maxCol - minCol + 1,
  };
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

export const validCrosswordPuzzles = numberPuzzles(
  crosswordPuzzles
    .filter(validateCrosswordPuzzle)
    .map(normalizePuzzle)
);