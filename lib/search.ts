import Fuse from "fuse.js";
import { knowledgeBase } from "./knowledge";

export type KnowledgeItem = {
  id: string;
  title: string;
  content: string;
  keywords?: string[];
};

// -------------------------------
// NORMALIZE (VERY IMPORTANT)
// -------------------------------
function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

// -------------------------------
// FUZZY SEARCH (BASE LAYER)
// -------------------------------
const fuse = new Fuse(knowledgeBase, {
  keys: [
    { name: "title", weight: 0.6 },
    { name: "content", weight: 0.3 },
    { name: "keywords", weight: 0.9 }, // 🔥 keyword boost
  ],
  threshold: 0.4, // balanced (better than 0.3 for typo tolerance)
  includeScore: true,
});

// -------------------------------
// SCORE BOOST SYSTEM (IMPORTANT FIX)
// -------------------------------
function scoreBoost(query: string, item: KnowledgeItem) {
  let score = 0;

  const q = normalize(query);
  const title = normalize(item.title);
  const content = normalize(item.content);

  // direct matches
  if (title.includes(q)) score += 10;
  if (content.includes(q)) score += 4;

  // keyword matches (VERY IMPORTANT for "arc chain" type queries)
  if (item.keywords) {
    for (const key of item.keywords) {
      if (normalize(key).includes(q) || q.includes(normalize(key))) {
        score += 15;
      }
    }
  }

  // partial word boost (arc, chain, blockchain etc.)
  const words = q.split(" ");
  words.forEach((w) => {
    if (title.includes(w)) score += 3;
    if (content.includes(w)) score += 1;
  });

  return score;
}

// -------------------------------
// MAIN SEARCH FUNCTION
// -------------------------------
export function searchKnowledge(query: string) {
  const normalizedQuery = normalize(query);

  // 1. Fuse search results
  const fuseResults = fuse.search(query).map((r) => r.item);

  // 2. Merge with raw knowledge (ensures no empty result issue)
  const merged = [...new Set([...fuseResults, ...knowledgeBase])];

  // 3. Score + rank
  const ranked = merged
    .map((item) => ({
      item,
      score: scoreBoost(normalizedQuery, item),
    }))
    .sort((a, b) => b.score - a.score)
    .filter((x) => x.score > 0)
    .map((x) => x.item);

  // 4. fallback safety (NEVER return empty)
  return ranked.length > 0 ? ranked.slice(0, 3) : fuseResults.slice(0, 3);
}