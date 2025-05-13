import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  sectionDisplayNames,
  RecapWeek,
  RecapSection,
  GNSSection
} from "@/types/types";
import Breadcrumb from "@/components/Breadcrumb";
import GameNotesSection from "@/components/GameNotesSection";

interface Props {
  recap: RecapWeek;
  year: string;
}

export default function RecapLayout({ recap, year }: Props) {
  return (
    <div className="container">
      <Breadcrumb year={year} week={`Week ${recap.week}`} />
      <h1 className="text-3xl font-bold mb-6">
        {year} - Week {recap.week} Recap
      </h1>

      {recap.sections.map((section, idx) => {
        const isGameNotes = section.type === "gameNotes";
        const displayName = sectionDisplayNames[section.type];

        return (
          <div key={idx} className="mb-8">
            {displayName && (
              <h2 className="text-2xl font-bold mb-2">
                {isGameNotes
                  ? `Week ${recap.week} Game Notes`
                  : displayName}
              </h2>
            )}

            {isGameNotes ? (
              <GameNotesSection data={section as GNSSection}/>
            ) : (
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
