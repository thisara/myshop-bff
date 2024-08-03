const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderItem = new Schema({
    quantity : Number,
    lineTotal : Number,
    product : [
        {type:Schema.Types.ObjectId, ref: 'Product'}
    ],
    order : [
        {type:Schema.Types.ObjectId, ref: 'Order'}
    ],
    productWhenAddToCart : {},
    },
    {
        collection:'order_item'
    }
);

module.exports = mongoose.model('OrderItem', OrderItem);