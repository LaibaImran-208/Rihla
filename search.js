// Shared search utility for UAE location search.
// Supports case-insensitive, whitespace-tolerant, partial-match,
// and reasonable typo tolerance via Levenshtein distance.

export function normalizeSearch(str) {
  return (str || '').toLowerCase().trim().replace(/\s+/g, ' ');
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix = [];
  for (let i = 0; i <= a.length; i++) matrix[i] = [i];
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[a.length][b.length];
}

// Build a searchable index from a places array + emirate name map.
// Called once at module load; reused across all searches.
export function buildSearchIndex(places, emirateMap) {
  return places.map(p => {
    const emirateName = emirateMap[p.emirate]?.name || '';
    const haystack = normalizeSearch([
      p.name, emirateName, p.category, p.overview,
      p.history, p.significance, p.didYouKnow,
      ...(p.facts || []), ...(p.related || [])
    ].join(' '));
    return { place: p, emirateName, haystack, normalizedName: normalizeSearch(p.name) };
  });
}

function scoreEntry(haystack, normalizedName, query) {
  const tokens = query.split(' ');
  let allMatch = true;
  let score = 0;
  for (const token of tokens) {
    if (!token) continue;
    if (normalizedName === token) {
      score += 100;
    } else if (normalizedName.startsWith(token)) {
      score += 80;
    } else if (normalizedName.includes(token)) {
      score += 60;
    } else if (haystack.includes(token)) {
      score += 40;
    } else {
      const nameWords = normalizedName.split(' ');
      const fuzzyMatch = nameWords.some(w => {
        if (Math.abs(w.length - token.length) > 2) return false;
        const dist = levenshtein(w, token);
        return dist > 0 && dist <= 2;
      });
      if (fuzzyMatch) {
        score += 30;
      } else {
        allMatch = false;
        break;
      }
    }
  }
  return allMatch ? score : 0;
}

// Search a prebuilt index. Returns array of { place, emirateName, score } sorted by score desc.
export function searchIndex(index, query) {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) return [];
  return index
    .map(entry => ({ ...entry, score: scoreEntry(entry.haystack, entry.normalizedName, normalizedQuery) }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}