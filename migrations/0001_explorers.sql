CREATE TABLE IF NOT EXISTS explorers (
  id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL,
  name TEXT,
  age INTEGER,
  grade TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  journey_completed INTEGER NOT NULL DEFAULT 0 CHECK (journey_completed IN (0, 1)),
  journey_completed_at TEXT,
  passport_points INTEGER NOT NULL DEFAULT 0,
  stamp_ids TEXT NOT NULL DEFAULT '[]',
  last_activity TEXT,
  last_activity_at TEXT,
  certificate_opened_at TEXT,
  certificate_print_initiated_at TEXT
);

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  explorer_id TEXT NOT NULL REFERENCES explorers(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS activities_explorer_created_idx ON activities (explorer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS explorers_completion_idx ON explorers (journey_completed, journey_completed_at);
