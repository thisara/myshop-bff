const express = require('express');
const orderItemRoutes = express.Router();

let OrderItem = require('../model/orderItem');

orderItemRoutes.route('/add').post(function(req, res){
    let orderItem = new OrderItem(req.body);

    //orderItem.quantity = req.body[0].quantity

    console.log('odr : ' + JSON.stringify(orderItem));
    console.log('req : ' + JSON.stringify(req.body));
/*
    orderItem.quantity = req.body.quantity;
    orderItem.orderTotal = req.body.orderTotal;
    orderItem.product.push(req.body.product);
    orderItem.order.push(req.body.order);
*/
    orderItem.save()
        .then(orderItem => {
            console.log("OrderItem added : " + JSON.stringify(orderItem));
            res.status(200).json({'orderItem':'orderItem is added successfully'});
        })
        .catch(err => {
            console.log("Unable to add orderItem : " + JSON.stringify(err));
            res.status(400).send('unable to save to database');
        });
    
});

orderItemRoutes.route('/').get(function(req,res){
    OrderItem.find(function(err, orderItems){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            res.json(orderItems);
        }
    });
});

orderItemRoutes.route('/order/:id').get(function(req,res){

    var orderID = req.params.id;

    OrderItem.find({order:orderID},function(err, orderItems){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            console.log('search by order : ' + orderID + ' OrderItems : ' + orderItems);
            res.json(orderItems);
        }
    });

});

orderItemRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    OrderItem.findById(id, function(err, orderItem){
        if(err){
            console.log("Unable to edit the record : " + err);
            res.json(err);
        }else{
            res.json(orderItem);
        }
        
    });
});

orderItemRoutes.route('/update/:id').post(function (req, res){
    OrderItem.findById(req.params.id, function (err, orderItem){
        if(!orderItem){
            console.log("Unable to update orderItem : " + err);
            res.status(404).send('Update failed, data not found : ' + req.params.id);
        }else{
            orderItem.orderItemQuantity = req.body.orderItemQuantity;
            orderItem.lineTotal = req.body.lineTotal;
            orderItem.product.push(req.body.productObjectId);
            orderItem.order.push(req.body.orderObjectId)

            orderItem.save().then(orderItem => {
                res.json('Update record successfully : '+req.params.id);
            })
            .catch(err => {
                res.status(400).send('Unable to update the database');
            });
        }
    });
});

orderItemRoutes.route('/search/:text').get(function(req,res){

    var searchText = req.params.text;

    OrderItem.find({orderItemName:searchText},function(err, orderItems){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            console.log('search for : ' + searchText + ' OrderItems : ' + orderItems);
            res.json(orderItems);
        }
    });

});

orderItemRoutes.route('/delete/:id').get(function (req, res){
    OrderItem.findByIdAndRemove({_id: req.params.id}, function(err, orderItem){
        if(err){
            console.log("Unable to delete record : ", err);
            res.json(err);
        } else{
            console.log("Record deleted successfully : " + JSON.stringify(orderItem));
            res.json('Successfully removed');
        }
    });
});

module.exports = orderItemRoutes;