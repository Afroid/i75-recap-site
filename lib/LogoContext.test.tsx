import React from "react";
import { render, renderHook, waitFor } from "@testing-library/react";
import { LogoProvider, useLogo } from "./LogoContext";

// A small component that reads from your LogoContext
function TestLogo() {
  const logo = useLogo();
  return <img data-testid="logo" src={logo} alt="Logo" />;
}

describe("LogoContext / useLogo", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("defaults to the initial logo during SSR/hydration", () => {
    // before renderHook, make Math.random return 0 so
    // logos[0] === "/default-logo.png"
    jest.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useLogo(), {
      wrapper: ({ children }) => <LogoProvider>{children}</LogoProvider>,
    });

    // Assert the initial state is always "/default-logo.png"
    expect(result.current).toBe("/default-logo.png");

    jest.restoreAllMocks();
  });

  it("picks one of the known logos after mount", async () => {
    const { result } = renderHook(() => useLogo(), {
      wrapper: ({ children }) => <LogoProvider>{children}</LogoProvider>,
    });

    // Assert state can be any of the three random options
    await waitFor(() => {
      expect([
        "/default-logo.png",
        "/default-logo-alt.png",
        "/default-RWB.png",
      ]).toContain(result.current);
    });
  });

  it("matches a snapshot of the markup with default-logo.png", () => {
    // Before renderHook, make Math.random return 0 anad 1 on first and second calls, respectively.
    // logos[0] === "/default-logo.png"
    // logos[2] === "/default-RWB.png"
    const mathRandomMock = jest.spyOn(Math, "random")
      .mockReturnValueOnce(0)      // for the first mount
      .mockReturnValueOnce(0.8);   // for the second mount

    const { asFragment, rerender } = render(
      <LogoProvider key="first">
        <TestLogo />
      </LogoProvider>
    );

    // Before effect, one state
    expect(asFragment()).toMatchSnapshot(); // Snapshot 1 uses "/default-logo.png"

    // Re-render with new src
    // Adding keys forces a real remount on the second render
    // Old tree is torn down to build a new one, which re-runs useEffect()
    rerender(
      <LogoProvider key="second">
        <TestLogo />
      </LogoProvider>
    );

    // logos[1] === "/default-RWB.png"
    expect(asFragment()).toMatchSnapshot(); // Snapshot 2 uses "/default-RWB.png"

    // Restore mathRandomMock
    mathRandomMock.mockRestore();
  });
});
