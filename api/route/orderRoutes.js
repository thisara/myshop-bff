const express = require('express');
const orderRoutes = express.Router();

let Order = require('../model/order');

orderRoutes.route('/add').post(function(req, res){
    let order = new Order(req.body);
    
    order.save()
        .then(order => {
            console.log("Order added : " + JSON.stringify(order));
            res.status(200).json({'order':'order is added successfully', 'orderID' : order._id});
        })
        .catch(err => {
            console.log("Unable to add order : " + JSON.stringify(err));
            res.status(400).send('unable to save to database');
        });
    
});

orderRoutes.route('/').get(function(req,res){
    Order.find(function(err, orders){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            res.json(orders);
        }
    });
});

orderRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    Order.findById(id, function(err, order){
        if(err){
            console.log("Unable to edit the record : " + err);
            res.json(err);
        }else{
            res.json(order);
        }
        
    });
});

orderRoutes.route('/update/:id').post(function (req, res){
    Order.findById(req.params.id, function (err, order){
        if(!order){
            console.log("Unable to update order : " + err);
            res.status(404).send('Update failed, data not found : ' + req.params.id);
        }else{
            order.orderNumber = req.body.orderNumber;
            order.orderName = req.body.orderName;
            order.orderDateCreated = req.body.orderDateCreated;
            order.orderStatus = req.body.orderStatus;
            
            order.save().then(order => {
                res.json('Update record successfully : '+req.params.id);
            })
            .catch(err => {
                res.status(400).send('Unable to update the database');
            });
        }
    });
});

orderRoutes.route('/search/:text').get(function(req,res){

    var searchText = req.params.text;

    Order.find({orderName:searchText},function(err, orders){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            console.log('search for : ' + searchText + ' Orders : ' + orders);
            res.json(orders);
        }
    });

});

orderRoutes.route('/delete/:id').get(function (req, res){
    Order.findByIdAndRemove({_id: req.params.id}, function(err, order){
        if(err){
            console.log("Unable to delete record : ", err);
            res.json(err);
        } else{
            console.log("Record deleted successfully : " + JSON.stringify(order));
            res.json('Successfully removed');
        }
    });
});

module.exports = orderRoutes;