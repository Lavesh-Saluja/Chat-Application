const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const getWebSocketModule=require("./webSocketModule")
function onSocketPreError(error) {
    console.log(e);
}
function onSocketPostError(e) {
    console.log(e);
}   
async function configure(server) {
    
    const wss = getWebSocketModule();
    wss.authorizeAndConnect(server);
}

module.exports=configure