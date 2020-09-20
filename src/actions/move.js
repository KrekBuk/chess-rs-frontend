import { sendPacket } from './game';

export const SELECT_PIECE = "MOVE_SELECT_PIECE";

export const selectPiece = (piece) => ({type: SELECT_PIECE, piece});

export const makeMove = (from, to) => {
    return sendPacket({type: "make_move", from, to});
}
