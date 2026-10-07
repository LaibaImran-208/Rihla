import { useEffect, useState, useCallback } from 'react';
import { PUZZLE_STAGE_IDS, puzzleStages } from './puzzleData';
import {
  createPuzzlePieces,
  createShuffledPuzzlePieceIds,
  PUZZLE_COLUMNS,
  PUZZLE_ROWS,
} from './puzzleGeometry';

const KEY = 'rihla-journey-v2';

const REQUIRED_STAMPS = [
  'abu-dhabi',
  'dubai',
  'sharjah',
  'ajman',
  'umm-al-quwain',
  'ras-al-khaimah',
  'fujairah',
];

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
  exploredPlaces: [],
  exploredEmirates: [],
  completedQuizzes: [],
  points: 0,
  badges: [],
  stamps: [],
  topicScores: {},
  crosswordCompleted: [],
  wordGamesCompleted: [],
  puzzleCompleted: [],
  profile: {
    name: '',
    age: '',
    grade: '',
  },
  journeyCompletedAt: null,
  puzzleOrder: PUZZLE_STAGE_IDS,
  puzzleTileOrders: {},
  explorerId: '',
  explorerToken: '',
  lastActivity: '',
  lastActivityAt: null,
  journeyStartedAt: null,
};

const addPointsToState = (state, amount) => ({
  ...state,
  points: state.points + amount,
});

const puzzlePieceIds = createPuzzlePieces(
  PUZZLE_ROWS,
  PUZZLE_COLUMNS
).map(piece => piece.id);

const sendActivity = (state, type, metadata = {}) =>
  fetch('/api/explorer/activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Explorer-Id': state.explorerId,
      'X-Explorer-Token': state.explorerToken,
    },
    body: JSON.stringify({
      type,
      metadata,
      points: state.points,
      stamps: state.stamps,
      journeyCompletedAt: state.journeyCompletedAt,
    }),
  }).catch(() => {});

const randomHex = bytes => {
  const values = crypto.getRandomValues(new Uint8Array(bytes));

  return Array.from(
    values,
    value => value.toString(16).padStart(2, '0')
  ).join('');
};

const newExplorerId = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  const bytes = randomHex(16).split('');

  bytes[12] = '4';
  bytes[16] = ['8', '9', 'a', 'b'][
    Number.parseInt(bytes[16], 16) % 4
  ];

  const value = bytes.join('');

  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(
    12,
    16
  )}-${value.slice(16, 20)}-${value.slice(20)}`;
};

const validTileOrder = order =>
  Array.isArray(order) &&
  order.length === puzzlePieceIds.length &&
  new Set(order).size === puzzlePieceIds.length &&
  puzzlePieceIds.every(id => order.includes(id));

const validStringArray = value =>
  Array.isArray(value) &&
  value.every(item => typeof item === 'string');

const sanitizeStampArray = value =>
  validStringArray(value)
    ? [...new Set(value.filter(id => REQUIRED_STAMPS.includes(id)))]
    : [];

const sanitizeTopicScores = value => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      ([topicId, result]) =>
        typeof topicId === 'string' &&
        result &&
        typeof result === 'object' &&
        !Array.isArray(result) &&
        Number.isInteger(result.score) &&
        result.score >= 0 &&
        Number.isInteger(result.total) &&
        result.total > 0
    )
  );
};

const sanitizeProfile = profile => ({
  name:
    typeof profile?.name === 'string'
      ? profile.name
      : '',
  age:
    typeof profile?.age === 'string' ||
    typeof profile?.age === 'number'
      ? String(profile.age)
      : '',
  grade:
    typeof profile?.grade === 'string'
      ? profile.grade
      : '',
});

const mergeUnique = (first, second) => [
  ...new Set([
    ...(validStringArray(first) ? first : []),
    ...(validStringArray(second) ? second : []),
  ]),
];

const mergeTopicScores = (current, incoming) => {
  const currentScores = sanitizeTopicScores(current);
  const incomingScores = sanitizeTopicScores(incoming);

  return {
    ...currentScores,
    ...incomingScores,
  };
};

const mergeJourneyStates = (current, incoming) => {
  if (!incoming || typeof incoming !== 'object') {
    return current;
  }

  const mergedStamps = sanitizeStampArray(
    mergeUnique(current.stamps, incoming.stamps)
  );

  const currentPoints =
    Number.isFinite(current.points) && current.points >= 0
      ? current.points
      : 0;

  const incomingPoints =
    Number.isFinite(incoming.points) && incoming.points >= 0
      ? incoming.points
      : 0;

  const mergedPoints = Math.max(currentPoints, incomingPoints);

  const currentCompletedAt = current.journeyCompletedAt;
  const incomingCompletedAt = incoming.journeyCompletedAt;

  const mergedCompletedAt =
    currentCompletedAt ||
    incomingCompletedAt ||
    (REQUIRED_STAMPS.every(id => mergedStamps.includes(id))
      ? new Date().toISOString()
      : null);

  const incomingActivityIsNewer =
    incoming.lastActivityAt &&
    (!current.lastActivityAt ||
      new Date(incoming.lastActivityAt).getTime() >
        new Date(current.lastActivityAt).getTime());

  const merged = {
    ...current,

    exploredPlaces: mergeUnique(
      current.exploredPlaces,
      incoming.exploredPlaces
    ),

    exploredEmirates: mergeUnique(
      current.exploredEmirates,
      incoming.exploredEmirates
    ),

    completedQuizzes: mergeUnique(
      current.completedQuizzes,
      incoming.completedQuizzes
    ),

    badges: mergeUnique(
      current.badges,
      incoming.badges
    ),

    stamps: mergedStamps,

    crosswordCompleted: mergeUnique(
      current.crosswordCompleted,
      incoming.crosswordCompleted
    ),

    wordGamesCompleted: mergeUnique(
      current.wordGamesCompleted,
      incoming.wordGamesCompleted
    ),

    puzzleCompleted: mergeUnique(
      current.puzzleCompleted,
      incoming.puzzleCompleted
    ),

    topicScores: mergeTopicScores(
      current.topicScores,
      incoming.topicScores
    ),

    points: mergedPoints,

    journeyCompletedAt: mergedCompletedAt,

    lastActivity: incomingActivityIsNewer
      ? incoming.lastActivity
      : current.lastActivity,

    lastActivityAt: incomingActivityIsNewer
      ? incoming.lastActivityAt
      : current.lastActivity,

    journeyStartedAt:
      current.journeyStartedAt ||
      incoming.journeyStartedAt ||
      null,
  };

  if (
    !merged.journeyCompletedAt &&
    REQUIRED_STAMPS.every(id => merged.stamps.includes(id))
  ) {
    merged.journeyCompletedAt = new Date().toISOString();
  }

  return merged;
};

function createInitialState() {
  let saved = {};

  try {
    saved =
      JSON.parse(localStorage.getItem(KEY) || 'null') || {};
  } catch {
    saved = {};
  }

  const savedPoints =
    Number.isFinite(saved.points) && saved.points >= 0
      ? saved.points
      : 0;

  const state = {
    ...initialState,
    ...saved,

    points: savedPoints,

    exploredPlaces: validStringArray(saved.exploredPlaces)
      ? saved.exploredPlaces
      : [],

    exploredEmirates: validStringArray(saved.exploredEmirates)
      ? saved.exploredEmirates
      : [],

    completedQuizzes: validStringArray(saved.completedQuizzes)
      ? saved.completedQuizzes
      : [],

    badges: validStringArray(saved.badges)
      ? saved.badges
      : [],

    crosswordCompleted: validStringArray(
      saved.crosswordCompleted
    )
      ? saved.crosswordCompleted
      : [],

    wordGamesCompleted: validStringArray(
      saved.wordGamesCompleted
    )
      ? saved.wordGamesCompleted
      : [],

    puzzleCompleted: validStringArray(
      saved.puzzleCompleted
    )
      ? saved.puzzleCompleted
      : [],

    stamps: sanitizeStampArray(saved.stamps),

    topicScores: sanitizeTopicScores(
      saved.topicScores
    ),

    profile: sanitizeProfile(saved.profile),

    puzzleOrder: initialState.puzzleOrder,

    explorerId:
      typeof saved.explorerId === 'string' &&
      saved.explorerId
        ? saved.explorerId
        : newExplorerId(),

    explorerToken:
      typeof saved.explorerToken === 'string' &&
      /^[0-9a-f]{64}$/i.test(saved.explorerToken)
        ? saved.explorerToken
        : randomHex(32),

    puzzleTileOrders: Object.fromEntries(
      puzzleStages.map(stage => [
        stage.id,
        validTileOrder(
          saved.puzzleTileOrders?.[stage.id]
        )
          ? saved.puzzleTileOrders[stage.id]
          : createShuffledPuzzlePieceIds(),
      ])
    ),
  };

  if (
    !state.journeyCompletedAt &&
    REQUIRED_STAMPS.every(id =>
      state.stamps.includes(id)
    )
  ) {
    state.journeyCompletedAt =
      new Date().toISOString();
  }

  try {
    localStorage.setItem(
      KEY,
      JSON.stringify(state)
    );
  } catch {
    // The in-memory journey remains usable when browser storage is unavailable.
  }

  return state;
}

export default function useJourney() {
  const [state, setState] = useState(
    createInitialState
  );

  /*
   * Keep localStorage updated.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        KEY,
        JSON.stringify(state)
      );
    } catch {
      // Keep the journey usable if browser storage is unavailable or full.
    }
  }, [state]);

  /*
   * Merge progress made in another Rihla tab.
   *
   * This prevents one tab from simply replacing another
   * tab's newer stamps, points, challenges, etc.
   */
  useEffect(() => {
    const handleStorage = event => {
      if (event.key !== KEY || !event.newValue) {
        return;
      }

      try {
        const incoming = JSON.parse(event.newValue);

        setState(current =>
          mergeJourneyStates(current, incoming)
        );
      } catch {
        // Ignore malformed external storage data.
      }
    };

    window.addEventListener(
      'storage',
      handleStorage
    );

    return () => {
      window.removeEventListener(
        'storage',
        handleStorage
      );
    };
  }, []);

  const togglePlace = useCallback(
    id =>
      setState(current => ({
        ...current,
        exploredPlaces:
          current.exploredPlaces.includes(id)
            ? current.exploredPlaces.filter(
                item => item !== id
              )
            : [
                ...current.exploredPlaces,
                id,
              ],
      })),
    []
  );

  const toggleEmirate = useCallback(
    id =>
      setState(current => ({
        ...current,
        exploredEmirates:
          current.exploredEmirates.includes(id)
            ? current.exploredEmirates.filter(
                item => item !== id
              )
            : [
                ...current.exploredEmirates,
                id,
              ],
      })),
    []
  );

  const addPoints = useCallback(
    amount =>
      setState(current => {
        const safeAmount =
          Number.isFinite(amount) ? amount : 0;

        return addPointsToState(
          current,
          safeAmount
        );
      }),
    []
  );

  const completeQuiz = useCallback(
    id =>
      setState(current =>
        current.completedQuizzes.includes(id)
          ? current
          : {
              ...current,
              completedQuizzes: [
                ...current.completedQuizzes,
                id,
              ],
            }
      ),
    []
  );

  const saveTopicScore = useCallback(
    (topicId, score, total) =>
      setState(current => ({
        ...current,
        topicScores: {
          ...current.topicScores,
          [topicId]: {
            score,
            total,
          },
        },
      })),
    []
  );

  const completeCrossword = useCallback(
    id => {
      if (state.crosswordCompleted.includes(id)) {
        return;
      }

      const next = {
        ...addPointsToState(
          {
            ...state,
            crosswordCompleted: [
              ...state.crosswordCompleted,
              id,
            ],
          },
          10
        ),
        lastActivity:
          ACTIVITY_LABELS.CHALLENGE_COMPLETED,
        lastActivityAt:
          new Date().toISOString(),
      };

      setState(next);

      sendActivity(
        next,
        'CHALLENGE_COMPLETED',
        {
          challengeId: id,
          kind: 'crossword',
        }
      );
    },
    [state]
  );

  const completeWordGame = useCallback(
    id => {
      if (state.wordGamesCompleted.includes(id)) {
        return;
      }

      const next = {
        ...addPointsToState(
          {
            ...state,
            wordGamesCompleted: [
              ...state.wordGamesCompleted,
              id,
            ],
          },
          10
        ),
        lastActivity:
          ACTIVITY_LABELS.CHALLENGE_COMPLETED,
        lastActivityAt:
          new Date().toISOString(),
      };

      setState(next);

      sendActivity(
        next,
        'CHALLENGE_COMPLETED',
        {
          challengeId: id,
          kind: 'word-game',
        }
      );
    },
    [state]
  );

  const completePuzzle = useCallback(
    id => {
      if (state.puzzleCompleted.includes(id)) {
        return;
      }

      const next = {
        ...state,
        puzzleCompleted: [
          ...state.puzzleCompleted,
          id,
        ],
        lastActivity:
          ACTIVITY_LABELS.PUZZLE_COMPLETED,
        lastActivityAt:
          new Date().toISOString(),
      };

      setState(next);

      sendActivity(
        next,
        'PUZZLE_COMPLETED',
        {
          puzzleId: id,
        }
      );
    },
    [state]
  );

  const recordActivity = useCallback(
    (type, metadata = {}) => {
      if (!ACTIVITY_LABELS[type]) {
        return;
      }

      const at = new Date().toISOString();
      const currentState = state;

      const next = {
        ...currentState,
        lastActivity:
          ACTIVITY_LABELS[type],
        lastActivityAt: at,
        journeyStartedAt:
          type === 'JOURNEY_STARTED'
            ? currentState.journeyStartedAt || at
            : currentState.journeyStartedAt,
      };

      setState(next);

      return sendActivity(
        next,
        type,
        metadata
      );
    },
    [state]
  );

  const unlockStamp = useCallback(
    id => {
      if (
        !REQUIRED_STAMPS.includes(id) ||
        state.stamps.includes(id)
      ) {
        return;
      }

      const next = addPointsToState(
        {
          ...state,
          stamps: [
            ...state.stamps,
            id,
          ],
        },
        50
      );

      const at = new Date().toISOString();

      next.lastActivity =
        ACTIVITY_LABELS.STAMP_EARNED;

      next.lastActivityAt = at;

      if (
        !next.journeyCompletedAt &&
        REQUIRED_STAMPS.every(stampId =>
          next.stamps.includes(stampId)
        )
      ) {
        next.journeyCompletedAt = at;
        next.lastActivity =
          ACTIVITY_LABELS.JOURNEY_COMPLETED;
      }

      setState(next);

      sendActivity(
        next,
        next.journeyCompletedAt === at
          ? 'JOURNEY_COMPLETED'
          : 'STAMP_EARNED',
        {
          stampId: id,
        }
      );
    },
    [state]
  );

  const addBadge = useCallback(
    id =>
      setState(current =>
        current.badges.includes(id)
          ? current
          : addPointsToState(
              {
                ...current,
                badges: [
                  ...current.badges,
                  id,
                ],
              },
              20
            )
      ),
    []
  );

  const saveProfile = useCallback(
    profile => {
      const at = new Date().toISOString();

      const safeProfile = {
        name:
          typeof profile?.name === 'string'
            ? profile.name
            : '',
        age:
          typeof profile?.age === 'string' ||
          typeof profile?.age === 'number'
            ? String(profile.age)
            : '',
        grade:
          typeof profile?.grade === 'string'
            ? profile.grade
            : '',
      };

      const next = {
        ...state,
        profile: safeProfile,
        lastActivity:
          ACTIVITY_LABELS.PROFILE_SAVED,
        lastActivityAt: at,
      };

      setState(next);

      fetch('/api/explorer/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Explorer-Id': state.explorerId,
          'X-Explorer-Token':
            state.explorerToken,
        },
        body: JSON.stringify({
          profile: next.profile,
          points: next.points,
          stamps: next.stamps,
          journeyCompletedAt:
            next.journeyCompletedAt,
        }),
      }).catch(() => {});

      return next;
    },
    [state]
  );

  return {
    ...state,
    togglePlace,
    toggleEmirate,
    addPoints,
    completeQuiz,
    saveTopicScore,
    completeCrossword,
    completeWordGame,
    completePuzzle,
    unlockStamp,
    addBadge,
    saveProfile,
    recordActivity,
  };
}