const mongoose = require('mongoose');

const phoneToSocketIds = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    socketId: {
        type: String,
        required: true
    },
     
    
});
const SocketIds = mongoose.model('SOCKETIDS', phoneToSocketIds);

module.exports = SocketIds;