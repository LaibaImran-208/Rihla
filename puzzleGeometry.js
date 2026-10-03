const hash = value => {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
};

const signFor = key => (hash(key) % 2 === 0 ? 1 : -1);
const format = point => point.map(value => Number(value.toFixed(2))).join(' ');

function sidePath(start, end, normal, sign) {
  const pointAt = (amount, depth = 0) => [
    start[0] + (end[0] - start[0]) * amount + normal[0] * depth,
    start[1] + (end[1] - start[1]) * amount + normal[1] * depth,
  ];
  const depth = sign * PUZZLE_TAB_DEPTH;
  return [
    `L ${format(pointAt(0.35))}`,
    `C ${format(pointAt(0.4))} ${format(pointAt(0.4, depth * 0.78))} ${format(pointAt(0.5, depth))}`,
    `C ${format(pointAt(0.6, depth * 0.78))} ${format(pointAt(0.6))} ${format(pointAt(0.65))}`,
    `L ${format(end)}`,
  ].join(' ');
}

function makePath({ row, col, rows, cols }) {
  const top = row === 0 ? 0 : -signFor(`h-${row}-${col}`);
  const right = col === cols - 1 ? 0 : signFor(`v-${row}-${col + 1}`);
  const bottom = row === rows - 1 ? 0 : signFor(`h-${row + 1}-${col}`);
  const left = col === 0 ? 0 : -signFor(`v-${row}-${col}`);
  return [
    'M 0 0',
    sidePath([0, 0], [PUZZLE_CELL_SIZE, 0], [0, -1], top),
    sidePath([PUZZLE_CELL_SIZE, 0], [PUZZLE_CELL_SIZE, PUZZLE_CELL_SIZE], [1, 0], right),
    sidePath([PUZZLE_CELL_SIZE, PUZZLE_CELL_SIZE], [0, PUZZLE_CELL_SIZE], [0, 1], bottom),
    sidePath([0, PUZZLE_CELL_SIZE], [0, 0], [-1, 0], left),
    'Z',
  ].join(' ');
}

export const createPuzzlePieces = (rows = 6, cols = 8) => {
  const pieces = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      pieces.push({
        id: `${row}-${col}`,
        row,
        col,
        path: makePath({ row, col, rows, cols }),
      });
    }
  }
  return pieces.sort((first, second) => hash(`order-${first.id}`) - hash(`order-${second.id}`));
};

export const createShuffledPuzzlePieceIds = () => {
  const ids = createPuzzlePieces(PUZZLE_ROWS, PUZZLE_COLUMNS).map(piece => piece.id);
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
  }
  return ids;
};

export const PUZZLE_ROWS = 6;
export const PUZZLE_COLUMNS = 8;
export const PUZZLE_CELL_SIZE = 100;
export const PUZZLE_TAB_DEPTH = 13;
export const PUZZLE_VIEWBOX = { width: 800, height: 600 };
export const PUZZLE_PIECE_VIEWBOX = {
  x: -PUZZLE_TAB_DEPTH,
  y: -PUZZLE_TAB_DEPTH,
  width: PUZZLE_CELL_SIZE + PUZZLE_TAB_DEPTH * 2,
  height: PUZZLE_CELL_SIZE + PUZZLE_TAB_DEPTH * 2,
};