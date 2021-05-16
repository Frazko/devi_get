import axios from '../../utils/axiosConfig';
import {
  CREATE_GAME_URL, GET_GAME_INFO_URL, RESTART_GAME_URL, SELECT_CELL_URL, TOGGLE_FLAG_CELL_URL
} from '../../utils/apis';

const CREATE_GAME = 'minesweeper/CREATE_GAME';
const SELECT_CELL = 'minesweeper/SELECT_CELL';
const TOGGLE_FLAG_CELL = 'minesweeper/TOGGLE_FLAG_CELL';
const GET_GAME_INFO = 'minesweeper/GET_GAME_INFO';
const RESTART_GAME = 'minesweeper/RESTART_GAME';
const UPDATE_SUCCESS = 'minesweeper/UPDATE_SUCCESS';

const SET_TIMER = 'minesweeper/SET_TIMER';
const START_TIMER = 'minesweeper/START_TIMER';
const STOP_TIMER = 'minesweeper/STOP_TIMER';
const CLEAR_TIMER = 'minesweeper/CLEAR_TIMER';

const initialState = {
  id: null,
  loading: false,
  error: false,
  cells: [],
  minesCount: 5,
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

const minesweeperReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS:
      console.log('UPDATE_SUCCESS: ', action.payload);
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: false,
      };
    case SELECT_CELL:
      return {
        ...state,
      };
    case TOGGLE_FLAG_CELL:
      return {
        ...state,
      };
    case GET_GAME_INFO:
      return {
        ...state,
        loading: true,
      };
    case RESTART_GAME:
      return {
        ...state,
        loading: true,
      };
    case SET_TIMER:
      console.log('SET_TIMER: ', SET_TIMER);
      return {
        ...state,
        timer: action.payload,
      };
    case START_TIMER:
      console.log('START_TIMER: ', START_TIMER);
      return {
        ...state,
        timer: 0,
        isTimerOn: true,
      };
    case STOP_TIMER:
      console.log('STOP_TIMER: ', STOP_TIMER);
      return {
        ...state,
        isTimerOn: false,
      };
    case CLEAR_TIMER:
      console.log('CLEAR_TIMER: ', CLEAR_TIMER);
      return {
        ...state,
        timer: 0,
      };

    default:
      return {
        ...state,
      };
  }
}


export const setTimerActionCreator = (time: number) => ({
  type: SET_TIMER,
  payload: time
});

export const startTimerActionCreator = () => ({
  type: START_TIMER,
});

export const stopTimerActionCreator = () => ({
  type: STOP_TIMER,
});

export const clearTimerActionCreator = () => ({
  type: CLEAR_TIMER,
});

export const createGameActionCreator = (
  gameDetails: any,
) => async (dispatch: (arg0: {
  type: any;
  payload ? : any; // should be mineSweeperGame type
}) => void) => {
  dispatch({
    type: CREATE_GAME
  });
  dispatch({
    type: START_TIMER
  });
  const result = await axios.post(CREATE_GAME_URL, JSON.stringify(gameDetails));
  console.log('result: ', result);
  dispatch({
    type: UPDATE_SUCCESS,
    payload: result.data
  });
}

export const selectCellActionCreator = (
  cell: any,
) => async (dispatch: (arg0: {
  type: any;
  payload ? : any;
}) => void) => {
  dispatch({
    type: SELECT_CELL
  });
  const result = await axios.post(SELECT_CELL_URL, JSON.stringify(cell));
  console.log('result: ', result.data);
  dispatch({
    type: UPDATE_SUCCESS,
    payload: result.data
  });
}

export const flagCellActionCreator = (
  cell: any,
) => async (dispatch: (arg0: {
  type: any;
  payload ? : any;
}) => void) => {
  dispatch({
    type: TOGGLE_FLAG_CELL
  });
  const result = await axios.post(TOGGLE_FLAG_CELL_URL, JSON.stringify(cell));
  dispatch({
    type: UPDATE_SUCCESS,
    payload: result.data
  });
}

export const restartGameActionCreator = (
  id: string,
) => async (dispatch: (arg0: {
  type: any;
  payload ? : any;
}) => void) => {
  dispatch({
    type: RESTART_GAME
  });
  dispatch({
    type: START_TIMER
  });
  const result = await axios.post(RESTART_GAME_URL, JSON.stringify({id}));
  dispatch({
    type: UPDATE_SUCCESS,
    payload: result.data
  });
}

export const getGameInfoActionCreator = (
  id: string,
) => async (dispatch: (arg0: {
  type: any;
  payload ? : any;
}) => void) => {
  dispatch({
    type: GET_GAME_INFO
  });
  const result = await axios.get(`${GET_GAME_INFO_URL}/${id}`);
  dispatch({
    type: UPDATE_SUCCESS,
    payload: result.data
  });
}



export default minesweeperReducer;