const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');


router.post('/', async (req, res) =>{
    try{
        const data = req.body;
        const newMenuItem = new MenuItem(data);

        const savedMenuItem = await newMenuItem.save();

        console.log("menu item data saved");
        res.status(200).json(savedMenuItem);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/', async(req, res) =>{
   try{
        const data = await MenuItem.find();
        console.log("menu items data fetched");
        res.status(200).json(data);
   }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error'});
   }
});

router.get('/:tasteType', async(req, res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'bitter' || tasteType == 'sour'){
            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json('Such Taste donot exist')
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req, res)=>{
    try{
        const menuItemID = req.params.id;
        const updatedMenu = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemID, updatedMenu,{
            new: true,
            runValidators: true
        })

        if(!response){
           return res.status(404).json({error:'Menu Item Not Found'});
        }

        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
});

router.delete('/:id', async(req, res)=>{
    try{
        const menuItemID = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuItemID);

        if(!response){
            return res.status(404).json({error: 'Menu Item doesnt Exist'})
        }

        console.log("Data deleted");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;
