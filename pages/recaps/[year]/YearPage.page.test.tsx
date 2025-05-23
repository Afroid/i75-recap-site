import fs from "fs";
import path from "path";
import React from "react";
import { render, screen } from "@testing-library/react";
import type { GetStaticPropsContext, GetStaticPathsContext } from "next";
import type { ParsedUrlQuery } from "querystring";
import { TestIds } from "@/lib/testIds";

import YearPage, {
  getStaticPaths,
  getStaticProps,
} from "./index.page";

// Stub framer-motion to render plain <li>
jest.mock("framer-motion", () => ({
  __esModule: true,
  motion: {
    li: ({
      children,
      ...props
    }: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li {...props}>{children}</li>
    ),
  },
}));

// Mock fs and path so getStatic[Whatever] can be driven from tests
jest.mock("fs");
jest.mock("path");

// Helper to get proper types on our mocks
const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;

/**
 * Component tests
 * We render YearPage with a fake year + weeks prop and assert on the DOM plus snapshot it.
 */
describe("YearPage component", () => {
  it("renders a list of weeks with correct links", async () => {
    // Renders the page
    render(<YearPage year={2025} weeks={[1, 2]} />);

    // Waits for any hydration / layout effects using /Week 1/ as a regex
    await screen.findByRole("link", { name: /Week 1/ });

    const link1 = screen.getByTestId(`${TestIds.YEAR_WEEK_LINK}-1`);
    const link2 = screen.getByTestId(`${TestIds.YEAR_WEEK_LINK}-2`);
    expect(link1).toHaveAttribute("href", "/recaps/2025/week-1");
    expect(link2).toHaveAttribute("href", "/recaps/2025/week-2");

    // There should be 2 list items
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<YearPage year={2025} weeks={[1, 2, 3]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

/**
 * getStaticPaths test
 * Mocks a fake directory listing
 * Asserts on the returned paths array and fallback flag
 */
describe("getStaticPaths", () => {
  const FAKE_DIR = "/project/data/recaps";

  beforeEach(() => {
    // any call to path.join(...) returns our fake dir
    mockedPath.join.mockReturnValue(FAKE_DIR);

    // Pretends there is two .json files and one other file that isn't .json
    (fs.readdirSync as jest.Mock).mockReturnValue([
      "2023.json",
      "notes.txt",
      "2022.json",
    ]);
  });

  afterEach(() => jest.resetAllMocks());

  it("returns paths for each .json file and fallback=false", async () => {
    const result = await getStaticPaths({} as GetStaticPathsContext);

    // ensure we used the correct directory
    expect(path.join).toHaveBeenCalledWith(
      process.cwd(),
      "data",
      "recaps"
    );
    expect(result).toEqual({
      paths: [
        { params: { year: "2023" } },
        { params: { year: "2022" } },
      ],
      fallback: false,
    });
  });
});

/**
 * getStaticProps test
 * Mocks reading a JSON file
 * Asserts on the returned props object
 */
describe("getStaticProps", () => {
  const FAKE_FILE = "/project/data/recaps/2021.json";
  const SAMPLE_DATA = {
    year: 2021,
    recaps: [{ week: 10, title: "x", sections: [] }],
  };

  beforeEach(() => {
    // path.join(..., '2021.json') → our fake file path
    mockedPath.join.mockReturnValue(FAKE_FILE);

    // Reading that file returns SAMPLE_DATA
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(SAMPLE_DATA));
  });

  afterEach(() => jest.resetAllMocks());

  it("returns props with year and array of weeks", async () => {
    // Build a fake context object
    const context = {
      params: { year: "2021" },
    } as unknown as GetStaticPropsContext<ParsedUrlQuery>;

    const result = await getStaticProps(context);

    // Assertions
    expect(result).toEqual({
      props: {
        year: 2021,
        weeks: [10],
      },
    });

    expect(path.join).toHaveBeenCalledWith(
      process.cwd(),
      "data",
      "recaps",
      "2021.json"
    );
  });
});
