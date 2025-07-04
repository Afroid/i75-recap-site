import { TestIds } from "@/lib/testIds";
import { getMascot } from "../utils/getmascot";

export interface ScoreDetail {
  runs: number;
  hits: number;
  errors: number;
  record?: string; // e.g. "39-46"
  status?: string; // e.g. Preview, Live, Final
};

interface BoxScoresProps {
  /** key       → value */
  /** team name → its box-score */
  boxScores: Record<string, ScoreDetail>;
  /** optionally highlight one team’s row */
  highlightTeam?: string;
};

interface PairedGame {
  teamA: string;
  boxScoreA: ScoreDetail;
  teamB: string;
  boxScoreB: ScoreDetail;
  winner?: "A" | "B";
};

const Scores = ({ boxScores, highlightTeam }: BoxScoresProps) => {
  // Turn flat object into pairs
  const entries = Object.entries(boxScores);
  const games: PairedGame[] = [];

  for (let i = 0; i < entries.length; i += 2) {
    const [teamA, boxScoreA] = entries[i];
    const [teamB, boxScoreB] = entries[i + 1]!;

    // only mark a winner if the game is final
    const isFinal = boxScoreA.status?.startsWith("Final") ||
                    boxScoreA.status?.startsWith("F/");
    let winner: "A" | "B" | undefined;
    if (isFinal) {
      if (boxScoreA.runs > boxScoreB.runs) winner = "A";
      else if (boxScoreB.runs > boxScoreA.runs) winner = "B";
    }

    games.push({ teamA, boxScoreA, teamB, boxScoreB, winner });
  }

  return (
    // 1 col on mobile, 4 cols on desktop
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {games.map(({ teamA, boxScoreA, teamB, boxScoreB, winner }, idx) => {
        // Pick up whichever team has a status
        const status = boxScoreA.status ?? boxScoreB.status;

        // Set the winning team
        const winningTeam = winner === "A" ? teamA : winner === "B" ? teamB : null;
        return (
          <div
            key={idx}
            data-testid={`${TestIds.SCORES_GAME}-${idx}`}
            className={[
              "relative border border-gray-300",
              "rounded-lg overflow-hidden",
              "shadow-sm hover:shadow-lg hover:scale-105 transition-shadow"
            ].join(" ")}
          >
            <table className="w-full table-fixed">
              <thead className="bg-gray-100">
                <tr className="text-xs text-gray-600 uppercase">
                  {/* Status badge */}
                  {/* e.g. Preview, Live, Final */}
                  {status && (
                    <th
                      data-testid={`${TestIds.SCORES_STATUS_BADGE}-${status}`}
                      className={[
                        "w-1/2 top-2 left-2",
                        "bg-white px-2 py-1 rounded",
                        "text-xs font-bold uppercase text-left",
                        status === "Preview"
                          ? "text-orange-500"
                          : status === "Live"
                          ? "text-green-500"
                          : "text-black"
                      ].join(" ")}
                    >
                      {status}
                    </th>
                  )}
                  <th className="w-1/6 px-2 text-right">R</th>
                  <th className="w-1/6 px-2 text-right">H</th>
                  <th className="w-1/6 px-2 text-right mr-2">E</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { team: teamA, box: boxScoreA },
                  { team: teamB, box: boxScoreB },
                ].map(({ team, box }) => (
                  <tr
                    key={team}
                    data-testid={`${TestIds.SCORES_ROW}-${team}`}
                    className={ team === winningTeam ? "bg-green-100 font-semibold" : "" }
                  >
                    {/* Team name + team's record */}
                    <td className={[
                      "px-2 py-2",
                      "flex items-center",
                      "border-t border-gray-200 align-middle"
                    ].join(" ")}>

                      <span
                        data-testid={`${TestIds.SCORES_TEAM_NAME}-${team}`}
                        className={[
                          "whitespace-nowrap mr-1",
                          team === highlightTeam ? "text-green-500 font-semibold" : ""
                        ].join(" ")}
                      >
                        {getMascot(team)}
                      </span>
                      <span
                        data-testid={`${TestIds.SCORES_TEAM_RECORD}-${team}`}
                        className="text-gray-500 text-xs whitespace-nowrap"
                      >
                        {box.record ?? "0-0"}
                      </span>

                    </td>
                    {/* Runs, hits, errors for that specific team */}
                    <td
                      data-testid={`${TestIds.SCORES_RUNS}-${team}`}
                      className="py-2 px-2 text-right border-t border-gray-200 align-middle"
                    >
                      {box.runs ?? 0}
                    </td>
                    <td
                      data-testid={`${TestIds.SCORES_HITS}-${team}`}
                      className="py-2 px-2 text-right border-t border-gray-200 align-middle"
                    >
                      {box.hits ?? 0}
                    </td>
                    <td
                      data-testid={`${TestIds.SCORES_ERRORS}-${team}`}
                      className="py-2 px-2 text-right border-t border-gray-200 align-middle"
                    >
                      {box.errors ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Scores;
