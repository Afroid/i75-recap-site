import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderLogo from "@/components/HeaderLogo";

// Stub next/link to render a plain <a> with the passed props
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
    "data-testid": testId,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    "data-testid"?: string;
  }) => (
    <a href={href} className={className} data-testid={testId}>
      {children}
    </a>
  ),
}));

// Stub next/image to render a plain <img>
// Here I explicitly destructure out the props we know HeaderLogo will pass, plus the data-testid.
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    "data-testid": testId,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    "data-testid"?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid={testId}
    />
  ),
}));

// Stub the useLogo hook to return a URL
jest.mock("@/lib/LogoContext", () => ({
  useLogo: () => "/dynamic-logo.png",
}));

describe("HeaderLogo", () => {
  it("renders the link wrapper, static & dynamic images correctly", () => {
    render(<HeaderLogo />);

    // The <Link> → <a>
    const link = screen.getByTestId("header-logo-link");
    expect(link).toHaveAttribute("href", "/");

    // Static site name image
    const nameImg = screen.getByTestId("header-logo-name");
    expect(nameImg).toHaveAttribute("src", "/I75League.png");
    expect(nameImg).toHaveAttribute("alt", "League Name");

    // Dynamic league logo image from useLogo
    const dynImg = screen.getByTestId("header-logo-dynamic");
    expect(dynImg).toHaveAttribute("src", "/dynamic-logo.png");
    expect(dynImg).toHaveAttribute("alt", "League Logo");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<HeaderLogo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
