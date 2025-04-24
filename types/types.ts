/**
 * Represents an individual content block within a recap.
 * 
 * Each section can be a block of text (like "intro", "tidbits", etc.)
 * and may optionally include an image (e.g. for GIFs or screenshots).
 */
export interface RecapSection {
  /** The name of the section (e.g., "intro", "gameNotes", etc.) */
  type: string;

  /** The main written content for this section */
  content: string;

  /** Optional image URL to include beneath the content (e.g., GIF, meme, screenshot) */
  imageUrl?: string;

  /** Alt text for the image (important for accessibility and SEO) */
  imageAlt?: string;
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
  sections: RecapSection[];
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
