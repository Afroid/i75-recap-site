import { render, screen } from '@testing-library/react'
import Home from '@/pages/index';

describe('Home page', () => {
  it('renders the hero heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1, name: /I75 League Recaps/i })
    expect(heading).toBeInTheDocument()
  })
})
