import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';

import Config from './config';
import initFontAwesome from './font-awesome';
import App from './components/app';
import rootReducer from "./reducers";
import { updateToken, connect } from "./actions/connection";

initFontAwesome();

// Create store
const composeEnhancers = process.env.NODE_ENV === 'development' ?
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) :
    compose;

const middleware = [];
middleware.push(createLogger());
middleware.push(thunk);

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

if (process.env.NODE_ENV === 'development') {
    window.store = store;
}

// Load application
window.onload = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('app-holder')
    );
};

// Fetch token
const params = new URLSearchParams(window.location.search);
let token = params.get("token");

if (token) {
    Cookies.set("chess_rs_token", token, {expires: 7});
    window.location.href = window.location.href.split('?')[0];
} else {
    token = Cookies.get("chess_rs_token");
}

// Try connect
store.dispatch(updateToken(token));
store.dispatch(connect(Config.webSocketUrl));
