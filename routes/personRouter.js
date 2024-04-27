const express = require('express');
const router = express.Router();
const Person = require('../models/person');


/* old method
app.post('/person', (res, res)=>{
    const data = req.body; //Assuming the request body contains the person data
  //Create a new Person document using the Mongoose Model
  const newPerson = new Person(data); //instead of writing below directly pass data
  //   newPerson.name = data.name;
  //   newPerson.age = data.age;
  //   newPerson.mobile = data.mobile;
  //   newPerson.email = data.email;
  //   newPerson.address = data.address;
  //   newPerson.salary = data.salary;
  //This method is depricated bo one uses callback now a days
    Save the new person to the database
    newPerson.save((error, savedPerson)=>{ //save has a callback function error and person as parameters
      if(error){
          console.log('Error Saving person', error);
          res.status(500).json({error: 'Internal Server Error'});
      }else{
          console.log('Data Saved Sucessfully');
          res.status(200).json(savedPerson);
      }
      
    })
  
})
*/

// POST route to  add a person
router.post('/', async(req, res)=>{
    try{
        const data = req.body ; //assuming the request body contains the person data

        //create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const savedPerson= await newPerson.save(); //response comming after loading of DB

        console.log('person data saved');
        res.status(200).json(savedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.get('/', async(req, res)=>{
    try{
        const data = await Person.find() ; //using Person All records present in person will be fetched
        console.log("Data Fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType', async(req, res)=>{
    try{
        const workType =  req.params.workType;//extract work type from url parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){//to validte correct work type
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter
        const updatedPerson = req.body; //Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
            new: true, //Return the updated document
            runValidators: true, //Run Mongoose validations
        });

        if(!response){
            return res.status(404).json({error: 'Person Not found'});
        }
    
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person Not Found'})
        }

        console.log('data Deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports = router;