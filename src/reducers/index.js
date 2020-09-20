import { combineReducers } from "redux";
import connection from "./connection";
import game from './game';
import move from './move';

const rootReducer = combineReducers({
    connection,
    game,
    move
});

export default rootReducer;