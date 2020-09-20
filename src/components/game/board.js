import React from 'react';
import Rank from "./rank";
import { connect } from "react-redux";
import { makeMove, selectPiece } from "../../actions/move";

const FILES = "ABCDEFGH".split("");
const RANKS = "87654321".split("");

const findSelectedPiece = (pieces, selected) => {
    if (! selected) {
        return undefined;
    }

    return pieces.find(piece => piece.position === selected);
}

const onClick = (selectedPiece, select, makeMove, file, rank) => {
    const clicked = file + rank;

    if (! selectedPiece || ! selectedPiece.valid_moves.find(move => move === clicked)) {
        select(file, rank);
        return;
    }

    makeMove(selectedPiece.position, clicked);
}

let Board = ({pieces, highlighted, reversed, selected, select, makeMove}) => {
    console.log(reversed);

    const files = reversed ? FILES.slice().reverse() : FILES;
    const ranks = reversed ? RANKS.slice().reverse() : RANKS;
    const selectedPiece = findSelectedPiece(pieces, selected);

    return <div className={'board'}>
        {ranks.map((rank, _) => <Rank
            key={rank}
            rank={rank}
            files={files}
            pieces={pieces}
            highlighted={highlighted}
            selected={selected}
            validMoves={!! selectedPiece ? selectedPiece.valid_moves : []}
            select={(file, rank) => onClick(selectedPiece, select, makeMove, file, rank)}/>)
        }
    </div>
};

const mapStateToProps = (state) => ({
    selected: state.move.selected
});

const mapDispatchToProps = dispatch => {
    return {
        select: (file, rank) => {
            dispatch(selectPiece(file + rank))
        },
        makeMove: (from, to) => {
            dispatch(makeMove(from, to))
        }
    };
};

Board = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);

export default Board;
