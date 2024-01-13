const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "~"
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    country: {
        type: String,
        default: "India"
    },
    otp: {
        type: Number,
        required: true
    },
    otpExpiration: {
        type: Date,
        required: true
    },
    token: {
                type: String,
    },
 groups: [
        {
            groupId: {
                type: mongoose.Schema.Types.ObjectId, // Assuming groupId is of type ObjectId
                ref: 'Group' // Assuming 'Group' is the model name for your group schema
            }
        }
    ]
    
});
userSchema.methods.generateAuthToken = async function (req, res) {
    try {
        let token = jwt.sign({ _id: this._id,phoneNumber:req.body.phoneNumber }, process.env.SECRET_KEY);
        this.token =  token ;
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
const User = mongoose.model('USER', userSchema);

module.exports = User;