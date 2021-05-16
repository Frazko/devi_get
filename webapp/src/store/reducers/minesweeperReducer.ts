import axios from '../../utils/axiosConfig';
import {
  CREATE_GAME_URL
} from '../../utils/apis';

const CREATE_GAME = 'minesweeper/CREATE_GAME';
const CREATE_GAME_SUCCESS = 'minesweeper/CREATE_GAME_SUCCESS';
const SELECT_CELL = 'minesweeper/SELECT_CELL';
const TOGGLE_FLAG_CELL = 'minesweeper/TOGGLE_FLAG_CELL';
const GET_GAME_INFO = 'minesweeper/GET_GAME_INFO';
const RESTART_GAME = 'minesweeper/RESTART_GAME';

const initialState = {
  loading: false,
  error: false
}

const minesweeperReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_GAME:
      return {
        ...state,
        loading: true,
      };
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
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
      };
    case RESTART_GAME:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
}

export const restartGameActionCreator = (gameId: any) => ({
  type: RESTART_GAME,
  payload: gameId,
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
  const result = await axios.post(CREATE_GAME_URL, JSON.stringify(gameDetails));
  console.log('result: ', result);
  dispatch({
    type: CREATE_GAME_SUCCESS,
    payload: result.data
  });
}


export default minesweeperReducer;