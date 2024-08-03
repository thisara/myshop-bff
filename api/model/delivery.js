const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Delivery = new Schema(
        {
            deliveryAddress:{
                type: String
            },
            contactName:{
                type: String
            },
            contactNumber:{
                type:  String
            },
            emailAddress:{
                type:  String
            }
        },
        {
            collection:'delivery'
        }
    );

module.exports = mongoose.model('Delivery', Delivery);