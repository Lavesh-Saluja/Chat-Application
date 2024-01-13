const Group = require("../../models/groupSchema");
const getWebSocketModule = require("../../websocket/webSocketModule");
const groupMessage = require("../../messageFormat/groupMessage");
const sendGroupMessage = async (req, res) => {
    try {
        const { text, groupId } = req.body;
        const sender = req.rootUser.phoneNumber;
       const group = await Group.findOne({ _id: groupId });
        console.log("group", group);
        // Check whether the group exists 
        if (!group) {
            return res.status(404).send("Group not found");
        }
        // Get all users of the group except the sender
        let groupUsers = group.users;
        //send message
        const wsObject = getWebSocketModule();
        const message = groupMessage(text, groupId, sender, Date.now());
        const messagePromise = [];
        groupUsers.forEach(user => {
            if(user.phoneNumber+""==sender+""){
                return;
            }
            const ws=wsObject.clients.get(user.phoneNumber+"");
            messagePromise.push(wsObject.sendMessage(message, ws, user.phoneNumber + ""));
        })
        await Promise.all(messagePromise);
        res.status(200).send("Message Sent Successfully");
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server error");
    }
}
module.exports=sendGroupMessage;