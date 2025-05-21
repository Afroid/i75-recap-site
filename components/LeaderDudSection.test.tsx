import React from "react";
import { render, screen } from "@testing-library/react";
import { TestIds } from "@/lib/testIds";

// Stub react-markdown so it just renders its children
jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({
    children,
    className,
    "data-testid": testId,
  }: {
    children: React.ReactNode;
    className?: string;
    "data-testid"?: string;
  }) => (
    <div className={className} data-testid={testId}>
      {children}
    </div>
  ),
}));

/**
 * Importing after the mocks ensures the real copies of those dependencies don't get loaded.
 * This ensures any imports from next/head or whatever get routed to the stubbed versions, rather
 * than real implementation. This makes sure jest.mock calls will have effect.
 */
// Now import LeaderDudSection (after the mocks)
import LeaderDudSection from "./LeaderDudSection";
import type { LDSSection as LDS } from "@/types/types";

describe("LeaderDudSection", () => {
  it("renders leader and dud headings with points, no notes by default", () => {
    const data: LDS = {
      type: "leaderDud",
      pointsLeader: {
        name: "Player X",
        points: 42
      },
      dud: { name: "Player Z", points: 7 },
    };

    render(<LeaderDudSection data={data} />);

    // Headings and points
    expect(screen.getByTestId(TestIds.LDS_LEADER_HEADING)).toHaveTextContent(
      "Points Leader: Player X"
    );
    expect(screen.getByTestId(TestIds.LDS_LEADER_POINTS)).toHaveTextContent("(42)");

    expect(screen.getByTestId(TestIds.LDS_DUD_HEADING)).toHaveTextContent("Dud: Player Z");
    expect(screen.getByTestId(TestIds.LDS_DUD_POINTS)).toHaveTextContent("(7)");

    // Notes should not be rendered
    expect(screen.queryByTestId(TestIds.LDS_DUD_NOTES)).toBeNull();
    expect(screen.queryByTestId(TestIds.LDS_DUD_NOTES)).toBeNull();
  });

  it("renders notes when provided", () => {
    const data: LDS = {
      type: "leaderDud",
      pointsLeader: {
        name: "Player X",
        points: 42,
        notes: "Great game!",
      },
      dud: {
        name: "Player Z",
        points: 7,
        notes: "Could have tried harder.",
      },
    };

    render(<LeaderDudSection data={data} />);

    expect(screen.getByTestId(TestIds.LDS_LEADER_NOTES)).toHaveTextContent(
      "Great game!"
    );
    expect(screen.getByTestId(TestIds.LDS_DUD_NOTES)).toHaveTextContent(
      "Could have tried harder."
    );
  });

  it("matches snapshot when leader has notes but dud does not", () => {
    const data: LDS = {
      type: "leaderDud",
      pointsLeader: {
        name: "Player X",
        points: 42,
        notes: "MVP of the week",
      },
      dud: { name: "Player Z", points: 7 },
    };

    const { asFragment } = render(<LeaderDudSection data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
