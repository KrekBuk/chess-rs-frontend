import React from 'react';
import Tile from "./tile";

const findPiece = (pieces, rank, file) => pieces.find(piece => piece.position === (file + rank));
const contains = (list, rank, file) => !! list.find(position => position === (file + rank));

let Rank = ({pieces, rank, files, select, highlighted, validMoves}) => (
    <div className={'rank'}>
        {files.map((file, _) => <Tile
            key={file}
            file={file}
            rank={rank}
            piece={findPiece(pieces, rank, file)}
            highlighted={contains(highlighted, rank, file)}
            isValidMove={contains(validMoves, rank, file)}
            select={() => select(file, rank)}/>)}
    </div>
);

export default Rank;
