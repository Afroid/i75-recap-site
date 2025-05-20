import React from "react";
import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404.page";

// Mock next/link so that in tests it renders a plain <a> we can query:
jest.mock("next/link", () => {
  // We need __esModule so Jest treats this as an ES default export
  return {
    __esModule: true,
    default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => {
      return (
        <a data-testid="return-home-link" href={href} {...rest}>
          {children}
        </a>
      );
    },
  };
});

describe("Custom404", () => {
  it("renders a ‘Return Home’ link pointing to `/`", () => {
    render(<Custom404 />);

    // Grab the element by testid
    const anchor = screen.getByTestId("return-home-link");

    // Assertions
    expect(anchor).toHaveAttribute("href", "/");
    expect(anchor).toHaveTextContent("Return Home");

    // This is overkill but we'll now grab the element by role
    const link = screen.getByRole("link", { name: "Return Home" });

    // Assert it's in the document
    expect(link).toBeInTheDocument();
  });

  it("matches its snapshot", () => {
    const { asFragment } = render(<Custom404 />);
    expect(asFragment()).toMatchSnapshot();
  });
});
