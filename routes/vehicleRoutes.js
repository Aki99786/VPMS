const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const vehicleCheckout = require('../controllers/vehicleCheckout');
// Vehicle routes
router.get('/', vehicleController.getAllVehicles);
router.get('/mob', vehicleController.getVehiclebymob);
router.get('/search/:id', vehicleController.getVehicleById);
router.post('/create', vehicleController.createVehicle);
router.put('/update/:id', vehicleCheckout.updateVehicle);
router.delete('/delete/:id', vehicleController.deleteVehicle);
router.get('/checked-out', vehicleCheckout.getCheckedOutVehicles);



module.exports = router;
