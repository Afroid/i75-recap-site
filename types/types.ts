export type SectionType =
  | "intro"
  | "tidbits"
  | "injuries"
  | "leaderDud"
  | "gameNotes"
  | "sidePieces"
  | "matchups"
  | "farewell";

export const sectionDisplayNames: Record<SectionType, string> = {
  intro: "",
  tidbits: "Interesting Tidbits",
  injuries: "Notable Injuries",
  leaderDud: "Leader and Loser",
  gameNotes: "Game Notes",
  sidePieces: "Side Pieces",
  matchups: "Matchup(s) to Watch",
  farewell: "",
};

/**
 * Represents an individual content block within a recap.
 *
 * Each section can include structured content such as intro text, bullet points,
 * an outro, and an optional image (e.g., GIF or screenshot).
 */
export interface RecapSection {
  /** Exclude "gameNotes" so this interface only covers generic sections;
   *  game notes get the specialized GameNotesSection type
  */
  type: Exclude<SectionType, "gameNotes">;

  /** The name of the Generic Fields for each section (e.g., "intro", "tidbits", etc.) */

  /** Optional intro paragraph or lead-in for the section */
  intro?: string;

  /** Optional array of bullet points (supports Markdown formatting) */
  bullets?: string[];

  /** Optional outro paragraph or follow-up commentary */
  outro?: string;

  /** Optional fallback content if not using structured fields */
  content?: string;

  /** Optional image URL to include beneath the content (e.g., GIF, meme, screenshot) */
  imageUrl?: string;

  /** Alt text for the image (important for accessibility and SEO) */
  imageAlt?: string;
}

/**
 * Represents a single fantasy matchup with winner/loser info and analysis.
 */
export interface RecapMatchup {
  /** Team/player 1 name */
  team1: string;
  team1Logo?: string;
  record1?: string; // E.G.: "(1-2, 7th)"
  score1?: number;

  /** Team/player 2 name */
  team2: string;
  team2Logo?: string;
  record2?: string;
  score2?: number;

  /** Markdown content describing the matchup */
  breakdown: string;
  /** Optional image (E.G.: GIF or meme related to the matchup) */
  imageUrl?: string;
  /** Alt text for image */
  imageAlt?: string;
}

/**
 * This section is for Points Leader and the Dud of the week
 */
export interface LDSSection {
  type: "leaderDud";
  pointsLeader: {
    name: string;
    points: number;
    notes?: string;
  };
  dud: {
    name: string;
    points: number;
    notes?: string;
  };
}

/**
 * Special structure for the Game Notes section.
 */
export interface GNSSection {
  type: "gameNotes";
  matchups: RecapMatchup[];
}

/**
 * Represents a single weekly recap for a season.
 *
 * Each recap includes a week number, a title (for display),
 * and a list of content sections that make up the recap body.
 */
export interface RecapWeek {
  /** The week number of the recap (E.G.: 1 for Week 1) */
  week: number;

  /** A custom title for the recap (E.G.: "Week 1 Recap" or something funnier) */
  title: string;

  /** An array of content sections that make up the full recap */
  sections: (RecapSection | LDSSection | GNSSection)[];
}

/**
 * Represents a full set of recaps for a given fantasy season.
 *
 * The structure groups all recaps for a specific year into a single file.
 * You can load a different RecapData object for each season.
 */
export interface RecapData {
  /** The season year these recaps belong to (E.G.: 2024) */
  year: number;

  /** All recaps that occurred during the regular season for that year */
  recaps: RecapWeek[];
}

export type NameMapping = {
  aliases: string[];
  username: string;
};
