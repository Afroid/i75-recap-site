import React from "react";
import useSWR from "swr";
import Scores, { ScoreDetail } from "@/components/Scores";
import { TestIds } from "@/lib/testIds";

// Fetcher that returns a Record<string, ScoreDetail>
export const fetcher = async (url: string): Promise<Record<string, ScoreDetail>> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Network error: ${res.status}`);
  };

  const data = await res.json();
  return data as Record<string, ScoreDetail>;
}

export default function ScoresPage() {
  const { data: boxScores, error } = useSWR<Record<string, ScoreDetail>, Error>(
    "/api/latest?league=mlb",
    fetcher,
    { refreshInterval: 300_000 } // 5 minutes
  );

  if (error) {
    return <div className="p-4 text-red-600">Failed to load scores: {error.message}</div>;
  };

  if (!boxScores) {
    return <div className="p-4">Loading…</div>;
  };

  return (
    <main data-testid={TestIds.SCORES_PAGE}>
      <h1 className="text-2xl font-bold mb-4">MLB Scoreboard</h1>
      <Scores
        data-testid={TestIds.SCORES_COMPONENT}
        boxScores={boxScores}
        highlightTeam="Atlanta Braves"
      />
    </main>
  )
}
