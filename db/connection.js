const mongoose = require("mongoose");
const url = process.env.url;
mongoose.connect(url, {
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log(err);
});