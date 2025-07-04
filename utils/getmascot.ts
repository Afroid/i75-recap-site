// These are the only three MLB mascots made of two words
const MULTI_WORD_MASCOTS = new Set([
  "Blue Jays",
  "Red Sox",
  "White Sox",
]);

/**
 * Given a full team name (e.g. "Toronto Blue Jays" or "St. Louis Cardinals"),
 * return just the mascot/logo name ("Blue Jays", "Cardinals", etc.).
 */
export function getMascot(fullName: string): string {
  const parts = fullName.split(" ");

  // For the Athletics
  if (parts.length === 1) return fullName;

  // If the last two equal anything in the set above
  const lastTwo = parts.slice(-2).join(" ");
  if (MULTI_WORD_MASCOTS.has(lastTwo)) return lastTwo;

  // Otherwise, just take the last word
  return parts[parts.length - 1];
}
