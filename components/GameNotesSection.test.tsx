import React from "react";
import { render, screen } from "@testing-library/react";
import type { GNSSection as GNS } from "@/types/types";
import type { ScoreEntry } from "./Scoreboard";

// Stub Scoreboard so it just renders the entries JSON
jest.mock("./Scoreboard", () => ({
  __esModule: true,
  default: ({ entries }: { entries: ScoreEntry[] }) => (
    <div data-testid="game-notes-scoreboard">
      {JSON.stringify(entries)}
    </div>
  ),
}));

// Stub ReactMarkdown to render its children directly
jest.mock("react-markdown", () => (props: { children: string }) => (
  <div data-testid="stubbed-game-notes-breakdown">
    {props.children}
  </div>
));

// Stub next/image to a simple <img>
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img data-testid="game-notes-image" {...props} />
  ),
}));

/**
 * Importing after the mocks ensures the real copies of those dependencies don't get loaded.
 * This ensures any imports from next/head or whatever get routed to the stubbed versions, rather
 * than real implementation. This makes sure jest.mock calls will have effect.
 */
// Now import GameNotesSection (after the mocks)
import GameNotesSection from "./GameNotesSection";

describe("GameNotesSection", () => {
  const baseMatchup = {
    team1:      "Player X",
    team1Logo:  "/playerX.png",
    record1:    "3-1",
    score1:     21,
    team2:      "Player Z",
    team2Logo:  "/playerZ.png",
    record2:    "2-2",
    score2:     14,
    breakdown:  "Player X dominated from the start.",
  };

  it("renders entries, breakdown, and image when imageUrl is present", () => {
    const data: GNS = {
      type: "gameNotes",
      matchups: [
        { ...baseMatchup, imageUrl: "/highlight.gif" }
      ]
    };

    render(<GameNotesSection data={data} />);

    // The main root container
    const container = screen.getByTestId("game-notes-section");
    expect(container).toBeInTheDocument();

    // Scoreboard entries stub
    const scoreboard = screen.getByTestId("game-notes-scoreboard");
    expect(scoreboard).toHaveTextContent(
      JSON.stringify([
        {
          logoUrl: "/playerX.png",
          name:    "Player X",
          record:  "3-1",
          score:   21,
        },
        {
          logoUrl: "/playerZ.png",
          name:    "Player Z",
          record:  "2-2",
          score:   14,
        },
      ])
    );

    // Breakdown text
    expect(screen.getByTestId("stubbed-game-notes-breakdown")).toHaveTextContent(
      "Player X dominated from the start."
    );

    // Image container & its image
    const img = screen.getByTestId("game-notes-image") as HTMLImageElement;
    expect(img.src).toContain("/highlight.gif");
    expect(img.alt).toBe("Player X vs Player Z highlight");
  });

  it("renders entries with default logos, no records, breakdown, and an image", () => {
    const baseMatchup = {
      team1:      "Player X",
      team1Logo:  "",
      record1:    "",
      score1:     21,
      team2:      "Player Z",
      team2Logo:  "",
      record2:    "",
      score2:     14,
      breakdown:  "Player X dominated from the start.",
    };

    const data: GNS = {
      type: "gameNotes",
      matchups: [
        { ...baseMatchup, imageUrl: "/highlight.gif" }
      ]
    };

    render(<GameNotesSection data={data} />);

    // The main root container
    const container = screen.getByTestId("game-notes-section");
    expect(container).toBeInTheDocument();

    // Scoreboard entries stub
    const scoreboard = screen.getByTestId("game-notes-scoreboard");
    expect(scoreboard).toHaveTextContent(
      JSON.stringify([
        {
          logoUrl: "/default-RWB.png",
          name:    "Player X",
          record:  "",
          score:   21,
        },
        {
          logoUrl: "/default-logo-alt.png",
          name:    "Player Z",
          record:  "",
          score:   14,
        },
      ])
    );

    // Breakdown text
    expect(screen.getByTestId("stubbed-game-notes-breakdown")).toHaveTextContent(
      "Player X dominated from the start."
    );

    // Image container & its image
    const img = screen.getByTestId("game-notes-image") as HTMLImageElement;
    expect(img.src).toContain("/highlight.gif");
    expect(img.alt).toBe("Player X vs Player Z highlight");
  });

  it("omits the image block when imageUrl is undefined", () => {
    const data: GNS = {
      type: "gameNotes",
      matchups: [
        { ...baseMatchup /* no imageUrl */ }
      ]
    };

    render(<GameNotesSection data={data} />);

    // Asertions
    expect(screen.getByTestId("game-notes-scoreboard")).toBeInTheDocument();
    // No image was rendered
    expect(screen.queryByTestId("game-notes-image")).toBeNull();
  });

  it("matches the snapshot for markup structure", () => {
    const data: GNS = {
      type: "gameNotes",
      matchups: [
        { ...baseMatchup, imageUrl: "/gif.gif" }
      ]
    };
    const { asFragment } = render(<GameNotesSection data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
