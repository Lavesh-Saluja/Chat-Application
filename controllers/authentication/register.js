const User = require('../../models/userSchema');
const sendOtp = require('../../utils/otp/sendOtp');
const generateOtp=require('../../utils/otp/generateOtp'); 
const otp = async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber ) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        const userExist = await User.findOne({ phoneNumber: phoneNumber });
        if (userExist) {
            return res.status(422).json({ error: "User already exists" });
        }
        const otp = generateOtp();
        const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); 
        const user=new User({phoneNumber,otp,otpExpiration});
        await user.save();
        //send otp using twillo or any other service
        await sendOtp(phoneNumber, otp);
        res.status(201).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
    }
 }

const verifyOtp = async (req, res) => {
    console.log("Reached");
    const { phoneNumber, otp,name,country } = req.body;
    if (!phoneNumber || !otp || !name || !country) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        const userExist = await User.findOne({ phoneNumber: phoneNumber, otp: otp, otpExpiration: { $gt: Date.now() } });
        if (!userExist) {
            return res.status(422).json({ error: "Invalid OTP" });
        }
        console.log(userExist);
        const token = await userExist.generateAuthToken();
        console.log("token:"+token);
        res.cookie("token", token, {
            expires:new Date('9999-12-31T23:59:59Z'),
            // httpOnly: true,
            sameSite: "none" ,
            secure: true,
        });
        res.status(201).json({ message: "User logged in successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}   

module.exports = {otp,verifyOtp};