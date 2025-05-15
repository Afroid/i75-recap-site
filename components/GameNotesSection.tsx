import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { GNSSection as GNS } from "@/types/types";

import Scoreboard, { ScoreEntry } from "./Scoreboard";

interface Props {
  data: GNS;
}

export default function GameNotesSection({ data }: Props) {
  return (
    <div>
      {Array.isArray(data.matchups) && data.matchups.map((matchup, i) => {
        // Build the two scoreboard entries from each matchup
        const entries: ScoreEntry[] = [
          {
            logoUrl: matchup.team1Logo || "/default-logo.png",
            name: matchup.team1,
            record: matchup.record1 || "", // you’ll need to add record1/record2 to your JSON
            score: matchup.score1 ?? 0, // or split your score into two fields
          },
          {
            logoUrl: matchup.team2Logo || "/default-logo.png",
            name: matchup.team2,
            record: matchup.record2 || "",
            score: matchup.score2 ?? 0,
          },
        ];


        return (
          <div key={i} className="mb-6">
            {/* Render the ESPN‑style scoreboard */}
            <Scoreboard entries={entries} />

            {/* Breakdown text */}
            <div className="mt-2 text-gray-800">
              <ReactMarkdown className="whitespace-pre-wrap">
                {matchup.breakdown}
              </ReactMarkdown>
            </div>

            {/* Optional GIF */}
            {matchup.imageUrl && (
              <div className="mt-4">
                <Image
                  src={matchup.imageUrl}
                  alt={`${matchup.team1} vs ${matchup.team2} highlight`}
                  width={600}
                  height={400}
                  className="w-full lg:w-auto h-auto rounded shadow-md"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
