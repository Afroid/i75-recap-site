import React from "react";
import { render, screen } from "@testing-library/react";
import RecapLayout from "./RecapLayout";
import type { RecapWeek } from "@/types/types";
import type { ImgHTMLAttributes } from "react";
import type { ReactNode } from "react";

// Stub next/image to a plain <img>
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} data-testid="next-image" />
  ),
}));

// Stubs react-markdown to only render its children
jest.mock("react-markdown", () => ({
  __esModule: true,
  default: (props: { children: ReactNode }) => (
    <div data-testid="stubbed-markdown">{props.children}</div>
  ),
}));

// Stub Breadcrumb
jest.mock("@/components/Breadcrumb", () => ({
  __esModule: true,
  default: ({ year, week }: { year: string; week: string }) => (
    <div data-testid="breadcrumb">
      {year}–{week}
    </div>
  ),
}));

// Stub LeaderDudSection
jest.mock("@/components/LeaderDudSection", () => ({
  __esModule: true,
  default: (props: { data: unknown }) => (
    <div data-testid="stubbed-leader-dud">{JSON.stringify(props.data)}</div>
  ),
}));

// Stub GameNotesSection
jest.mock("@/components/GameNotesSection", () => ({
  __esModule: true,
  default: (props: { data: unknown }) => (
    <div data-testid="stubbed-game-notes">{JSON.stringify(props.data)}</div>
  ),
}));

describe("RecapLayout", () => {
  const year = "2023";
  const sampleRecap: RecapWeek = {
    week: 1,
    title: "Week 1 Recap", // not used but required by the type
    sections: [
      // A generic section - “tidbits”
      {
        type: "tidbits",
        intro: "Welcome to week 1",
        bullets: ["Note A", "Note B"],
        outro: "Goodbye!",
      },
      {
        type: "sidePieces",
        content: "Here are some extra side pieces of information.",
        imageUrl: "/someRandomGif.gif"
      },
      // leaderDud Section
      {
        type: "leaderDud",
        pointsLeader: { name: "Player X", points: 99, notes: "Great job!" },
        dud: { name: "Player Z", points: 0, notes: "Ouch." },
      },

      // gameNotes Section
      {
        type: "gameNotes",
        matchups: [
          {
            team1: "X",
            team1Logo: "",
            record1: "",
            score1: 21,
            team2: "Y",
            team2Logo: "",
            record2: "",
            score2: 14,
            breakdown: "Close game!",
          },
        ],
      },
    ],
  };

  it("renders breadcrumb, title and all sections correctly", () => {
    render(<RecapLayout recap={sampleRecap} year={year} />);

    // Breadcrumb stub
    expect(screen.getByTestId("breadcrumb")).toHaveTextContent("2023–Week 1");

    // Main title (h1)
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "2023 - Week 1 Recap",
      })
    ).toBeInTheDocument();

    // Generic section heading Interesting Tidbits and Side Pieces
    expect(
      screen.getByRole("heading", { level: 2, name: "Interesting Tidbits" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { level: 2, name: "Side Pieces" })
    ).toBeInTheDocument();

    // Markdown intro, both bullets, & outro
    const mdWrappers = screen.getAllByTestId("stubbed-markdown");
    expect(mdWrappers[0]).toHaveTextContent("Welcome to week 1");
    expect(mdWrappers[1]).toHaveTextContent("Note A");
    expect(mdWrappers[2]).toHaveTextContent("Note B");
    expect(mdWrappers[3]).toHaveTextContent("Goodbye!");

    // Bullet points (a little overkill)
    expect(screen.getByText("Note A")).toBeInTheDocument();
    expect(screen.getByText("Note B")).toBeInTheDocument();

    // LeaderDudSection stub
    expect(screen.getByTestId("stubbed-leader-dud")).toBeInTheDocument();

    // Grabs the raw JSON string from the stub
    /**
     * The ! is a non-null assertion operator
     * Tells the compiler to treat it as a string instead of string | null
     * If it's not a string, it will throw at runtime
     */
    const leaderDudRaw = screen.getByTestId("stubbed-leader-dud").textContent!;

    // Parse it into an object to assert on
    const leaderDud = JSON.parse(leaderDudRaw);

    // Now assert on the exact properties/structure
    expect(leaderDud.pointsLeader.name).toBe("Player X");
    expect(leaderDud.pointsLeader.points).toBe(99);
    expect(leaderDud.pointsLeader.notes).toBe("Great job!");
    expect(leaderDud.dud.name).toBe("Player Z");
    expect(leaderDud.dud.points).toBe(0);
    expect(leaderDud.dud.notes).toBe("Ouch.");

    // GameNotesSection stub
    expect(screen.getByTestId("stubbed-game-notes")).toBeInTheDocument();

    // Grabs the raw JSON string from the stub
    const gameNotesRaw = screen.getByTestId("stubbed-game-notes").textContent!;

    // Parse it into an object to assert on
    const gameNotes = JSON.parse(gameNotesRaw);

    // Now assert on the exact properties/structure
    expect(gameNotes.matchups[0].team1).toBe("X");
    expect(gameNotes.matchups[0].team1Logo).toBe("");
    expect(gameNotes.matchups[0].record1).toBe("");
    expect(gameNotes.matchups[0].score1).toBe(21);
    expect(gameNotes.matchups[0].team2).toBe("Y");
    expect(gameNotes.matchups[0].team2Logo).toBe("");
    expect(gameNotes.matchups[0].record2).toBe("");
    expect(gameNotes.matchups[0].score2).toBe(14);
    expect(gameNotes.matchups[0].breakdown).toBe("Close game!");
  });

  it("matches the full layout snapshot", () => {
    const { asFragment } = render(
      <RecapLayout recap={sampleRecap} year={year} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
