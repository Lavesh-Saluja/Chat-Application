const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const http = require('http');
const getWebSocketModule = require("./webSocketModule")
const express = require('express');
const appWebSocket = express();

function onSocketPreError(error) {
    console.log(e);
}
function onSocketPostError(e) {
    console.log(e);
}   
async function configure(server) {
    appWebSocket.use((req, res, next) => {
    console.log(`Request hit on WebSocket server (port ${WS_PORT}): ${req.method} ${req.url}`);
    next();
});
    const wss = getWebSocketModule();
//     const websocketHttpServer = http.createServer(appWebSocket);
//     const WS_PORT = process.env.WS_PORT;
//     websocketHttpServer.listen(WS_PORT, () => {
//     console.log(`WebSocket Server is running on port ${WS_PORT}`);
// });
    wss.authorizeAndConnect(server);
}

module.exports=configure