import React from 'react';
import { connect } from "react-redux";
import InGame from "./game/in-game";
import NotInGame from "./not-in-game";

let Authenticated = ({inGame}) => (
    <div className={'authenticated'}>
        {inGame ? <InGame/> : <NotInGame/>}
    </div>
);

const mapStateToProps = (state) => ({
    inGame: !! state.game && !! state.game.game
});

Authenticated = connect(
    mapStateToProps
)(Authenticated);

export default Authenticated;
