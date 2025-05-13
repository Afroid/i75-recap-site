import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { GNSSection as GNS } from "@/types/types";

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

      {Array.isArray(data.matchups) && data.matchups.map((matchup, i) => (
        <div key={i} className="border rounded p-4 mb-6 bg-gray-50">
          <p className="text-md font-medium mb-1">
            {matchup.team1} vs {matchup.team2} —
            <span className="font-semibold">{matchup.winner} wins</span>
          </p>
          <p className="text-sm text-gray-600 mb-2">{matchup.score}</p>
          <ReactMarkdown className="text-gray-800 whitespace-pre-line mb-2">
            {matchup.breakdown}
          </ReactMarkdown>
          {matchup.imageUrl && (
            <Image
              src={matchup.imageUrl}
              alt={matchup.imageAlt || "Matchup image"}
              width={600}
              height={400}
              className="rounded shadow-md"
            />
          )}
        </div>
      ))}
    </div>
  );
}
