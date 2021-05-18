import reducer from './minesweeperReducer'
import fetchMock from 'fetch-mock-jest'
import expect from 'expect'

import {
  CREATE_GAME,
  SET_TIMER,
  START_TIMER,
  setTimerActionCreator,
} from './minesweeperReducer';

const initialState = {
  id: null,
  loading: false,
  error: false,
  cells: [],
  minesCount: 0,
  won: false,
  lost: false,
  over: false,
  board: {
    cols:0,
    rows:0,
    mines:0,
  },
  timer: 0,
  isTimerOn: false,
}

describe('Minesweeper game Actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('should create an action to set the timer', () => {
    const expectedAction = {type: SET_TIMER, payload:5}
    expect(setTimerActionCreator(5)).toEqual(expectedAction)
  })
})

describe('Minesweeper game Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle CREATE_GAME', () => {
    const resultState = {...initialState, loading: true}
    expect(reducer(undefined, { type: CREATE_GAME })).toEqual(resultState)
  })

  it('should handle SET_TIMER', () => {
    const resultState = {...initialState, timer: 1}
    expect(reducer(undefined, { type: SET_TIMER, payload:1 })).toEqual(resultState)
  })

  it('should handle START_TIMER', () => {
    const resultState = {...initialState, timer: 0, isTimerOn: true}
    expect(reducer(undefined, { type: START_TIMER })).toEqual(resultState)
  })
})