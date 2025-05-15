import React from "react";
import ReactMarkdown from "react-markdown";
import { LDSSection as LDS } from "@/types/types";


export default function LeaderDudSection({ data }: { data: LDS }) {
  return (
    <div>
      {/* Points Leader */}
      <h3 className="text-xl font-semibold mb-1">
        Points Leader: {data.pointsLeader.name}
        <span className="ml-1 text-green-500">
          ({data.pointsLeader.points})
        </span>
      </h3>
      {data.pointsLeader.notes && (
        <ReactMarkdown className="text-gray-800 mb-4 whitespace-pre-wrap">
          {data.pointsLeader.notes}
        </ReactMarkdown>
      )}

      {/* Dud */}
      <h3 className="text-xl font-semibold mb-1">
        Dud: {data.dud.name}
        <span className="ml-1 text-red-500">
          ({data.dud.points})
        </span>
      </h3>
      {data.dud.notes && (
        <ReactMarkdown className="text-gray-800 whitespace-pre-wrap">
          {data.dud.notes}
        </ReactMarkdown>
      )}
    </div>

  );
}
