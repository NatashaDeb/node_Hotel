const mongoose = require('mongoose');
require('dotenv').config();
//Define the mongoDB connection URL
//const mongoURL = process.env.LOCAL_DB_URL;;
const mongoURL = process.env.ONLINE_DB_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the default connection maintained by mongoose
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});

db.on('error',(err)=>{
    console.error('MongoDB connection error',err);
});

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});

//export the database connection
module.exports =db;