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
      {data.pointsLeader && (
        <>
          <h3 className="text-xl font-semibold mt-2 mb-1">
            Points Leader: {data.pointsLeader.name}
            <span className="ml-1 text-green-500">
              ({data.pointsLeader.points})
            </span>
          </h3>
          {data.pointsLeader.notes && (
            <ReactMarkdown className="text-gray-800 mb-4">
              {data.pointsLeader.notes}
            </ReactMarkdown>
          )}
        </>
      )}

      {data.dud && (
        <>
          <h3 className="text-xl font-semibold mt-2 mb-1">
            Dud: {data.dud.name}
            <span className="ml-1 text-red-500">
              ({data.dud.points})
            </span>
          </h3>
          {data.dud.notes && (
            <ReactMarkdown className="text-gray-800 mb-4">
              {data.dud.notes}
            </ReactMarkdown>
          )}
        </>
      )}

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
              <ReactMarkdown>
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
