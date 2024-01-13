const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOtp = async (phoneNumber, otp) => {
    
    const msg = await client.messages
        .create({
            body: `Your OTP for login is ${otp} \n Please do not share it with anyone `,
            from: '+12058609168',
            to: `+91${phoneNumber}`
        });
    console.log(msg.sid);
}
module.exports = sendOtp;