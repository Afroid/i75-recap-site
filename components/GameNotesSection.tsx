import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { GNSSection as GNS } from "@/types/types";
import Scoreboard, { ScoreEntry } from "./Scoreboard";
import { TestIds } from "@/lib/testIds";

interface Props {
  data: GNS;
}

/**
 * Renders a list of game note matchups with:
 * - a Scoreboard for team logos, names, records, and scores
 * - a breakdown description rendered via Markdown
 * - an optional highlight GIF image
 */
export default function GameNotesSection({ data }: Props) {
  return (
    <div data-testid={TestIds.GAME_NOTES_SECTION}>
      {Array.isArray(data.matchups) && data.matchups.map((matchup, i) => {
        // Build the two scoreboard entries from each matchup
        const entries: ScoreEntry[] = [
          {
            logoUrl: matchup.team1Logo || "/default-RWB.png",
            name: matchup.team1,
            record: matchup.record1 || "",
            score: matchup.score1 ?? 0,
          },
          {
            logoUrl: matchup.team2Logo || "/default-logo-alt.png",
            name: matchup.team2,
            record: matchup.record2 || "",
            score: matchup.score2 ?? 0,
          },
        ];


        return (
          <div key={i} className="mb-6" data-testid={`${TestIds.GAME_NOTES_ITEM}-${i}`}>
            {/* Render the ESPN‑style scoreboard */}
            <Scoreboard entries={entries} data-testid={TestIds.GAME_NOTES_SCOREBOARD} />

            {/* Breakdown text (in Markdown) */}
            <div className="mt-2 text-gray-800" data-testid={TestIds.GAME_NOTES_BREAKDOWN}>
              <ReactMarkdown className="whitespace-pre-wrap">
                {matchup.breakdown}
              </ReactMarkdown>
            </div>

            {/* Optional GIF (if provided) */}
            {matchup.imageUrl && (
              <div className="mt-4" data-testid={TestIds.GAME_NOTES_IMAGE_CONTAINER}>
                <Image
                  src={matchup.imageUrl}
                  alt={`${matchup.team1} vs ${matchup.team2} highlight`}
                  width={600}
                  height={400}
                  className="w-full lg:w-auto h-auto rounded shadow-md"
                  data-testid={TestIds.GAME_NOTES_IMAGE}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
