import React, { HTMLAttributes } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MobileDrawer from "./MobileDrawer";

// Stub framer motion
jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    div: (props: HTMLAttributes<HTMLDivElement>) => <div {...props} />,
  },
}));

// Stub lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronDown: () => <svg data-testid="chevron-down" />,
  ChevronUp: () => <svg data-testid="chevron-up" />,
}));


describe("MobileDrawer", () => {
  const fakeSummary = {
    "2023": [1, 2],
    "2021": [3],
    "2020": [4],
    "2019": [5],
  };

  beforeEach(() => {
    // Stub global.fetch to return our fake summary
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => fakeSummary,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the newest seasons, expands weeks on click, " +
    "and only shows 'View Older Seasons' if there are older ones", async () => {
    render(<MobileDrawer isOpen={true} onClose={jest.fn()} />);

    // Wait for your useEffect and then fetch
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("/api/recapsSummary"));

    // sortedSeasons descending order → ["2023","2021","2020","2019"]
    // latestSeasons = ["2023","2021","2020"]
    // olderSeasons = ["2019"]

    // findByText query (or findBy[Whatever]) combines getByText (or [Whatever]) + waitFor
    // under the hood
    // wait for them and then assert they're in the DOM
    const season2023 = await screen.findByText("2023 Season");
    const season2021 = screen.getByText("2021 Season");
    const season2020 = screen.getByText("2020 Season");
    expect(season2023).toBeInTheDocument();
    expect(season2021).toBeInTheDocument();
    expect(season2020).toBeInTheDocument();

    // Showing another way to wait for the DOM to be ready with the elements present
    await waitFor(() => {
      expect(screen.getByText("2023 Season")).toBeInTheDocument();
    });
    expect(screen.getByText("2021 Season")).toBeInTheDocument();
    expect(screen.getByText("2020 Season")).toBeInTheDocument();

    // Asserts there is at least one older season,which makes the toggle button shows
    const toggleBtn = screen.getByText("View Older Seasons");
    expect(toggleBtn).toBeInTheDocument();

    // Expand 2023 and assert Week 1 and 2 are present
    fireEvent.click(screen.getByText("2023 Season"));
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByText("Week 2")).toBeInTheDocument();

    // Toggle older
    fireEvent.click(toggleBtn);
    expect(screen.getByText("2019 Season")).toBeInTheDocument();

    // Collapse older and assert it's no longer in the DOM
    fireEvent.click(toggleBtn);
    expect(screen.queryByText("2019 Season")).toBeNull();
  });

  it("matches snapshot when open", async () => {
    const { asFragment } = render(<MobileDrawer isOpen={true} onClose={jest.fn()} />);
    // Wait for the fetch then the state to update then the render of the season links
    await screen.findByText("2023 Season");

    // After async work has been completed, Snapshot should include seasons
    expect(asFragment()).toMatchSnapshot();
  });
});
