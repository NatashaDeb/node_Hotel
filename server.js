const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person')
const MenuItem = require('./models/menuItem');
const bodyParser = require('body-parser');
require('dotenv').config(); //to inform server dotenv file is present and from there we will be using some private variables 

app.use(bodyParser.json()); //its for json data which will be parsed automatically to object and will be stored in req.body

app.get('/', function (req, res) { //Creating a Route with Express.js
  res.send('NodeJS Server is running with MongoDB with the help of mongoose');

})

//Import the router files
const personRoutes = require('./routes/personRouter');
const menuItemsRoutes = require('./routes/menuRouter')
//use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemsRoutes);

const PORT = process.env.PORT || 3000; //if port value is present use that else use 3000

app.listen(PORT, ()=>{
    console.log("Server is Running");
})