export const UPDATE_GAME_STATE = "GAME_UPDATE_STATE";

export const sendPacket = (packet) => {
    return (dispatch, getState) => {
        getState().connection.socket.send(JSON.stringify(packet));
    };
}

export const requestGameState = () => {
    return sendPacket({type: "get_state"});
}

export const updateGameState = (state) => ({type: UPDATE_GAME_STATE, state});
