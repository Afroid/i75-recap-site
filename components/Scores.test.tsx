import React from "react";
import { render, screen } from "@testing-library/react";
import Scores, { ScoreDetail } from "@/components/Scores";
import { getMascot } from "@/utils/getmascot";

jest.mock("@/utils/getmascot", () => ({
  getMascot: jest.fn(),
}));

describe("Scores component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset mocks before each test
    (getMascot as jest.Mock).mockImplementation((name: string) => name); // identity for simplicity
  });

  it("pairs teams into games and highlights the winner when Final", () => {
    // AAA – Arrange: two teams with Final status and different runs
    const boxScores: Record<string, ScoreDetail> = {
      "Atlanta Braves": { runs: 3, hits: 5, errors: 1, record: "3-0", status: "Final" },
      "New York Mets": { runs: 2, hits: 4, errors: 0, record: "2-1", status: "Preview" },
    };

    // AAA – Act: render Scores
    render(<Scores boxScores={boxScores} highlightTeam="New York Mets" />);

    // AAA – Assert: first row (Atlanta Braves) is highlighted as winner
    // const firstRow = container.querySelector("tbody > tr:nth-child(1)");
    const firstRow = screen.getByTestId("scores-row-Atlanta Braves");
    expect(firstRow).toHaveClass("bg-green-100", "font-semibold");
  });

  it("renders Live status badge in green", () => {
    // AAA – Arrange: a game marked Live
    const boxScores: Record<string, ScoreDetail> = {
      "Team Live": { runs: 1, hits: 1, errors: 0, status: "Live" },
      "Team Other": { runs: 0, hits: 1, errors: 0, status: "Live" },
    };

    // AAA – Act: render Scores
    const { getByText } = render(<Scores boxScores={boxScores} />);

    // AAA – Assert: badge shows Live in green
    const badge = getByText("Live");
    expect(badge).toHaveClass("text-green-500");
  });

  it("renders Preview status badge in orange", () => {
    // AAA – Arrange: a game marked Live
    const boxScores: Record<string, ScoreDetail> = {
      "Team Preview": { runs: 1, hits: 1, errors: 0, status: "Preview" },
      "Team Other": { runs: 0, hits: 1, errors: 0, status: "Preview" },
    };

    // AAA – Act: render Scores
    const { getByText } = render(<Scores boxScores={boxScores} />);

    // AAA – Assert: badge shows Preview in green
    const badge = getByText("Preview");
    expect(badge).toHaveClass("text-orange-500");
  });

  it("matches snapshot for one Final game", () => {
    // AAA – Arrange: same Final game from above
    const boxScores: Record<string, ScoreDetail> = {
      "Atlanta Braves": { runs: 3, hits: 5, errors: 1, record: "3-0", status: "Final" },
      "New York Mets": { runs: 2, hits: 4, errors: 0, record: "2-1", status: "Final" },
    };

    // AAA – Act: render Scores
    const { container } = render(<Scores boxScores={boxScores} />);

    // AAA – Assert: snapshot the output
    expect(container).toMatchSnapshot();
  });
});
