const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person')
const MenuItem = require('./models/menuItem');
const bodyParser = require('body-parser');

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

app.listen(3000, ()=>{
    console.log("Server is Running");
})