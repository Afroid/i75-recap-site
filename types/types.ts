/**
 * Represents an individual content block within a recap.
 *
 * Each section can include structured content such as intro text, bullet points,
 * an outro, and an optional image (e.g., GIF or screenshot).
 */
export interface RecapSection {
  /** The name of the section (e.g., "intro", "tidbits", etc.) */
  type: string;

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
  /** Team/player 2 name */
  team2: string;
  /** Name of the winner */
  winner: string;
  /** Final score in format '123.4-110.3' */
  score: string;
  /** Markdown content describing the matchup */
  breakdown: string;
  /** Optional image (e.g., gif or meme related to the matchup) */
  imageUrl?: string;
  /** Alt text for image */
  imageAlt?: string;
}

/**
 * Special structure for the Game Notes section.
 */
export interface GameNotesSection {
  type: "gameNotes";
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
  matchups: RecapMatchup[];
}

/**
 * Represents a single weekly recap for a season.
 *
 * Each recap includes a week number, a title (for display),
 * and a list of content sections that make up the recap body.
 */
export interface RecapWeek {
  /** The week number of the recap (e.g., 1 for Week 1) */
  week: number;

  /** A custom title for the recap (e.g., "Week 1 Recap" or something funnier) */
  title: string;

  /** An array of content sections that make up the full recap */
  sections: (RecapSection | GameNotesSection)[];
}

/**
 * Represents a full set of recaps for a given fantasy season.
 *
 * The structure groups all recaps for a specific year into a single file.
 * You can load a different RecapData object for each season.
 */
export interface RecapData {
  /** The season year these recaps belong to (e.g., 2024) */
  year: number;

  /** All recaps that occurred during the regular season for that year */
  recaps: RecapWeek[];
}

export type NameMapping = {
  aliases: string[];
  username: string;
};
