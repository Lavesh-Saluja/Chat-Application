const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //array of user phone numbers
    users: [
        {
            phoneNumber: {
                type: String,//phone number
                ref: 'User',
                required: true
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    //array of admin phone numbers
    admins: [
        {
            phoneNumber: {
                type: String,//phone number
                ref: 'User',
                required: true
            }
        }
    ]

});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
