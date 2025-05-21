import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestIds } from "@/lib/testIds";

// Stub next/image to render a plain <img>
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Forwards everything: src, alt, onError, data-testid, etc.
    <img {...props} />
  ),
}));

// Stub useLogo hook
jest.mock("@/lib/LogoContext", () => ({
  useLogo: jest.fn(),
}));

import TeamLogo from "@/components/TeamLogo";
import { useLogo } from "@/lib/LogoContext";

describe("TeamLogo", () => {
  const useLogoMock = useLogo as jest.MockedFunction<typeof useLogo>;

  beforeEach(() => {
    useLogoMock.mockReset();
  });

  it("renders the provided src when src prop is given", () => {
    useLogoMock.mockReturnValue("/random-from-context.png");

    // Render with given src
    render(
      <TeamLogo
        src="/team-logo.png"
        alt="Team A"
        className="some-random-class"
      />
    );
    const img = screen.getByTestId(TestIds.TEAM_LOGO_IMAGE);
    expect(img).toHaveAttribute("src", "/team-logo.png");
    expect(img).toHaveAttribute("alt", "Team A");
    expect(img).toHaveClass("some-random-class");
  });

  it("renders random logo when no src prop is provided", () => {
    useLogoMock.mockReturnValue("/random-from-context.png");

    // Render without a src given
    render(<TeamLogo alt="Team B" />);
    const img = screen.getByTestId(TestIds.TEAM_LOGO_IMAGE);
    expect(img).toHaveAttribute("src", "/random-from-context.png");
    expect(img).toHaveAttribute("alt", "Team B");
  });

  it("falls back to default-logo.png on error", () => {
    useLogoMock.mockReturnValue("/random-from-context.png");

    // Render with no `src` prop so it uses the context value
    render(<TeamLogo alt="Fallback Scenario" />);

    const img = screen.getByTestId(TestIds.TEAM_LOGO_IMAGE) as HTMLImageElement;

    // sanity check: initial src is the context one
    expect(img).toHaveAttribute("src", "/random-from-context.png");

    // simulate a load error
    fireEvent.error(img);

    // now it should have switched to the default
    expect(img).toHaveAttribute("src", "/default-logo.png");
  });

  it("matches the snapshot", () => {
    useLogoMock.mockReturnValue("/snap-logo.png");

    const { asFragment } = render(
      <TeamLogo
        alt="Snapshot"
        className="snap-class"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
