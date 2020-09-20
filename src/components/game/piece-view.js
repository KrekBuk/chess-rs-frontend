import React from 'react';

const PIECE_SIZE = 60;

const getBackgroundPosition = (color, type) => {
    const position = {};

    switch (type) {
        case "King":
            position.x = 0;
            break;
        case "Queen":
            position.x = 1;
            break;
        case "Bishop":
            position.x = 2;
            break;
        case "Knight":
            position.x = 3;
            break;
        case "Rook":
            position.x = 4;
            break;
        case "Pawn":
            position.x = 5;
            break;
    }


    switch (color) {
        case "White":
            position.y = 0;
            break;
        case "Black":
            position.y = 1;
            break;
    }

    position.x *= - PIECE_SIZE;
    position.y *= - PIECE_SIZE;

    return position;
};

let PieceView = ({color, type}) => {
    let backgroundPosition = getBackgroundPosition(color, type);

    return <div
        className={'piece-view'}
        style={{backgroundPositionX: backgroundPosition.x, backgroundPositionY: backgroundPosition.y}}
    />
};

export default PieceView;
