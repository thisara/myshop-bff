const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema(
        {
            orderNumber:{
                type: String
            },
            orderName:{
                type: String
            },
            orderDeliveryCharges:{
                type:  Number
            },
            orderTotal:{
                type:  Number
            },
            orderGrandTotal:{
                type:  Number
            },
            orderDateCreated:{
                type: Date
            
            },
            billingAddress:{
                type: String
            },
            paymentMethod:{
                type: String
            },
            orderStatus:{
                type: String
            },
            delivery : [
                {type:Schema.Types.ObjectId, ref: 'Delivery'}
            ]
        },
        {
            collection:'order'
        }
    );

module.exports = mongoose.model('Order', Order);