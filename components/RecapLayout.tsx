import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  sectionDisplayNames,
  RecapWeek,
  RecapSection,
  LDSSection,
  GNSSection
} from "@/types/types";
import Breadcrumb from "@/components/Breadcrumb";
import LeaderDudSection from "@/components/LeaderDudSection";
import GameNotesSection from "@/components/GameNotesSection";
import { TestIds } from "@/lib/testIds";

interface Props {
  recap: RecapWeek;      // Data object for this week's recap
  year: string;          // Season year (e.g., "2025")
}

export default function RecapLayout({ recap, year }: Props) {
  return (
    <>
      {/* Breadcrumb navigation: Home → Season year → Week */}
      <Breadcrumb
        data-testid={TestIds.BREADCRUMB}
        year={year}
        week={`Week ${recap.week}`}
      />

      {/* Page title showing year and week number */}
      <h1
        data-testid="recap-title"
        className="text-3xl font-bold mb-6"
      >
        {year} - Week {recap.week} Recap
      </h1>

      {/* Iterate through each section of the recap */}
      {recap.sections.map((section, idx) => {
        const isLeaderDud = section.type === "leaderDud";
        const isGameNotes = section.type === "gameNotes";
        const displayName = sectionDisplayNames[section.type];

        return (
          <div
            key={idx}
            className="mb-8"
            data-testid={`${TestIds.RECAP_SECTION}-${section.type}-${idx}`}
          >
            {/* Section heading, custom for GameNotes */}
            {displayName && (
              <h2
                data-testid={`${TestIds.RECAP_HEADING}-${section.type}-${idx}`}
                className="text-2xl font-bold mb-2"
              >
                {isGameNotes
                  ? `Week ${recap.week} Game Notes`
                  : displayName}
              </h2>
            )}

            {/* This is checked to narrow types and pick a completely different rendering path.
                Nested ternaries are frowned upon but I used it anyway so I wouldn't have to
                extract this into a renderSection function */}
            {isLeaderDud ? (
              <LeaderDudSection data={section as LDSSection}/>
            ) :
            isGameNotes ? (
              <GameNotesSection data={section as GNSSection}/>
            ) : (
              <>
                {"intro" in section && section.intro && (
                  <ReactMarkdown
                    data-testid={`${TestIds.RECAP_INTRO}-${idx}`}
                    className="text-lg text-gray-800 mb-2"
                  >
                    {section.intro}
                  </ReactMarkdown>
                )}
                {/* Optional bullet list */}
                {Array.isArray((section as RecapSection).bullets) && (
                  <ul
                    data-testid={`${TestIds.RECAP_BULLETS}-${idx}`}
                    className="list-disc pl-6 space-y-1"
                  >
                    {(section as RecapSection).bullets!.map((bullet, i) => (
                      <li key={i} data-testid={`${TestIds.RECAP_BULLET}-${idx}-${i}`}>
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
                  <ReactMarkdown
                    data-testid={`${TestIds.RECAP_CONTENT}-${idx}`}
                    className="text-lg text-gray-800 whitespace-pre-wrap"
                  >
                    {section.content}
                  </ReactMarkdown>
                )}
                {/* Optional image/GIF */}
                {"imageUrl" in section && section.imageUrl && (
                  <div className="mt-4">
                    <Image
                      src={section.imageUrl}
                      alt={section.imageAlt || "GIF or Screenshot"}
                      width={600}
                      height={400}
                      className="w-full lg:w-auto h-auto rounded shadow-md"
                      data-testid={`${TestIds.RECAP_IMAGE}-${idx}`}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
