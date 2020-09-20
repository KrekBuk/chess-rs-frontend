import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";

import { State } from "../actions/connection";
import Config from "../config";

let getIconFor = (state) => {
    switch (state) {
        case State.AUTHENTICATING:
        case State.CONNECTING:
            return "sync";
        case State.AUTH_FAILED:
            return "user-lock";
        case State.DISCONNECTED:
            return "times";
        default:
            return "times";
    }
};

let getMessageFor = (state) => {
    switch (state) {
        case State.AUTHENTICATING:
            return "Authenticating";
        case State.CONNECTING:
            return "Connecting...";
        case State.AUTH_FAILED:
            return <div>
                Unauthenticated. <a href={Config.loginUrl}>Log in here</a>
            </div>;
        case State.DISCONNECTED:
            return "Cannot connect to the server. ";
        default:
            return "Invalid state: " + state;
    }
};

let ConnectState = ({state}) => (
    <div className={'connection-state'}>
        <div className={'icon'}>
            <FontAwesomeIcon icon={getIconFor(state)}/>
        </div>
        <div className={'text'}>
            {getMessageFor(state)}
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    state: state.connection.state,
    code: state.connection.disconnect_code,
});

ConnectState = connect(
    mapStateToProps
)(ConnectState);

export default ConnectState;
