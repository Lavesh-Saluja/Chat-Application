const User = require("../../models/userSchema");
const getGroup = async (req, res) => {
    try {
        const user = req.rootUser;
        const groups = user.groups;
        res.status(200).json({ groups });
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = getGroup;