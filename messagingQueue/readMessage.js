const amqp = require('amqplib');

async function readMessage(queueName) {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  // Ensure the queue exists, and create it if not
  await channel.assertQueue(queueName);
  console.log("Queue", queueName);
  const queueInfo = await channel.checkQueue(queueName);
  let remainingMessages = queueInfo.messageCount;
    if(remainingMessages==0){
        return [];
    }
  const messages = [];

  // Wrap the consume operation in a promise
  const consumePromise = new Promise((resolve) => {
    // Consume messages from the queue
    channel.consume(queueName, (message) => {
      if (message !== null) {
        // Store the message in the array
        messages.push(message.content.toString());
        console.log(`Received message: ${message.content.toString()}`);

        // Acknowledge the message to remove it from the queue
        channel.ack(message);

        // Decrease the remaining message count
        remainingMessages--;

        // Check if all messages are consumed
        if (remainingMessages === 0) {
          // Resolve the promise to indicate completion
          resolve();
        }
      }
    });
  });

  // Wait for the consumePromise to complete
  await consumePromise;

  // Close the channel and connection
  await channel.close();
  await connection.close();

  // Return the array of messages
  console.log("Messages", messages);
  return messages;
}

module.exports = readMessage;
