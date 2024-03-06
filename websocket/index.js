const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const http = require('http');

const getWebSocketModule=require("./webSocketModule")
function onSocketPreError(error) {
    console.log(e);
}
function onSocketPostError(e) {
    console.log(e);
}   
async function configure(server) {
    
    const wss = getWebSocketModule();
    const websocketHttpServer = http.createServer();
    const WS_PORT = process.env.WS_PORT;
    websocketHttpServer.listen(WS_PORT, () => {
    console.log(`WebSocket Server is running on port ${WS_PORT}`);
});
    wss.authorizeAndConnect(websocketHttpServer);
}

module.exports=configure