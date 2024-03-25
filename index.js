const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
const port = process.env.PORT;
const server = app.listen(port, '0.0.0.0',() => console.log(`Listening on port number ${port}`));
const configureSockets = require('./websocket');
const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const cors = require( 'cors' );
app.use(cors());
  


    
 
app.use("/api", require('./routes/api'));
app.get('/user', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
// app.get('/user2', function (req, res) {
//     res.sendFile(__dirname + '/index2.html');
// })
// app.get("/user3", (req, res) => {
//     res.sendFile(__dirname + '/index3.html');
// }
// );
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html');
}
);


configureSockets(server);