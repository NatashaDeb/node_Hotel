const mongoose = require('mongoose');

//Define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotel';
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