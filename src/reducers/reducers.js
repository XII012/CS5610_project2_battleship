import { combineReducers } from 'redux';
import clickReducer from './clickReducer';
import board1Reducer from "./board1Reducer";
import board2Reducer from "./board2Reducer";
// import shipNumReducer from './shipNumReducer';

export default combineReducers({
    board1: board1Reducer,
    board2: board2Reducer,
    clickCount: clickReducer,
    // shipNum: shipNumReducer,
})