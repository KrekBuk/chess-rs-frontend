let Config = {
    webSocketUrl: "",
    loginUrl: ""
};

if (window.chess_rs_config) {
    Config = window.chess_rs_config;

    delete window.chess_rs_config;
}

export default Config;