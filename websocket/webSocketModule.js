const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const messageQueue=require("../messagingQueue/index");
const readMessages=require("../messagingQueue/readMessage");

class webSocketModule{
    constructor() {
        this.wss = new WebSocket.Server({ noServer: true })
        this.clients=new Map();
    }

    async authorizeAndConnect(server) {
        const wss = getWebSocketModule().wss;
        server.on('upgrade', async (req, socket, head) => {
         console.log("Upgrade");
        // socket.on('error', onSocketPreError);
         //verify cookie sent in authorization headers using jwt
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        
        const token = url.searchParams.get('authorization');


        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, phoneNumber: verifyToken.phoneNumber,token });
        let phoneNumber = verifyToken.phoneNumber;
        if (!rootUser) {
             socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
            return;
        }
        console.log("Consuming");
        // Fetch me
       
        wss.handleUpgrade(req, socket, head, (ws) => { 
            // socket.removeListener('error', onSocketPreError);
                wss.emit('connection', ws, phoneNumber,req);
        });
    } catch (err) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
    }
    });
   


    wss.on('connection', async(ws, phoneNumber,req) => {
        ws.isAlive = true;
        console.log("Connected");
         this.clients.set(phoneNumber,ws);
        ws.send("Client connected");

        // Receiving message
        ws.on('message', function incoming(message) {
            console.log(JSON.parse(message));
  });
        ws.on('close', () => {
            ws.isAlive = false;
            this.clients.set(phoneNumber,null);
                console.log(phoneNumber+' Client disconnected');
        })
       
    })
    }
    
     async sendMessage(message,ws,receiver) {
         //chevk if user is online or not
        //  console.log("Sending message:",ws);
         if (!!ws && ws.isAlive) {
                console.log("Sending message");
             ws.send(JSON.stringify(message));
             return true; //double tick
         } else {
             //Do Something if user is offline?
             //Use RabbitMQ or any other message broker to store message and send it when user comes online
             //How to use Rabbit MQ
             //1. Install RabbitMQ
             //2. Create a queue for each user
             //3. Store message in +
             //4. Send message from queue when user comes online
             console.log("msg",message);
             await messageQueue(message,receiver);
             console.log("User is offline");
             return false; //single tick
         }
     }
    
  
    
    async checkConnection(phoneNumber) {
        const ws = this.clients.get(phoneNumber);
        console.log(ws.isAlive);
    }
}
let instance = null;
const getWebSocketModule = () => {
    if (!instance) {
        instance = new webSocketModule();
    }
    return instance;
}



module.exports = getWebSocketModule;