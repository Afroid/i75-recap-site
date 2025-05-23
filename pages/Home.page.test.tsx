import { render, screen } from "@testing-library/react"
import Home from "@/pages/index.page";
import { TestIds } from "@/lib/testIds";

describe("Home page", () => {
  it("renders the elements", () => {
    // Renders the page
    render(<Home />);

    // Grabs the elements by their testids
    const main = screen.getByTestId(TestIds.HOME_MAIN);
    const heroLogo = screen.getByTestId(TestIds.HOME_HERO_LOGO);
    const introSection = screen.getByTestId(TestIds.HOME_INTRO_SECTION);
    const ctaContainer = screen.getByTestId(TestIds.HOME_CTA_CONTAINER);
    const viewAllRecapsButton = screen.getByTestId(TestIds.HOME_VIEW_ALL_RECAPS_BUTTON);
    const learnMoreButton = screen.getByTestId(TestIds.HOME_LEARN_MORE_BUTTON);

    // Assertions
    expect(main).toBeInTheDocument();
    expect(heroLogo).toBeInTheDocument();
    expect(introSection).toBeInTheDocument();
    expect(ctaContainer).toBeInTheDocument();
    expect(viewAllRecapsButton).toBeInTheDocument();
    expect(learnMoreButton).toBeInTheDocument();
  });

  it("asserts that the the hero heading renders", () => {
    /**
     * This test is slightly redundant but I wanted to leave it to show how to grab a
     * level 1 heading with the associated text.
     */
    // Renders the page
    render(<Home />);

    // Grabbing a heading but it's a level one with I75 League Recaps as the text.
    const heading = screen.getByRole("heading", { level: 1, name: "I75 League Recaps" });
    expect(heading).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchSnapshot()
  });
});
