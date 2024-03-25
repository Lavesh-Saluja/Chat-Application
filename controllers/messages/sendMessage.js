const User = require("../../models/userSchema");
const getWebSocketModule = require("../../websocket/webSocketModule");
const messageSchema = require("../../messageFormat/message");
const { v4: uuidv4 } = require('uuid');


const sendMessage = async (req, res) => {
    console.log('------------------------------------');
    console.log("klkl");
    console.log('------------------------------------');
      console.log("Body",req.body);
    try {
        const { message, receiver } = req.body;
        const id = uuidv4(); 
                const msg=messageSchema(id,message,req.rootUser.phoneNumber,receiver,Date.now());
         console.log("Send Message", message, receiver);
        const user = await User.findOne({ phoneNumber: receiver });
        // console.log("User", user);
        if (!user) {
            console.log("User Does not exist")
            return res.status(404).send("User Does not exist");
        }
        const wsObject = getWebSocketModule();
        console.log("wsObject", wsObject);
        const ws = wsObject.clients.get(receiver);
    const response = await wsObject.sendMessage(msg, ws, receiver);
        return res.status(200).json({ success:response, message: "Message sent" });
    }
    catch (e) {
                console.log("Error",e);

        return res.status(500).send("Some error");
    }
}


module.exports = sendMessage;