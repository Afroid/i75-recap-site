import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Breadcrumb from "@/components/Breadcrumb";

// Stub next/link so it just renders a plain <a>
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a href={href}>{children}</a>
    ),
  };
});

describe("Breadcrumb", () => {
  const year = "2023";
  const week = "5";

  it("renders the correct links and current crumb", () => {
    render(<Breadcrumb year={year} week={week} />);

    // First crumb: home link
    const homeLink = screen.getByRole("link", { name: "I75 League" });
    expect(homeLink).toHaveAttribute("href", "/");

    // Second crumb: year link
    const yearLink = screen.getByRole("link", { name: year });
    expect(yearLink).toHaveAttribute("href", `/recaps/${year}`);

    // Final crumb: plain text span (not clickable)
    const weekSpan = screen.getByText(week);
    expect(weekSpan.tagName).toBe("SPAN");
    expect(weekSpan).toHaveClass("font-semibold");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Breadcrumb year={year} week={week} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
