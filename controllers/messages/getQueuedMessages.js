const readMessages = require("../../messagingQueue/readMessage");

const getQueuedMessages = async (req,res) => {
    const phone = req.rootUser.phoneNumber;
    console.log("Phone", typeof(phone));
    const message = await readMessages(phone + "");
    console.log("Message", message);
    return res.status(200).json({success: true, message: message});
    
}
module.exports = getQueuedMessages;