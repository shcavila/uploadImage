//modules
const express = require('express');
const itemRoute = express.Router();
const mongoose = require('mongoose');



// models
const grocery = require('../model/shop');


 
// SET STORAGE


// itemRoute.route('/create',upload.single('photo')).post((req,res) => {
//     const file = req.body   ;
//     console.log(file)
//     console.log('bla')
//     var items = new grocery(req.body)
//     //items.save()
//     // .then(() => {
//     //     res.status(200).json({message : "successfully saved"})
//     // })
//     // .catch(err => {
//     //    res.status(400).json({message: err.message})
//     // });
//     res.send(file)
// })

itemRoute.route('/retrieve/all').post((req,res) => {
    grocery.find()
    .then((data) => {
        res.status(200).json({ data: data });
    })
    .catch(err => {
        res.status(400).json({message : err.message});
    });
})





module.exports = itemRoute;



