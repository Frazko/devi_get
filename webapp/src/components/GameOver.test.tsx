import React from 'react';
import { render, screen } from '@testing-library/react';
import GameOver from './GameOver';



describe('Game Over Modal', () => {
  test('renders you won modal message', () => {
    render(<GameOver won createNewGame={() => { }} restartGame={() => { }} />);
    const linkElement = screen.getByText(/you won/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders you lose modal message', () => {
    render(<GameOver won={false} createNewGame={() => { }} restartGame={() => { }} />);
    const linkElement = screen.getByText(/you lose/i);
    expect(linkElement).toBeInTheDocument();
  });
});