const express = require('express');
const deliveryRoutes = express.Router();

let Delivery = require('../model/delivery');

deliveryRoutes.route('/add').post(function(req, res){
    let delivery = new Delivery(req.body);
    
    delivery.save()
        .then(delivery => {
            console.log("Delivery added : " + JSON.stringify(delivery));
            res.status(200).json({'delivery':'delivery is added successfully', 'deliveryID' : delivery._id});
        })
        .catch(err => {
            console.log("Unable to add delivery : " + JSON.stringify(err));
            res.status(400).send('unable to save to database');
        });
    
});

deliveryRoutes.route('/').get(function(req,res){
    Delivery.find(function(err, deliverys){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            res.json(deliverys);
        }
    });
});

deliveryRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Delivery.findById(id, function(err, delivery){
        if(err){
            console.log("Unable to edit the record : " + err);
            res.json(err);
        }else{
            res.json(delivery);
        }
        
    });
});

deliveryRoutes.route('/update/:id').post(function (req, res){
    Delivery.findById(req.params.id, function (err, delivery){
        if(!delivery){
            console.log("Unable to update delivery : " + err);
            res.status(404).send('Update failed, data not found : ' + req.params.id);
        }else{
            delivery.deliveryNumber = req.body.deliveryNumber;
            delivery.deliveryName = req.body.deliveryName;
            delivery.deliveryDateCreated = req.body.deliveryDateCreated;

            delivery.save().then(delivery => {
                res.json('Update record successfully : '+req.params.id);
            })
            .catch(err => {
                res.status(400).send('Unable to update the database');
            });
        }
    });
});

deliveryRoutes.route('/search/:text').get(function(req,res){

    var searchText = req.params.text;

    Delivery.find({deliveryName:searchText},function(err, deliverys){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            console.log('search for : ' + searchText + ' Deliverys : ' + deliverys);
            res.json(deliverys);
        }
    });

});

deliveryRoutes.route('/delete/:id').get(function (req, res){
    Delivery.findByIdAndRemove({_id: req.params.id}, function(err, delivery){
        if(err){
            console.log("Unable to delete record : ", err);
            res.json(err);
        } else{
            console.log("Record deleted successfully : " + JSON.stringify(delivery));
            res.json('Successfully removed');
        }
    });
});

module.exports = deliveryRoutes;