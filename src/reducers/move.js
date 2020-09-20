import {
    SELECT_PIECE
} from '../actions/move';

const initialState = {
    selected: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_PIECE:
            return {...state, selected: action.piece};
        default:
            return state;
    }
}
