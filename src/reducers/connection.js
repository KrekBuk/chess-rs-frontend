import {
    State,
    UPDATE_TOKEN,
    CONNECT,
    UPDATE_STATE,
    updateState
} from '../actions/connection';

import { requestGameState, updateGameState } from '../actions/game';

const initialState = {
    state: State.AUTHENTICATING,
    token: null,

    /**
     * @type {WebSocket}
     */
    socket: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_TOKEN:
            return {...state, token: action.token};
        case CONNECT:
            if (state.socket && state.socket.readyState === 1) {
                state.socket.close();
            }

            const socket = new WebSocket(action.address + "?token=" + state.token);
            socket.onopen = e => {
                action.dispatch(updateState(State.OK, e));
                action.dispatch(requestGameState());
            }

            socket.onclose = e => {
                if (e.code === 4000) {
                    action.dispatch(updateState(State.AUTH_FAILED));
                } else {
                    action.dispatch(updateState(State.DISCONNECTED, e.code));
                }
            }

            socket.onmessage = e => {
                action.dispatch(updateGameState(JSON.parse(e.data)));
            }

            return {...state, socket};
        case UPDATE_STATE:
            return {...state, state: action.state, disconnect_code: action.detail};
        default:
            return state;
    }
}
