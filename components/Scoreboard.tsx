import React from "react";
import TeamLogo from "./TeamLogo";
import { TestIds } from "@/lib/testIds";

export interface ScoreEntry {
  logoUrl: string
  name: string
  record: string // E.G.: "(1-2-0, 7th)"
  score: number
}

/**
 * Scoreboard component displays a list of team entries,
 * each showing logo, name, record, and final score.
 *
 * @param entries - array of ScoreEntry objects
 */
export default function Scoreboard({ entries }: { entries: ScoreEntry[] }) {

  return (
    <div
      data-testid={TestIds.SCOREBOARD_CONTAINER}
      className={[
        "w-full",
        "md:w-80 lg:w-96",
        "border rounded-lg bg-white p-2 space-y-4"
      ].join(" ")}
    >
      {entries.map((entry) => (
        <div
          data-testid={`${TestIds.SCOREBOARD_ENTRY}-${entry.name}`}
          key={entry.name}
          className="flex items-center justify-between"
        >
          {/* Left side: logo + name + record */}
          <div className="flex items-center">

            {/* Team Logo */}
            <TeamLogo
              data-testid={`${TestIds.SCOREBOARD_LOGO}-${entry.name}`}
              src={entry.logoUrl}
              alt={`${entry.name} logo`}
              className="w-auto h-[55px] drop-shadow-medium"
            />

            {/* Team Name and record/rank */}
            <div className="ml-1 flex-1 min-w-0">
              <div
                data-testid={`${TestIds.SCOREBOARD_NAME}-${entry.name}`}
                className="text-lg font-medium truncate max-w-[15ch]">
                {entry.name}
              </div>
              <div
                data-testid={`${TestIds.SCOREBOARD_RECORD}-${entry.name}`}
                className="text-sm text-gray-500">
                {entry.record}
              </div>
            </div>
          </div>

          {/* Right side: formatted score */}
          <div
            data-testid={`${TestIds.SCOREBOARD_SCORE}-${entry.name}`}
            className="flex-shrink-0 text-xl font-semibold">
            {entry.score.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
