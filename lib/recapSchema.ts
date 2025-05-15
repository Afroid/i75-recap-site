import { z } from "zod";

// Generic sections (exclude gameNotes)
const RecapSectionSchema = z.object({
  type: z.enum([
    "intro",
    "tidbits",
    "injuries",
    "sidePieces",
    "matchups",
    "farewell",
  ]),
  intro:     z.string().optional(),
  bullets:   z.string().array().optional(),
  outro:     z.string().optional(),
  content:   z.string().optional(),
  imageUrl:  z.string().optional(),
  imageAlt:  z.string().optional(),
});

// New matchup schema for matching score1/score2
const RecapMatchupSchema = z.object({
  team1:      z.string(),
  team1Logo:  z.string().optional(),
  record1:    z.string().optional(),
  score1:     z.number(),
  team2:      z.string(),
  team2Logo:  z.string().optional(),
  record2:    z.string().optional(),
  score2:     z.number(),
  breakdown:  z.string(),
  imageUrl:   z.string().optional(),
  imageAlt:   z.string().optional(),
});

// Points Leader and Dud Section schema
const LeaderDudSectionSchema = z.object({
  type: z.literal("leaderDud"),
  pointsLeader: z.object({
    name:   z.string(),
    points: z.number(),
    notes:  z.string().optional(),
  }),
  dud: z.object({
    name:   z.string(),
    points: z.number(),
    notes:  z.string().optional(),
  }),
})

// Game Notes Section schema
const GameNotesSectionSchema = z.object({
  type: z.literal("gameNotes"),
  matchups: z.array(RecapMatchupSchema),
});

// Discriminated union of the three
const SectionSchema = z.discriminatedUnion("type", [
  RecapSectionSchema,
  LeaderDudSectionSchema,
  GameNotesSectionSchema,
]);

// The rest of the recap/week/data schemas
const RecapWeekSchema = z.object({
  week:     z.number(),
  title:    z.string(),
  sections: z.array(SectionSchema),
});

export const RecapDataSchema = z.object({
  year:   z.number(),
  recaps: z.array(RecapWeekSchema),
});
