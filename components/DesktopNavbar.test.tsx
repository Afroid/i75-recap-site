import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DesktopNavbar from "./DesktopNavbar";
import { TestIds } from "@/lib/testIds";

describe("DesktopNavbar", () => {
  const fakeSummary = {
    "2023": [1, 2, 3],
    "2022": [5],
    "2021": [4],
    "2020": [6],
  };

  beforeEach(() => {
    // Stub global.fetch to return our fake summary
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => fakeSummary,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches data and displays latest seasons on hover, and allows showing older seasons",
    async () => {
      render(<DesktopNavbar />);

      // Expect fetch to have been called
      await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("/api/recapsSummary"));

      // Hover over the recaps area to open the flyout
      fireEvent.mouseEnter(screen.getByTestId(TestIds.DESKTOP_NAV_RECAPS));

      // Wait until season buttons are rendered
      await waitFor(() => expect(screen.getByTestId(TestIds.DESKTOP_SEASON + "-2023"))
        .toBeInTheDocument());
      expect(screen.getByTestId(TestIds.DESKTOP_SEASON_BUTTON + "-2023"))
        .toHaveTextContent("2023 Season");
      expect(screen.getByTestId(TestIds.DESKTOP_SEASON_BUTTON + "-2022"))
        .toHaveTextContent("2022 Season");
      expect(screen.getByTestId(TestIds.DESKTOP_SEASON_BUTTON + "-2021"))
        .toHaveTextContent("2021 Season");

      // Older seasons should not be visible until toggled
      expect(screen.queryByTestId(TestIds.DESKTOP_OLDER_SEASON + "-2020")).toBeNull();

      // Toggle older seasons
      fireEvent.click(screen.getByTestId(TestIds.DESKTOP_TOGGLE_OLDER_SEASONS));
      expect(screen.getByTestId(TestIds.DESKTOP_OLDER_SEASON + "-2020")).toBeInTheDocument();
      expect(screen.getByTestId(TestIds.DESKTOP_OLDER_SEASON_BUTTON + "-2020"))
        .toHaveTextContent("2020 Season");
  });

  it("closes the flyout when clicking outside", async () => {
    // Mock out fetch so the component actually renders something, even something fake
    const fakeSummary = { "2023": [1], "2022": [2] };

    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      json: async () => fakeSummary,
    });

    // Render and wait for the initial fetch
    render(<DesktopNavbar />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("/api/recapsSummary"));

    // Hover over the recaps area to open the flyout
    fireEvent.mouseEnter(screen.getByTestId(TestIds.DESKTOP_NAV_RECAPS));
    // Confirm it opened
    expect(await screen.findByTestId("desktop-recaps-flyout")).toBeInTheDocument();

    // Simulate a click happened outside of the flyout container
    fireEvent.mouseDown(document.body);

    // Flyout should now be gone
    await waitFor(() => {
      expect(screen.queryByTestId("desktop-recaps-flyout")).toBeNull();
    });
  });


  it("matches snapshot of the flyout with latest seasons", async () => {
    const { asFragment } = render(<DesktopNavbar />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    fireEvent.mouseEnter(screen.getByTestId(TestIds.DESKTOP_NAV_RECAPS));
    await waitFor(() => expect(screen.getByTestId(TestIds.DESKTOP_SEASON + "-2023"))
      .toBeInTheDocument());

    expect(asFragment()).toMatchSnapshot();
  });
});
