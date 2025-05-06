import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  RecapWeek,
  RecapSection,
  GameNotesSection,
  // RecapMatchup
} from "@/types/types";

interface Props {
  recap: RecapWeek;
  year: string;
}

export default function RecapLayout({ recap, year }: Props) {
  return (
    <div className="pt-16 lg:pl-[250px] px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {year} - Week {recap.week} Recap
      </h1>

      {recap.sections.map((section, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === recap.sections.length - 1;
        const isGameNotes = section.type === "Game Notes";

        return (
          <div key={idx} className="mb-8">
            {!isFirst && !isLast && (
              <h2 className="text-2xl font-bold mb-2">
                {isGameNotes ? `Week ${recap.week} Game Notes` : section.type}
              </h2>
            )}

            {isGameNotes ? (() => {
              const gameNotes = section as GameNotesSection;

              return (
                <div>
                  {gameNotes.pointsLeader && (
                    <>
                      <h3 className="text-xl font-semibold mt-2 mb-1">
                        Points Leader:
                        {gameNotes.pointsLeader.name}
                        ({gameNotes.pointsLeader.points})
                      </h3>
                      {gameNotes.pointsLeader.notes && (
                        <ReactMarkdown className="text-gray-800 mb-4">
                          {gameNotes.pointsLeader.notes}
                        </ReactMarkdown>
                      )}
                    </>
                  )}

                  {gameNotes.dud && (
                    <>
                      <h3 className="text-xl font-semibold mt-2 mb-1">
                        Dud: {gameNotes.dud.name} ({gameNotes.dud.points})
                      </h3>
                      {gameNotes.dud.notes && (
                        <ReactMarkdown className="text-gray-800 mb-4">
                          {gameNotes.dud.notes}
                        </ReactMarkdown>
                      )}
                    </>
                  )}

                  {Array.isArray(gameNotes.matchups) && gameNotes.matchups.map((matchup, i) => (
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
            })() : (
              <>
                {"intro" in section && section.intro && (
                  <ReactMarkdown className="text-lg text-gray-800 mb-2">
                    {section.intro}
                  </ReactMarkdown>
                )}
                {Array.isArray((section as RecapSection).bullets) && (
                  <ul className="list-disc pl-6 space-y-1">
                    {(section as RecapSection).bullets!.map((bullet, i) => (
                      <li key={i}>
                        <ReactMarkdown>{bullet}</ReactMarkdown>
                      </li>
                    ))}
                  </ul>
                )}
                {"outro" in section && section.outro && (
                  <ReactMarkdown className="text-lg text-gray-800 mt-2">
                    {section.outro}
                  </ReactMarkdown>
                )}
                {"content" in section && section.content && !("bullets" in section) && (
                  <ReactMarkdown className="text-lg text-gray-800 whitespace-pre-line">
                    {section.content}
                  </ReactMarkdown>
                )}
                {"imageUrl" in section && section.imageUrl && (
                  <div className="mt-4">
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt || "GIF or Screenshot"}
                      width={600}
                      height={400}
                      className="rounded shadow-md"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
