const express = require('express');
const router = express.Router();
const  authenticateUser  = require("../middleware/authenticate");
const registeration = require("../controllers/authentication/register");
const login = require("../controllers/authentication/login");
const sendMessage = require("../controllers/messages/sendMessage");
const getQueuedMessages = require("../controllers/messages/getQueuedMessages");
const createGroup = require("../controllers/group/createGroup");
const sendGroupMessage = require("../controllers/messages/sendGroupMessage");
const getGroups = require("../controllers/group/getGroups");
const getGroupDetails = require("../controllers/group/getGroupDetails");


require("../db/connection")

router.get('/', (req, res) => {
    res.send("Hello World!");
}
);

//User registrationh through mobile number and otp
router.post("/sendOtp", registeration.otp);
router.post("/verifyotp", registeration.verifyOtp);

//User Login througverifyOtph mobile number and otp
router.post("/sendloginOtp", login.otp);
router.post("/verifyloginOtp", login.verifyOtp);
//one to one message
router.post("/sendMessage", authenticateUser, sendMessage)
router.get("/getQueuedMessages", authenticateUser, getQueuedMessages);

router.post("/createGroup", authenticateUser, createGroup);
router.post("/sendGroupMessage", authenticateUser, sendGroupMessage);
router.get("/getGroups", authenticateUser,getGroups);
router.get("/getGroupDetails/:groupId", authenticateUser, getGroupDetails);

module.exports = router;