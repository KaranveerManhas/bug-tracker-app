const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const database = mongoose.connection;

database.on('error', console.error.bind("Error in connecting to database"));

database.once('open', () =>{
    console.log("Connected to MongoDB");
});

module.exports = database;