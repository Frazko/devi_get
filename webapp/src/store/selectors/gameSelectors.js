import { createSelector } from 'reselect';

export const minesweeper = state => state.minesweeperReducer || {};

export const cellsSelector = createSelector(
  minesweeper,
  game => game || {}
);
