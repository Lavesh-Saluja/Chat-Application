const User = require("../../models/userSchema");
const Group = require("../../models/groupSchema");
const groupCreationMessage = require("../../messageFormat/groupCreationMessage");
const getWebSocketModule = require("../../websocket/webSocketModule")
const mongoose = require('mongoose');

const createGroup=async (req, res) => {
    try{const { name, users, admins } = req.body;
        console.log("create group", name, users, admins);
        // authentication of all users using parallel promises
        const userPromises = [];
        for (let i = 0; i < users.length; i++) {
            userPromises.push(User.findOne({ phoneNumber: users[i] }));
        }
        const adminPromises = [];
        for (let i = 0; i < admins.length; i++) {
            adminPromises.push(User.findOne({ phoneNumber: admins[i] }));
        }
        const userResults = await Promise.all(userPromises);
        const adminResults = await Promise.all(adminPromises);
        for (let i = 0; i < userResults.length; i++) {
            if (!userResults[i]) {
                return res.status(404).send("User Does not exist");
            }
        }
        for (let i = 0; i < adminResults.length; i++) {
            if (!adminResults[i]) {
                return res.status(404).send("Admin Does not exist");
            }
        }
        //create group

        const group = new Group({
            name,
            users:[], 
            admins:[]
        });
        for (let i = 0; i < users.length; i++) {
            group.users.push({ phoneNumber: users[i] });
        }
        for (let i = 0; i < admins.length; i++) {
            group.admins.push({ phoneNumber: admins[i] });
        }
        await group.save();
        // add group ID to user schema using parallel processing
        let userProfiles = [];
        users.forEach(userPhone => {
            const user = User.findOne({ phoneNumber: userPhone });
            userProfiles.push(user);
        })
        userProfiles = await Promise.all(userProfiles);
        // convert group ID to mongoose object ID
        const groupId = new mongoose.Types.ObjectId(group._id);

        userProfiles.forEach(userProfile => {
            userProfile.groups.push({ groupId });
        })
        await Promise.all(userProfiles.map(userProfile => userProfile.save()));
        

        //send message to all users saying that they have been added to a group using parallel promises
        const text = "You have been added to a group " + name;
        const message = groupCreationMessage(text,group._id,req.rootUser.phoneNumber,Date.now());
        const wsObject = getWebSocketModule();
        const messagePromise = [];
        users.forEach(userPhone => {
            const ws = wsObject.clients.get(userPhone);
            messagePromise.push(wsObject.sendMessage(message, ws, userPhone));
        })
        await Promise.all(messagePromise);
    
        console.log("Group created",group);
        res.status(200).send("Group created");

    } catch (e) {
        console.log(e.message);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = createGroup;