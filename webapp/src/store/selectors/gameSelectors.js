import { createSelector } from 'reselect';

export const minesweeper = state => state.minesweeperReducer || {};

export const gameSelector = createSelector(
  minesweeper,
  game => game || {}
);

export const isTimerOnSelector = createSelector(
  minesweeper,
  game => game.isTimerOn
);
