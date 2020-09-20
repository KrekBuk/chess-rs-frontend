import React from 'react';
import { connect } from "react-redux";
import UserInfo from "./user-info";
import Board from "./board";

let InGame = ({user, game, reverseBoard}) => (
    <div className={'game'}>
        <UserInfo user={reverseBoard ? game.white : game.black}/>
        <Board reversed={reverseBoard} pieces={game.pieces} highlighted={game.highlighted_squares}/>
        <UserInfo user={reverseBoard ? game.black : game.white}/>
    </div>
);

const mapStateToProps = (state) => ({
    user: state.game.user,
    game: state.game.game,
    reverseBoard: state.game.user.id === state.game.game.black.id
});

InGame = connect(
    mapStateToProps
)(InGame);

export default InGame;
