import React from "react";
import Image from "next/image";
import { RecapWeek } from "@/types/types";
import Breadcrumb from "./Breadcrumb";

interface Props {
  recap: RecapWeek;
  year: string;
}

export default function RecapLayout({ recap, year }: Props) {
  return (
    // This box is no wider than 768px and it's centered
    <div>
      <Breadcrumb year={year} week={`Week ${recap.week}`} />
      <h1 className="text-3xl font-bold mb-6">
        Week {recap.week} Recap
      </h1>

      {recap.sections.map((section, idx) => (
        <div key={idx} className="mb-8">
          {section.type !== "paragraph" && (
            <h2 className="text-2xl font-semibold mb-2">{section.type}</h2>
          )}
          <p className="text-lg text-gray-800 whitespace-pre-line">
            {section.content}
          </p>
          {section.imageUrl && (
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
        </div>
      ))}
    </div>
  );
}
