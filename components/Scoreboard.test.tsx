import React from "react";
import { render, screen } from "@testing-library/react";
import Scoreboard, { ScoreEntry } from "./Scoreboard";
import { TestIds } from "@/lib/testIds";

// Stub TeamLogo so it just renders a simple <img> with a test-id
jest.mock("./TeamLogo", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    "data-testid": testId,
  }: { // Shape of exact props we're using
    src: string;
    alt: string;
    className?: string;
    "data-testid"?: string;
  }) => (
    <img
      data-testid={testId}
      src={src}
      alt={alt}
      className={className}
    />
  ),
}));


describe("Scoreboard component", () => {
  const entries: ScoreEntry[] = [
    { logoUrl: "/logo1.png", name: "Team One", record: "(1-0)", score: 10.5 },
    { logoUrl: "/logo2.png", name: "Team Two", record: "(0-1)", score: 7.25 },
  ];

  it("renders each entry with logo, name, record, and formatted score", () => {
    render(<Scoreboard entries={entries} />);

    // Container
    const container = screen.getByTestId(TestIds.SCOREBOARD_CONTAINER);
    expect(container).toBeInTheDocument();

    entries.forEach((entry) => {
      // Each row
      const row = screen.getByTestId(`${TestIds.SCOREBOARD_LOGO}-${entry.name}`);
      expect(row).toBeInTheDocument();

      // Logo stub
      const logo = screen.getByTestId(`${TestIds.SCOREBOARD_LOGO}-${entry.name}`);
      expect(logo).toHaveAttribute("src", entry.logoUrl);
      expect(logo).toHaveAttribute("alt", `${entry.name} logo`);

      // Name and Record
      expect(screen.getByTestId(`${TestIds.SCOREBOARD_NAME}-${entry.name}`))
      .toHaveTextContent(entry.name);
      expect(screen.getByTestId(`${TestIds.SCOREBOARD_RECORD}-${entry.name}`))
      .toHaveTextContent(entry.record);

      // // Score but formatted to two decimals
      expect(screen.getByTestId(`${TestIds.SCOREBOARD_SCORE}-${entry.name}`))
      .toHaveTextContent(entry.score.toFixed(2));
    });
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<Scoreboard entries={entries} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
