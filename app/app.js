const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const adminRoutes = require('../routes/adminRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const reguserRoutes = require('../routes/reguserRoutes');
const vehicleRoutes = require('../routes/vehicleRoutes');
const checkoutRoutes =  require('../routes/vehicleRoutes');
const morgan = require('morgan')

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Define your routes
app.use('/admin', adminRoutes);
app.use('/category', categoryRoutes);
app.use('/reguser', reguserRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/vehicle',checkoutRoutes);



module.exports = app;
