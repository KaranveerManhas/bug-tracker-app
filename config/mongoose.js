const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/issue-tracker-dev');

const database = mongoose.connection;

database.on('error', console.error.bind("Error in connecting to database"));

database.once('open', () =>{
    console.log("Connected to MongoDB");
});

module.exports = database;