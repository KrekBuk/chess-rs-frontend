import {
    UPDATE_GAME_STATE
} from '../actions/game';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_GAME_STATE:
            return action.state;
        default:
            return state;
    }
}
