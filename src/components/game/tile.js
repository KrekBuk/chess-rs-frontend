import React from 'react';
import PieceView from "./piece-view";

const isLight = (file, rank) => {
    const fileNum = file.charCodeAt(0) - 'A'.charCodeAt(0);
    const rankNum = rank.charCodeAt(0) - '1'.charCodeAt(0);
    return ((fileNum % 2) ^ (rankNum % 2)) !== 0;
};

let Tile = ({file, rank, piece, select, highlighted, isValidMove}) => {
    let classes = "tile";

    if (isLight(file, rank)) {
        classes += " light";
    } else {
        classes += " dark";
    }

    if (highlighted) {
        classes += " highlighted";
    }

    return <div className={classes} onClick={() => select()}>
        {piece ? <PieceView type={piece.piece_type} color={piece.color}/> : ""}
        {isValidMove ? <div className={'valid-move'}/> : ""}
    </div>
}


export default Tile;
