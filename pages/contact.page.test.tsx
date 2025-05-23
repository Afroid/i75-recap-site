import React from "react";
import { render, screen } from "@testing-library/react";
import ContactPage from "@/pages/contact.page";
import { TestIds } from "@/lib/testIds";

// Stub out next/head so it just renders its children
jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("ContactPage", () => {
  it("renders the main elements", () => {
    // Renders the Contact Page
    render(<ContactPage />);

    // Grab the elements by their test IDs
    const contactMain = screen.getByTestId(TestIds.CONTACT_MAIN);
    const emailLink = screen.getByTestId(TestIds.CONTACT_EMAIL_LINK);
    const form = screen.getByTestId(TestIds.CONTACT_FORM);
    const formNameSection = screen.getByTestId(TestIds.CONTACT_FORM_NAME_SECTION);
    const formEmailSection = screen.getByTestId(TestIds.CONTACT_FORM_EMAIL_SECTION);
    const formMessageSection = screen.getByTestId(TestIds.CONTACT_FORM_MESSAGE_SECTION);
    const formSubmit = screen.getByTestId(TestIds.CONTACT_FORM_SUBMIT);

    // Assert main's existence
    expect(contactMain).toBeInTheDocument();

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

  it("renders the labels with corresponding inputs", () => {
    // Renders the Contact Page
    render(<ContactPage />);

    /**
     * These three sections/assertions work to prove the htmlFor attributes are correct
     * by finding the label's text and returning the corresponding input,
     * then validates the input has the correct id, which matches the htmlFor.
     */

    // This finds the label by the Name text but actually you get the <input>
    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("id", "name");

    // This finds the label by the Email text but actually you get the <input>
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("id", "email");

    // This finds the label by the Message text but actually you get the <input>
    const messageInput = screen.getByLabelText("Message");
    expect(messageInput).toBeInTheDocument();
    expect(messageInput).toHaveAttribute("id", "message");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ContactPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
