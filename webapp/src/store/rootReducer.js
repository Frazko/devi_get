import { combineReducers } from 'redux';

import minesweeperReducer from "./reducers/minesweeperReducer";

const rootReducer = combineReducers({
    minesweeperReducer: minesweeperReducer,
});

export default rootReducer;