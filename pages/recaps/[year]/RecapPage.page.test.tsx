import React from "react";
import { render, screen } from "@testing-library/react";
import fs, { PathOrFileDescriptor } from "fs";
import RecapPage, { getStaticPaths, getStaticProps } from "@/pages/recaps/[year]/[week].page";
import { RecapData } from "@/types/types";
import type { GetStaticPropsContext, GetStaticPathsContext } from "next";

// Stub RecapLayout so we can assert it was called with the right props
jest.mock(
  "@/components/RecapLayout",
  () => ({
    __esModule: true,
    default: ({ recap, year }: { recap: { week: number }; year: string }) => (
      <div
        data-testid="stubbed-recap-layout"
      >{`Stubbed RecapLayout – year=${year}, week=${recap.week}`}</div>
    ),
  })
);

// Mock fs so getStatic[Whatever] can be driven from tests
jest.mock("fs");

describe("RecapPage ([year]/[week].page.tsx)", () => {
  it("renders fallback when no recap is passed", () => {
    render(<RecapPage recap={null} year="2024" />);
    expect(screen.getByTestId("recap-not-found"))
      .toHaveTextContent("Recap not found");
  });

  it("renders the stubbed RecapLayout with correct props", () => {
    const dummy = { week: 7, title: "ignored", sections: [] };
    render(<RecapPage recap={dummy} year="2023" />);
    const stub = screen.getByTestId("stubbed-recap-layout");
    expect(stub).toBeInTheDocument();
    expect(stub).toHaveTextContent("year=2023");
    expect(stub).toHaveTextContent("week=7");
  });

  it("matches snapshot when a recap is provided", () => {
    const dummy = { week: 1, title: "ignored", sections: [] };
    const { asFragment } = render(<RecapPage recap={dummy} year="2025" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("getStaticPaths()", () => {
  beforeEach(() => {
    (fs.readdirSync as jest.Mock).mockReturnValue([
      "2021.json",
      "notes.txt",
      "2020.json",
    ]);

    // return different JSON payloads depending on which file is being read
    jest
      .spyOn(fs, "readFileSync")
      .mockImplementation(
        (
          filePath: PathOrFileDescriptor,
        ): string | Buffer => {
          const fileName = filePath.toString();

          if (fileName.endsWith("2021.json")) {
            return JSON.stringify({
              year: 2021,
              recaps: [{ week: 1, title: "A", sections: [] }],
            });
          }

          if (fileName.endsWith("2020.json")) {
            return JSON.stringify({
              year: 2020,
              recaps: [
                { week: 3, title: "B", sections: [] },
                { week: 4, title: "C", sections: [] },
              ],
            });
          }
          throw new Error(`Unexpected path: ${name}`);
          // return ""; // fallback
        }
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("builds one path per week in each JSON file, and sets fallback=false", async () => {
    const result = await getStaticPaths({} as GetStaticPathsContext);

    expect(result).toEqual({
      paths: [
        { params: { year: "2021", week: "week-1" } },
        { params: { year: "2020", week: "week-3" } },
        { params: { year: "2020", week: "week-4" } },
      ],
      fallback: false,
    });
  });

  it("loads Week 1 from 2021.json", async () => {
    const result = await getStaticProps({ params: { year: "2021", week: "week-1" } });
    expect(result).toEqual(
      expect
      .objectContaining({ props: { year: "2021", recap: expect.objectContaining({ week: 1 }) } })
    );
  });

  it("loads Week 4 from 2020.json", async () => {
    const result = await getStaticProps({ params: { year: "2020", week: "week-4" } });
    expect(result).toEqual(
      expect
      .objectContaining({ props: { year: "2020", recap: expect.objectContaining({ week: 4 }) } })
    );
  });
});

describe("getStaticProps()", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns the correct recap and year when the file exists", async () => {
    // prepare fs.readFileSync to return a single recap with week=5
    const fake: RecapData = {
      year: 2022,
      recaps: [
        { week: 5, title: "ignored", sections: [] },
        { week: 6, title: "nope", sections: [] },
      ],
    };
    jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(JSON.stringify(fake));

    // Build a minimal context object
    const ctx = {
      params: { year: "2022", week: "week-5" },
    } as GetStaticPropsContext;

    const result = await getStaticProps(ctx);

    expect(result).toEqual({
      props: {
        year: "2022",
        recap: { week: 5, title: "ignored", sections: [] },
      },
    });
  });

  it("returns notFound: true if the JSON read throws", async () => {
    jest.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error("file not found");
    });

    const ctx = {
      params: { year: "2040", week: "week-1" },
    } as GetStaticPropsContext;

    const result = await getStaticProps(ctx);
    expect(result).toEqual({ notFound: true });
  });
});
