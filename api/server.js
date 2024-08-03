const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/DB.js');
const orderRoutes = require('./route/orderRoutes');
const productRoutes = require('./route/productRoutes');
const orderItemRoutes = require('./route/orderItemRoutes');
const deliveryRoutes = require('./route/deliveryRoutes');

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, {useNewUrlParser: true}).then(
    () => {console.log('Database is connected')},
    err => {console.log('Cannot connect to the database ', err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/delivery',deliveryRoutes)

app.listen(PORT, function(){
    console.log('Server is running at port : ', PORT);
});