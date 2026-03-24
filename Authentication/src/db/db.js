const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully!");
    }
    catch(err) {
        console.log("Connection error is: ", err);
    }
}


module.exports = connectDB;