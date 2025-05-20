import React from "react";
import { render, screen } from "@testing-library/react";
import type { AppProps } from "next/app";

// Stub out next/head so it just renders its children
jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Stub out the Header component
jest.mock("@/components/Header", () => ({
  __esModule: true,
  default: () => <header data-testid="stubbed-header">HEADER</header>,
}));

// Stub out the LogoProvider so it simply renders children
jest.mock("@/lib/LogoContext", () => ({
  __esModule: true,
  LogoProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stubbed-logo-provider">{children}</div>
  ),
}));

/**
 * Importing after the mocks ensures the real copies of those dependencies don't get loaded.
 * This ensures any imports from next/head or whatever get routed to the stubbed versions, rather
 * than real implementation. This makes sure jest.mock calls will have effect.
 */
// Now import MyApp (after the mocks)
import MyApp from "@/pages/_app.page";

// A dummy page so we can detect it
function DummyPage({ foo }: { foo: string }) {
  return <div data-testid="dummy-page">{foo}</div>;
}

type RouterType = AppProps["router"];

// A minimal fake router...
const fakeRouter = {
  pathname:    "/",
  route:       "/",
  asPath:      "/?foo=bar",
  query:       { foo: "bar" },
  basePath:    "",
  push:        jest.fn(),
  replace:     jest.fn(),
  reload:      jest.fn(),
  back:        jest.fn(),
  prefetch:    jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on:   jest.fn(),
    off:  jest.fn(),
    emit: jest.fn(),
  },
  isFallback:      false,
  isReady:         true,
  isLocaleDomain:  false,
  isPreview:       false,
} as unknown as RouterType; // Casting via unknown sidesteps “missing properties”
// without ever writing as any instead.

describe("MyApp (_app.page.tsx)", () => {
  it("renders the page component inside the layout", () => {
    render(
      <MyApp
        Component={DummyPage}
        pageProps={{ foo: "hello world" }}
        router={fakeRouter}
      />
    );

    // Our DummyPage should appear under the stubbed layout
    expect(screen.getByTestId("stubbed-header")).toBeInTheDocument();
    expect(screen.getByTestId("stubbed-logo-provider")).toBeInTheDocument();
    expect(screen.getByTestId("dummy-page")).toHaveTextContent("hello world");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <MyApp Component={DummyPage} pageProps={{ foo: "📦 snapshot" }} router={fakeRouter} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
