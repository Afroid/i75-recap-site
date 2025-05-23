jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ViewAllRecapsPage, { getStaticProps } from "./viewAllRecaps.page";
import { getRecaps } from "@/lib/getRecaps";
import { useRouter } from "next/router";
import { TestIds } from "@/lib/testIds";

// Stub framer-motion’s <motion.li> to return a normal <li>
jest.mock("framer-motion", () => ({
  motion: {
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li {...props}>{children}</li>
    ),
  },
}));

jest.mock("@/lib/getRecaps");

const replaceMock = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query:    {},
    pathname: "/recaps/viewAllRecaps",
    replace:  replaceMock,
  });
  replaceMock.mockClear();
  (getRecaps as jest.Mock).mockClear();
});

describe("ViewAllRecapsPage", () => {
  const recaps = [
    { year: "2023", week: 1 },
    { year: "2022", week: 2 },
  ];

  it("renders search, dropdowns, and recap links correctly", () => {
    render(<ViewAllRecapsPage allRecaps={recaps} />);

    // Search input & icon
    const search = screen.getByPlaceholderText("Search by year or week...");
    expect(search).toBeInTheDocument();
    expect(screen.getByTestId(TestIds.VIEW_ALL_RECAPS_SEARCH_ICON)).toBeInTheDocument();

    // Year dropdown should show “All Years” label
    expect(screen.getByText("All Years")).toBeInTheDocument();

    // Sort dropdown default value is “Latest to Oldest”
    expect(screen.getByText("Latest to Oldest")).toBeInTheDocument();

    // The two recap items and links
    recaps.forEach(({ year, week }) => {
      const item = screen.getByTestId(`${TestIds.VIEW_ALL_RECAPS_RECAP_ITEM}-${year}-${week}`);
      expect(item).toBeInTheDocument();

      const link = screen.getByTestId(`${TestIds.VIEW_ALL_RECAPS_RECAP_LINK}-${year}-${week}`);

      // Assertions
      expect(link).toHaveAttribute("href", `/recaps/${year}/week-${week}`);
      expect(link).toHaveTextContent(`Week ${week}`);
    });
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ViewAllRecapsPage allRecaps={recaps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("getStaticProps", () => {
  it("flattens getRecaps summary into allRecaps", async () => {
    // Stub getRecaps()
    (getRecaps as jest.Mock).mockReturnValue({
      "2023": [1, 2],
      "2021": [3],
    });

    // Act
    const result = await getStaticProps();

    // Assertions
    expect(getRecaps).toHaveBeenCalled();
    expect(result).toEqual({
      props: {
        allRecaps: [
          { year: "2021", week: 3 },
          { year: "2023", week: 1 },
          { year: "2023", week: 2 },
        ],
      },
    });
  });
});

describe("search behavior", () => {
  const recaps = [{ year: "2023", week: 1 }];

  beforeEach(() => {
    render(<ViewAllRecapsPage allRecaps={recaps} />);
  });

  it("calls router.replace when user types non-numeric search", () => {
    const input = screen.getByPlaceholderText("Search by year or week...");
    fireEvent.change(input, { target: { value: "foo" } });

    // Assertions
    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith(
      { pathname: "/recaps/viewAllRecaps", query: { search: "foo" } },
      undefined,
      { shallow: true }
    );
  });

  it("also clears year filter when typing a 4-digit year", () => {
    const input = screen.getByPlaceholderText("Search by year or week...");
    fireEvent.change(input, { target: { value: "2023" } });

    // First replace is for search=2023, second is for search=2023 & year=""
    expect(replaceMock).toHaveBeenCalledTimes(2);

    // The last call should still only send search=2023 (the empty year is stripped)
    expect(replaceMock).toHaveBeenLastCalledWith(
      { pathname: "/recaps/viewAllRecaps", query: { search: "2023" } },
      undefined,
      { shallow: true }
    );
  });
});
