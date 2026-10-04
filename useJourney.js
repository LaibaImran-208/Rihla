import { useEffect, useState, useCallback } from 'react';
import { PUZZLE_STAGE_IDS, puzzleStages } from './puzzleData';
import { createPuzzlePieces, createShuffledPuzzlePieceIds, PUZZLE_COLUMNS, PUZZLE_ROWS } from './puzzleGeometry';

const KEY = 'rihla-journey-v2';
const REQUIRED_STAMPS = ['abu-dhabi', 'dubai', 'sharjah', 'ajman', 'umm-al-quwain', 'ras-al-khaimah', 'fujairah'];
const ACTIVITY_LABELS = {
  JOURNEY_STARTED: 'Journey started',
  PASSPORT_OPENED: 'Passport opened',
  PROFILE_SAVED: 'Profile saved',
  EMIRATES_OPENED: 'Emirates Explorer opened',
  STAMP_EARNED: 'Passport stamp earned',
  CHALLENGE_COMPLETED: 'Challenge completed',
  PUZZLE_COMPLETED: 'Puzzle completed',
  CERTIFICATE_OPENED: 'Certificate opened',
  CERTIFICATE_PRINTED: 'Certificate print initiated',
  JOURNEY_COMPLETED: 'Rihla journey completed',
};
const initialState = {
  exploredPlaces: [], exploredEmirates: [], completedQuizzes: [], points: 0, badges: [], stamps: [], topicScores: {},
  crosswordCompleted: [], wordGamesCompleted: [], puzzleCompleted: [],
  profile: { name: '', age: '', grade: '' },
  journeyCompletedAt: null,
  puzzleOrder: PUZZLE_STAGE_IDS,
  puzzleTileOrders: {},
  explorerId: '',
  explorerToken: '',
  lastActivity: '',
  lastActivityAt: null,
  journeyStartedAt: null,
};

const addPointsToState = (state, amount) => ({ ...state, points: state.points + amount });
const puzzlePieceIds = createPuzzlePieces(PUZZLE_ROWS, PUZZLE_COLUMNS).map(piece => piece.id);
const sendActivity = (state, type, metadata = {}) => fetch('/api/explorer/activity', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Explorer-Id': state.explorerId, 'X-Explorer-Token': state.explorerToken },
  body: JSON.stringify({ type, metadata, points: state.points, stamps: state.stamps, journeyCompletedAt: state.journeyCompletedAt }),
}).catch(() => {});
const randomHex = bytes => {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(values, value => value.toString(16).padStart(2, '0')).join('');
};
const newExplorerId = () => {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = randomHex(16).split('');
  bytes[12] = '4';
  bytes[16] = ['8', '9', 'a', 'b'][Number.parseInt(bytes[16], 16) % 4];
  const value = bytes.join('');
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
};
const validTileOrder = order => Array.isArray(order)
  && order.length === puzzlePieceIds.length
  && new Set(order).size === puzzlePieceIds.length
  && puzzlePieceIds.every(id => order.includes(id));

function createInitialState() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY) || 'null') || {};
  } catch {
    saved = {};
  }

  const state = {
    ...initialState,
    ...saved,
    crosswordCompleted: Array.isArray(saved.crosswordCompleted) ? saved.crosswordCompleted : [],
    wordGamesCompleted: Array.isArray(saved.wordGamesCompleted) ? saved.wordGamesCompleted : [],
    puzzleCompleted: Array.isArray(saved.puzzleCompleted) ? saved.puzzleCompleted : [],
    stamps: Array.isArray(saved.stamps) ? saved.stamps : [],
    topicScores: saved.topicScores && typeof saved.topicScores === 'object' ? saved.topicScores : {},
    profile: {
      name: saved.profile?.name || '',
      age: saved.profile?.age || '',
      grade: saved.profile?.grade || '',
    },
    puzzleOrder: initialState.puzzleOrder,
    explorerId: typeof saved.explorerId === 'string' && saved.explorerId ? saved.explorerId : newExplorerId(),
    explorerToken: typeof saved.explorerToken === 'string' && saved.explorerToken ? saved.explorerToken : randomHex(32),
    puzzleTileOrders: Object.fromEntries(puzzleStages.map(stage => [
      stage.id,
      validTileOrder(saved.puzzleTileOrders?.[stage.id]) ? saved.puzzleTileOrders[stage.id] : createShuffledPuzzlePieceIds(),
    ])),
  };
  if (!state.journeyCompletedAt && REQUIRED_STAMPS.every(id => state.stamps.includes(id))) state.journeyCompletedAt = new Date().toISOString();

  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // The in-memory journey remains usable when browser storage is unavailable.
  }
  return state;
}

export default function useJourney() {
  const [state, setState] = useState(createInitialState);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);
  const togglePlace = useCallback(id => setState(current => ({ ...current, exploredPlaces: current.exploredPlaces.includes(id) ? current.exploredPlaces.filter(item => item !== id) : [...current.exploredPlaces, id] })), []);
  const toggleEmirate = useCallback(id => setState(current => ({ ...current, exploredEmirates: current.exploredEmirates.includes(id) ? current.exploredEmirates.filter(item => item !== id) : [...current.exploredEmirates, id] })), []);
  const addPoints = useCallback(amount => setState(current => addPointsToState(current, amount)), []);
  const completeQuiz = useCallback(id => setState(current => current.completedQuizzes.includes(id) ? current : { ...current, completedQuizzes: [...current.completedQuizzes, id] }), []);
  const saveTopicScore = useCallback((topicId, score, total) => setState(current => ({ ...current, topicScores: { ...current.topicScores, [topicId]: { score, total } } })), []);
  const completeCrossword = useCallback(id => {
    if (state.crosswordCompleted.includes(id)) return;
    const next = { ...addPointsToState({ ...state, crosswordCompleted: [...state.crosswordCompleted, id] }, 10), lastActivity: ACTIVITY_LABELS.CHALLENGE_COMPLETED, lastActivityAt: new Date().toISOString() };
    setState(next);
    sendActivity(next, 'CHALLENGE_COMPLETED', { challengeId: id, kind: 'crossword' });
  }, [state]);
  const completeWordGame = useCallback(id => {
    if (state.wordGamesCompleted.includes(id)) return;
    const next = { ...addPointsToState({ ...state, wordGamesCompleted: [...state.wordGamesCompleted, id] }, 10), lastActivity: ACTIVITY_LABELS.CHALLENGE_COMPLETED, lastActivityAt: new Date().toISOString() };
    setState(next);
    sendActivity(next, 'CHALLENGE_COMPLETED', { challengeId: id, kind: 'word-game' });
  }, [state]);
  const completePuzzle = useCallback(id => {
    if (state.puzzleCompleted.includes(id)) return;
    const next = { ...state, puzzleCompleted: [...state.puzzleCompleted, id], lastActivity: ACTIVITY_LABELS.PUZZLE_COMPLETED, lastActivityAt: new Date().toISOString() };
    setState(next);
    sendActivity(next, 'PUZZLE_COMPLETED', { puzzleId: id });
  }, [state]);
  const recordActivity = useCallback((type, metadata = {}) => {
    if (!ACTIVITY_LABELS[type]) return;
    const at = new Date().toISOString();
    const currentState = state;
    const next = {
      ...currentState,
      lastActivity: ACTIVITY_LABELS[type],
      lastActivityAt: at,
      journeyStartedAt: type === 'JOURNEY_STARTED' ? currentState.journeyStartedAt || at : currentState.journeyStartedAt,
    };
    setState(next);
    return sendActivity(next, type, metadata);
  }, [state]);
  const unlockStamp = useCallback(id => {
    if (state.stamps.includes(id)) return;
    const next = addPointsToState({ ...state, stamps: [...state.stamps, id] }, 50);
    const at = new Date().toISOString();
    next.lastActivity = ACTIVITY_LABELS.STAMP_EARNED;
    next.lastActivityAt = at;
    if (!next.journeyCompletedAt && REQUIRED_STAMPS.every(stampId => next.stamps.includes(stampId))) {
      next.journeyCompletedAt = at;
      next.lastActivity = ACTIVITY_LABELS.JOURNEY_COMPLETED;
    }
    setState(next);
    sendActivity(next, next.journeyCompletedAt === at ? 'JOURNEY_COMPLETED' : 'STAMP_EARNED', { stampId: id });
  }, [state]);
  const addBadge = useCallback(id => setState(current => current.badges.includes(id) ? current : addPointsToState({ ...current, badges: [...current.badges, id] }, 20)), []);
  const saveProfile = useCallback(profile => {
    const at = new Date().toISOString();
    const next = { ...state, profile: { name: profile.name, age: profile.age, grade: profile.grade }, lastActivity: ACTIVITY_LABELS.PROFILE_SAVED, lastActivityAt: at };
    setState(next);
    fetch('/api/explorer/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Explorer-Id': state.explorerId, 'X-Explorer-Token': state.explorerToken },
      body: JSON.stringify({ profile: next.profile, points: next.points, stamps: next.stamps, journeyCompletedAt: next.journeyCompletedAt }),
    }).catch(() => {});
    return next;
  }, [state]);
  return { ...state, togglePlace, toggleEmirate, addPoints, completeQuiz, saveTopicScore, completeCrossword, completeWordGame, completePuzzle, unlockStamp, addBadge, saveProfile, recordActivity };
}