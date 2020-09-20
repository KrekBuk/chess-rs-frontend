import { hot } from 'react-hot-loader';
import React from 'react';
import { connect } from 'react-redux';

import { State } from '../actions/connection';
import Authenticated from "./authenticated";
import ConnectState from "./connect-state";

let App = ({connectionState}) => (
    <div className={'app'}>
        {
            connectionState === State.OK
                ? <Authenticated/>
                : <ConnectState/>
        }
    </div>
);

const mapStateToProps = (state) => ({
    connectionState: state.connection.state
});

App = connect(
    mapStateToProps
)(App);

export default hot(module)(App);
