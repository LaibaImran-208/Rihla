import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { ArrowRight, Check } from 'lucide-react';
import {
  createPuzzlePieces,
  PUZZLE_CELL_SIZE,
  PUZZLE_COLUMNS,
  PUZZLE_PIECE_VIEWBOX,
  PUZZLE_ROWS,
  PUZZLE_VIEWBOX,
} from './puzzleGeometry';

function PieceArtwork({ piece, image, layer = 'tray', outline = false }) {
  const clipId = `puzzle-${layer}-${piece.id}`;
  const viewBox = PUZZLE_PIECE_VIEWBOX;
  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <path d={piece.path} />
        </clipPath>
      </defs>
      <image
        href={image}
        x={-piece.col * PUZZLE_CELL_SIZE}
        y={-piece.row * PUZZLE_CELL_SIZE}
        width={PUZZLE_VIEWBOX.width}
        height={PUZZLE_VIEWBOX.height}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />
      {outline && <path className="puzzle-piece-outline" d={piece.path} />}
    </svg>
  );
}

const initialDrag = null;

export default function PuzzleGame({ puzzle, trayOrder, onNext, onComplete, isLastStage, completedCount }) {
  const pieces = useMemo(() => createPuzzlePieces(PUZZLE_ROWS, PUZZLE_COLUMNS), []);
  const boardRef = useRef(null);
  const dragRef = useRef(initialDrag);
  const finishedRef = useRef(null);
  const returnTimerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [placedIds, setPlacedIds] = useState(() => new Set());
  const [dragging, setDragging] = useState(initialDrag);
  const isComplete = placedIds.size === pieces.length;

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;

    const measure = () => setBoardSize({ width: board.clientWidth, height: board.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    dragRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    if (!isComplete || finishedRef.current === puzzle.id) return;
    finishedRef.current = puzzle.id;
    onComplete(puzzle.id);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      confetti({ particleCount: 48, spread: 52, startVelocity: 26, origin: { y: 0.64 }, colors: ['#C8965A', '#F5F0E8', '#71908C'] });
    }
  }, [isComplete, onComplete, puzzle.id]);

  useEffect(() => {
    const refreshTarget = active => {
      const piece = pieces.find(item => item.id === active.id);
      const board = boardRef.current;
      if (!piece || !board) return active;
      const rect = board.getBoundingClientRect();
      const cellWidth = board.clientWidth / PUZZLE_COLUMNS;
      const cellHeight = board.clientHeight / PUZZLE_ROWS;
      const centerX = active.x + active.width / 2;
      const centerY = active.y + active.height / 2;
      const targetX = rect.left + board.clientLeft + (piece.col + 0.5) * cellWidth;
      const targetY = rect.top + board.clientTop + (piece.row + 0.5) * cellHeight;
      const tolerance = Math.min(cellWidth, cellHeight) * 0.36;
      const nearTarget = Math.hypot(centerX - targetX, centerY - targetY) <= tolerance * 1.6;
      return active.nearTarget === nearTarget ? active : { ...active, nearTarget };
    };

    const autoScroll = () => {
      const active = dragRef.current;
      if (!active || active.returning) {
        scrollFrameRef.current = null;
        return;
      }
      const edge = 76;
      let amount = 0;
      if (active.pointerY < edge) amount = -Math.max(4, Math.ceil((edge - active.pointerY) * 0.22));
      else if (active.pointerY > window.innerHeight - edge) amount = Math.max(4, Math.ceil((active.pointerY - window.innerHeight + edge) * 0.22));
      if (!amount) {
        scrollFrameRef.current = null;
        return;
      }
      window.scrollTo({ top: window.scrollY + amount, behavior: 'instant' });
      const refreshed = refreshTarget(dragRef.current);
      if (refreshed !== dragRef.current) {
        dragRef.current = refreshed;
        setDragging(refreshed);
      }
      scrollFrameRef.current = window.requestAnimationFrame(autoScroll);
    };

    const getTarget = (piece, drag) => {
      const board = boardRef.current;
      if (!board) return { near: false, valid: false };
      const rect = board.getBoundingClientRect();
      const left = rect.left + board.clientLeft;
      const top = rect.top + board.clientTop;
      const cellWidth = board.clientWidth / PUZZLE_COLUMNS;
      const cellHeight = board.clientHeight / PUZZLE_ROWS;
      const centerX = drag.x + drag.width / 2;
      const centerY = drag.y + drag.height / 2;
      const targetX = left + (piece.col + 0.5) * cellWidth;
      const targetY = top + (piece.row + 0.5) * cellHeight;
      const distance = Math.hypot(centerX - targetX, centerY - targetY);
      const tolerance = Math.min(cellWidth, cellHeight) * 0.36;
      return { near: distance <= tolerance * 1.6, valid: distance <= tolerance };
    };

    const move = event => {
      const active = dragRef.current;
      if (!active || event.pointerId !== active.pointerId || active.returning) return;
      const next = {
        ...active,
        x: event.clientX - active.grabOffsetX,
        y: event.clientY - active.grabOffsetY,
        pointerX: event.clientX,
        pointerY: event.clientY,
      };
      const piece = pieces.find(item => item.id === next.id);
      const target = piece ? getTarget(piece, next) : { near: false };
      next.nearTarget = target.near;
      dragRef.current = next;
      setDragging(next);
      if (next.pointerY < 76 || next.pointerY > window.innerHeight - 76) {
        if (scrollFrameRef.current === null) scrollFrameRef.current = window.requestAnimationFrame(autoScroll);
      } else if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      event.preventDefault();
    };

    const finish = event => {
      const active = dragRef.current;
      if (!active || event.pointerId !== active.pointerId) return;
      const piece = pieces.find(item => item.id === active.id);
      const finalDrag = { ...active, x: event.clientX - active.grabOffsetX, y: event.clientY - active.grabOffsetY };
      const target = piece ? getTarget(piece, finalDrag) : { valid: false };
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      if (piece && target.valid) {
        dragRef.current = null;
        setPlacedIds(current => new Set(current).add(piece.id));
        setDragging(null);
        return;
      }

      const returning = {
        ...active,
        x: active.originPageLeft - window.scrollX,
        y: active.originPageTop - window.scrollY,
        returning: true,
        nearTarget: false,
      };
      dragRef.current = returning;
      setDragging(returning);
      if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
      returnTimerRef.current = window.setTimeout(() => {
        dragRef.current = null;
        setDragging(null);
      }, 220);
    };

    const cancel = event => {
      const active = dragRef.current;
      if (!active || event.pointerId !== active.pointerId) return;
      finish({ pointerId: active.pointerId, clientX: active.x + active.grabOffsetX, clientY: active.y + active.grabOffsetY });
    };

    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', cancel);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', cancel);
      if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
    };
  }, [pieces]);

  const startDrag = (event, piece) => {
    if ((event.button !== undefined && event.button !== 0) || dragRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.preventDefault();
    if (returnTimerRef.current) window.clearTimeout(returnTimerRef.current);
    const next = {
      id: piece.id,
      pointerId: event.pointerId,
      grabOffsetX: event.clientX - rect.left,
      grabOffsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      originLeft: rect.left,
      originTop: rect.top,
      originPageLeft: rect.left + window.scrollX,
      originPageTop: rect.top + window.scrollY,
      x: rect.left,
      y: rect.top,
      pointerX: event.clientX,
      pointerY: event.clientY,
      returning: false,
      nearTarget: false,
    };
    dragRef.current = next;
    setDragging(next);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const placeWithKeyboard = (event, piece) => {
    if ((event.key === 'Enter' || event.key === ' ') && !placedIds.has(piece.id)) {
      event.preventDefault();
      setPlacedIds(current => new Set(current).add(piece.id));
    }
  };

  const pieceOrder = useMemo(() => new Map((trayOrder || pieces.map(piece => piece.id)).map((id, index) => [id, index])), [pieces, trayOrder]);
  const remainingPieces = pieces.filter(piece => !placedIds.has(piece.id)).sort((first, second) => pieceOrder.get(first.id) - pieceOrder.get(second.id));
  const draggedPiece = dragging ? pieces.find(piece => piece.id === dragging.id) : null;
  const cellWidth = boardSize.width / PUZZLE_COLUMNS;
  const cellHeight = boardSize.height / PUZZLE_ROWS;

  return (
    <div className="puzzle-play-area">
      <div className="puzzle-board-wrap">
        <div className={`puzzle-board${dragging?.nearTarget ? ' is-target-near' : ''}`} ref={boardRef} role="group" aria-label={`${puzzle.title} puzzle board`}>
          <img className="puzzle-guide" src={puzzle.image} alt="" aria-hidden="true" />
          {dragging?.nearTarget && draggedPiece && (
            <svg className="puzzle-target-slot" viewBox={`0 0 ${PUZZLE_VIEWBOX.width} ${PUZZLE_VIEWBOX.height}`} preserveAspectRatio="none" aria-hidden="true">
              <path d={draggedPiece.path} transform={`translate(${draggedPiece.col * PUZZLE_CELL_SIZE} ${draggedPiece.row * PUZZLE_CELL_SIZE})`} />
            </svg>
          )}
          <div className="puzzle-board-placed" aria-live="polite">
            {pieces.filter(piece => placedIds.has(piece.id)).map(piece => (
              <div
                key={piece.id}
                className="puzzle-placed-piece"
                style={{ left: `${piece.col * cellWidth}px`, top: `${piece.row * cellHeight}px`, width: `${cellWidth}px`, height: `${cellHeight}px` }}
              >
                <PieceArtwork piece={piece} image={puzzle.image} layer="placed" outline />
              </div>
            ))}
          </div>
          <span className="sr-only">{placedIds.size} of {pieces.length} pieces placed</span>
        </div>
      </div>

      <p className="puzzle-hint" aria-live="polite">{isComplete ? 'Puzzle complete.' : `${placedIds.size} of ${pieces.length} placed. Drag a piece from the tray onto its matching slot.`}</p>

      <section className="puzzle-piece-tray" aria-label={`Piece tray: ${remainingPieces.length} pieces remaining`}>
        <div className="puzzle-tray-header">
          <span className="puzzle-tray-label">Pieces</span>
          <span>{remainingPieces.length} remaining</span>
        </div>
        <div className="puzzle-tray-scroll" role="list" aria-label="Available puzzle pieces">
          {remainingPieces.map(piece => {
            const active = dragging?.id === piece.id;
            return (
              <button
                key={piece.id}
                type="button"
                className={`puzzle-piece${active ? ' is-drag-origin' : ''}`}
                aria-label={`Puzzle piece ${piece.row * PUZZLE_COLUMNS + piece.col + 1}. Drag it to the board or press Enter to place it.`}
                onPointerDown={event => startDrag(event, piece)}
                onKeyDown={event => placeWithKeyboard(event, piece)}
              >
                <PieceArtwork piece={piece} image={puzzle.image} />
              </button>
            );
          })}
        </div>
      </section>

      {dragging && draggedPiece && createPortal(
        <div
          className={`puzzle-drag-overlay${dragging.returning ? ' is-returning' : ''}${dragging.nearTarget ? ' is-near-target' : ''}`}
          aria-hidden="true"
          style={{ left: dragging.x, top: dragging.y, width: dragging.width, height: dragging.height }}
        >
          <PieceArtwork piece={draggedPiece} image={puzzle.image} layer="drag" outline />
        </div>,
        document.body,
      )}

      {!isComplete ? null : (
        <section className="puzzle-reward" aria-live="polite">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#2D6A4F] text-white"><Check size={22} /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#C8965A]">{isLastStage ? 'Journey complete' : 'Puzzle complete'}</p>
              <h2 className="font-display text-2xl font-bold text-[#F5F0E8]">{puzzle.id === 'uae' ? 'You built the UAE!' : `${puzzle.title} discovered!`}</h2>
            </div>
          </div>
          <ul className="puzzle-facts">{puzzle.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          {isLastStage ? (
            <div className="puzzle-finish-row">
              <p className="text-sm text-[#8FA3BF]">{completedCount} of 8 Rihla puzzles completed.</p>
              <Link className="rihla-primary" to="/puzzles">Back to Puzzles <ArrowRight size={18} /></Link>
            </div>
          ) : (
            <button type="button" className="rihla-primary mt-5 min-h-12" onClick={onNext}>Next Emirate <ArrowRight size={18} /></button>
          )}
        </section>
      )}
    </div>
  );
}
