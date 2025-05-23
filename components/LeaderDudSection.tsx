import React from "react";
import ReactMarkdown from "react-markdown";
import { LDSSection as LDS } from "@/types/types";
import { TestIds } from "@/lib/testIds";

/**
 * LeaderDudSection
 *
 * Displays the weekly fantasy points leader and dud.
 * - Shows player names and point tallies.
 * - Renders optional markdown notes for each.
 */
export default function LeaderDudSection({ data }: { data: LDS }) {
  return (
    <div data-testid={TestIds.LDS_SECTION}>
      {/* Points Leader */}
      <h3 data-testid={TestIds.LDS_LEADER_HEADING} className="text-xl font-semibold mb-1">
        Points Leader: {data.pointsLeader.name}
        <span data-testid={TestIds.LDS_LEADER_POINTS} className="ml-1 text-green-500">
          ({data.pointsLeader.points})
        </span>
      </h3>
      {/* Optional notes for the Points Leader */}
      {data.pointsLeader.notes && (
        <ReactMarkdown
          data-testid={TestIds.LDS_LEADER_NOTES}
          className="text-gray-800 mb-4 whitespace-pre-wrap"
        >
          {data.pointsLeader.notes}
        </ReactMarkdown>
      )}

      {/* Dud */}
      <h3 data-testid={TestIds.LDS_DUD_HEADING} className="text-xl font-semibold mb-1">
        Dud: {data.dud.name}
        <span data-testid={TestIds.LDS_DUD_POINTS} className="ml-1 text-red-500">
          ({data.dud.points})
        </span>
      </h3>
      {/* Optional notes for the Dud */}
      {data.dud.notes && (
        <ReactMarkdown
          data-testid={TestIds.LDS_DUD_NOTES}
          className="text-gray-800 whitespace-pre-wrap"
        >
          {data.dud.notes}
        </ReactMarkdown>
      )}
    </div>

  );
}
