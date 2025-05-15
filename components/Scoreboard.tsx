import React from "react";
import TeamLogo from "./TeamLogo";

export interface ScoreEntry {
  logoUrl: string
  name: string
  record: string // E.G.: "(1-2-0, 7th)"
  score: number
}

export default function Scoreboard({ entries }: { entries: ScoreEntry[] }) {
  return (
    <div className="
      w-full                /* mobile: full width */
      md:w-80              /* ≥768px: 33% width */
      lg:w-96              /* ≥1024px: 25% width */
      border rounded-lg bg-white p-2 space-y-4
    ">
      {entries.map((entry) => (
        <div
          key={entry.name}
          className="flex items-center justify-between"
        >
          {/* Left side: logo + name + record */}
          <div className="flex items-center">

            {/* Team Logo */}
            <TeamLogo
              src={entry.logoUrl}
              alt={`${entry.name} logo`}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />

            {/* Team Name and record/rank */}
            <div className="ml-1 flex-1 min-w-0">
              <div className="text-lg font-medium truncate max-w-[15ch]">
                {entry.name}
              </div>
              <div className="text-sm text-gray-500">
                {entry.record}
              </div>
            </div>
          </div>

          {/* Right side: score */}
          <div className="flex-shrink-0 text-xl font-semibold">
            {entry.score}
          </div>
        </div>
      ))}
    </div>
  )
}
