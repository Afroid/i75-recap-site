import React from 'react';
import { render, screen } from '@testing-library/react';
import useSWR from 'swr';
import ScoresPage, { fetcher } from '@/pages/scores.page';
import type { ScoreDetail } from '@/components/Scores';

// Mock SWR hook and the Scores component
jest.mock('swr');
jest.mock('@/components/Scores', () => ({
  __esModule: true,
  default: () => <div data-testid="scores-component">Mocked Scores</div>,
}));

describe('fetcher & ScoresPage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset mocks before each test
  });

  it('fetcher resolves with parsed JSON when response.ok is true', async () => {
    // AAA – Arrange
    const fakeData: Record<string, ScoreDetail> = {
      'Team A': { runs: 1, hits: 2, errors: 0 },
    };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeData,
    });

    // AAA – Act
    const result = await fetcher('/some-url');

    // AAA – Assert
    expect(result).toEqual(fakeData);
    expect(global.fetch).toHaveBeenCalledWith('/some-url');
  });

  it('fetcher throws an error when response.ok is false', async () => {
    // AAA – Arrange
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({}),
    });

    // AAA – Act & Assert
    await expect(fetcher('/bad-url'))
      .rejects
      .toThrow('Network error: 502');
  });

  it('renders loading state when SWR returns no data or error', () => {
    // Arrange
    (useSWR as jest.Mock).mockReturnValue({ data: undefined, error: undefined });

    // Act
    render(<ScoresPage />);

    // Assert
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders error message when SWR returns an error', () => {
    // Arrange
    const err = new Error('Network fail');
    (useSWR as jest.Mock).mockReturnValue({ data: undefined, error: err });

    // Act
    render(<ScoresPage />);

    // Assert
    expect(
      screen.getByText(`Failed to load scores: ${err.message}`)
    ).toBeInTheDocument();
  });

  it('renders the Scores component and matches snapshot when data is ready', () => {
    // Arrange
    const fakeBox: Record<string, ScoreDetail> = {
      'Atlanta Braves': {
        runs: 5,
        hits: 10,
        errors: 1,
        record: '5-0',
        status: 'Final',
      },
    };
    (useSWR as jest.Mock).mockReturnValue({ data: fakeBox, error: undefined });

    // Act
    const { container } = render(<ScoresPage />);

    // Assert – component rendered
    expect(screen.getByTestId('scores-component')).toBeInTheDocument();

    // Assert – snapshot
    expect(container).toMatchSnapshot();
  });
});
