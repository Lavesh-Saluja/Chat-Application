const Group = require("../../models/groupSchema");
const groupDetails = async (req, res) => { 
    try {
        const groupId = req.params.groupId;
        const group = await Group.findOne({ "_id": groupId });
        if (!group) {
            return res.status(404).send("Group Does not exist");
        }
        const groupDetails = {
            name: group.name,
            users: group.users,
            admins: group.admins
        }
        res.status(200).json({ groupDetails }); 
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

}
module.exports = groupDetails;