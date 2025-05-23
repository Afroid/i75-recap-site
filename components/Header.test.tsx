import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Stub dependencies
jest.mock("@/components/HeaderLogo", () => ({
  __esModule: true,
  default: () => <div data-testid="stubbed-header-logo">Logo</div>,
}));
jest.mock("@/components/DesktopNavbar", () => ({
  __esModule: true,
  default: () => <nav data-testid="stubbed-desktop-nav">DesktopNav</nav>,
}));
jest.mock("@/components/MobileDrawer", () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div
      data-testid="mobile-drawer"
      data-is-open={isOpen}
      onClick={onClose}
    >
      Drawer({isOpen ? "open" : "closed"})
    </div>
  ),
}));

/**
 * Importing after the mocks ensures the real copies of those dependencies don't get loaded.
 * This ensures any imports from next/head or whatever get routed to the stubbed versions, rather
 * than real implementation. This makes sure jest.mock calls will have effect.
 */
// Now import Header (after the mocks)
import Header from "./Header";

describe("Header", () => {
  it("renders all major sections", () => {
    render(<Header />);

    const logos = screen.getAllByTestId("stubbed-header-logo");

    // Asserts there should be two instances (mobile and desktop)
    // because we aren't accounting for screen size
    expect(logos).toHaveLength(2);

    // Asserts presence of logos, desktop nav, hamburger button, drawer container
    expect(logos[0]).toBeInTheDocument();
    expect(logos[1]).toBeInTheDocument();
    expect(screen.getByTestId("stubbed-desktop-nav")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Toggle menu" })).toBeInTheDocument();
    expect(screen.getByTestId("mobile-drawer")).toHaveAttribute("data-is-open", "false");
  });

  it("toggles mobile drawer open and closed", () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    const drawer = screen.getByTestId("mobile-drawer");

    // Initial state = closed
    expect(drawer).toHaveAttribute("data-is-open", "false");

    // Click on hamburger menu to change the state and open the mobile drawer
    fireEvent.click(toggle);
    expect(drawer).toHaveAttribute("data-is-open", "true");

    // Click on drawer to trigger onClose
    fireEvent.click(drawer);
    expect(drawer).toHaveAttribute("data-is-open", "false");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
