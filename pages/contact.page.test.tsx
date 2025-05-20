import React from "react";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/pages/contact.page";

// Stub out next/head so it just renders its children
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("ContactPage", () => {
  it("renders the mailto link correctly", () => {
    render(<ContactPage />);
    const emailLink = screen.getByTestId("contact-email-link");
    const form = screen.getByTestId("contact-form");
    const formNameSection = screen.getByTestId("contact-form-name-section");
    const formEmailSection = screen.getByTestId("contact-form-email-section");
    const formMessageSection = screen.getByTestId("contact-form-message-section");
    const formSubmit = screen.getByTestId("contact-form-submit");

    // Assertions for email
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:notCurrentlyActiveEmail@i75league.com");
    expect(emailLink).toHaveTextContent("notCurrentlyActiveEmail@i75league.com");

    // Assertions for form, sections, and the submit button
    expect(form).toBeInTheDocument();
    expect(formNameSection).toBeInTheDocument();
    expect(formEmailSection).toBeInTheDocument();
    expect(formMessageSection).toBeInTheDocument();
    expect(formSubmit).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ContactPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
