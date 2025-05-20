import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './about.page';
import { TestIds } from '@/lib/testIds';

// Stub next/head so we can snapshot children without modifying document.head
jest.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('AboutPage', () => {
  it('renders the main heading', () => {
    render(<AboutPage />);

    // Assertions
    // Main content area should be in the document
    expect(screen.getByTestId(TestIds.ABOUT_MAIN)).toBeInTheDocument();
    // ensure our page title is displayed
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About I75 League');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<AboutPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
