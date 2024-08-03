const express = require('express');
const productRoutes = express.Router();

let Product = require('../model/product');

productRoutes.route('/add').post(function(req, res){
    let product = new Product(req.body);
    
    product.save()
        .then(product => {
            console.log("Product added : " + JSON.stringify(product));
            res.status(200).json({'product':'product is added successfully'});
        })
        .catch(err => {
            console.log("Unable to add product : " + JSON.stringify(err));
            res.status(400).send('unable to save to database');
        });
    
});

productRoutes.route('/').get(function(req,res){
    Product.find(function(err, products){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            res.json(products);
        }
    });
});

productRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        if(err){
            console.log("Unable to get the record : " + err);
            res.json(err);
        }else{
            res.json(product);
        }
        
    });
});

productRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        if(err){
            console.log("Unable to edit the record : " + err);
            res.json(err);
        }else{
            res.json(product);
        }
        
    });
});

productRoutes.route('/update/:id').post(function (req, res){
    Product.findById(req.params.id, function (err, product){
        if(!product){
            console.log("Unable to update product : " + err);
            res.status(404).send('Update failed, data not found : ' + req.params.id);
        }else{
            product.productNumber = req.body.productNumber;
            product.productName = req.body.productName;
            product.productCategory = req.body.productCategory;
            product.productUOM = req.body.productUOM;
            product.productUnitPrice = req.body.productUnitPrice;
            product.productCurrency = req.body.productCurrency;

            product.save().then(product => {
                res.json('Update record successfully : '+req.params.id);
            })
            .catch(err => {
                res.status(400).send('Unable to update the database');
            });
        }
    });
});

productRoutes.route('/search/:text').get(function(req,res){

    var searchText = req.params.text;

    Product.find({productName:searchText},function(err, products){
        if(err){
            console.log("Unable to get the object(s) : " + err);
            res.json(err);
        }else{
            console.log('search for : ' + searchText + ' Products : ' + products);
            res.json(products);
        }
    });

});

productRoutes.route('/delete/:id').get(function (req, res){
    Product.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err){
            console.log("Unable to delete record : ", err);
            res.json(err);
        } else{
            console.log("Record deleted successfully : " + JSON.stringify(product));
            res.json('Successfully removed');
        }
    });
});

module.exports = productRoutes;