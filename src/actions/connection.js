export const State = Object.freeze({
    AUTHENTICATING: "authenticating",
    CONNECTING: "connecting",
    AUTH_FAILED: "auth_failed",
    DISCONNECTED: "disconnected",
    OK: "ok"
});

export const UPDATE_TOKEN = "CONNECTION_UPDATE_TOKEN";
export const CONNECT = "CONNECTION_CONNECT";
export const UPDATE_STATE = "CONNECTION_UPDATE_STATE";

export const updateToken = (token) => ({type: UPDATE_TOKEN, token});

export const connect = (address) => {
    return (dispatch) => {
        dispatch({type: CONNECT, address: address, dispatch: dispatch});
    };
}

export const updateState = (state, detail) => ({type: UPDATE_STATE, state, detail});

