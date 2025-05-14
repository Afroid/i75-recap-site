import { z } from "zod";

const RecapMatchupSchema = z.object({
  team1: z.string(),
  team2: z.string(),
  winner: z.string(),
  score: z.string(),
  breakdown: z.string(),
  imageUrl: z.string().optional(),
  imageAlt: z.string().optional(),
});

const GameNotesSectionSchema = z.object({
  type: z.literal("gameNotes"),
  pointsLeader: z.object({
    name: z.string(),
    points: z.number(),
    notes: z.string().optional(),
  }),
  dud: z.object({
    name: z.string(),
    points: z.number(),
    notes: z.string().optional(),
  }),
  matchups: z.array(RecapMatchupSchema),
});

const RecapSectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("intro"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("tidbits"),
    intro: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    outro: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  z.object({
    type: z.literal("injuries"),
    intro: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    outro: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  z.object({
    type: z.literal("sidePieces"),
    intro: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    outro: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  z.object({
    type: z.literal("matchups"),
    intro: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    outro: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
  z.object({
    type: z.literal("farewell"),
    intro: z.string().optional(),
    bullets: z.array(z.string()).optional(),
    outro: z.string().optional(),
    imageUrl: z.string().optional(),
    imageAlt: z.string().optional(),
  })
]);

const RecapWeekSchema = z.object({
  week: z.number(),
  title: z.string(),
  sections: z.array(z.union([RecapSectionSchema, GameNotesSectionSchema])),
});

export const RecapDataSchema = z.object({
  year: z.number(),
  recaps: z.array(RecapWeekSchema),
});
