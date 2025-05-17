import { render, screen } from '@testing-library/react'
import Home from '@/pages/index.page';
import { TestIds } from '@/lib/testIds';

describe('Home page', () => {
  it('asserts that the the hero heading renders', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1, name: /I75 League Recaps/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the hero heading text', () => {
    // Renders the page
    render(<Home />)

    // Grabs the element
    const heading = screen.getByTestId(TestIds.HOME_HERO_HEADING)

    // Assertions
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/I75 League Recaps/i)
  })

  it('matches the snapshot', () => {
    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchSnapshot()
  })
})
