const Vehicle = require('../models/vehicleModel');

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark, status, parkingCharge, outTime} = req.body;

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Update the vehicle fields
    vehicle.remark = remark;
    vehicle.status = status;
    vehicle.parkingCharge = parkingCharge;
    vehicle.outTime = new Date();

   
    // Save the updated vehicle
    const updatedVehicle = await vehicle.save();

    res.json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCheckedOutVehicles = async (req, res) => {
  try {
    // Find the checked out vehicles
    const checkedOutVehicles = await Vehicle.find({ status: 'Vehicle Checked out' });

    res.json(checkedOutVehicles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  updateVehicle,
  getCheckedOutVehicles,
};
