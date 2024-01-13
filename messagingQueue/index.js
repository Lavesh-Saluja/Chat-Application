const amqp = require('amqplib');

//publisher
const connect = async (message,phoneNumber) => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue(phoneNumber+"");
        console.log("Message",JSON.stringify({message,phoneNumber}));
        channel.sendToQueue(phoneNumber, Buffer.from(JSON.stringify({message})));
        console.log("Message enqueued successfully");

        
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect ;
