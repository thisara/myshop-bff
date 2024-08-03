const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema(
    {
        productNumber:{
            type: String
        },
        productName:{
            type: String
        },
        productCategory:{
            type: String
        },
        productUOM:{
            type: String
        },
        productUnitPrice:{
            type: Number
        },
        productCurrency:{
            type: String
        }
    },
    {
            collection:'product'
    });

module.exports = mongoose.model('Product', Product);