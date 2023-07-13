const Vehicle = require('../models/vehicleModel');

const vehicleController = {
  getAllVehicles: (req, res) => {
    Vehicle.find()
      .then(vehicles => {
        res.json(vehicles);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  },
  getVehiclebymob: (req, res) => {
    const { Email,ownerContactNumber } = req.query;

    Vehicle.find({ Email,ownerContactNumber })
      .then(vehicles => {
        res.json(vehicles);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  },

  createVehicle: async (req, res) => {
    try {
      const {
        vehicleCategory,
        vehicleCompanyName,
        registrationNumber,
        ownerName,
        ownerContactNumber,
        remark,
        status,
      } = req.body;

      // Set the initial status as 'Parked' when creating a new vehicle
      const vehicle = new Vehicle({
        vehicleCategory,
        vehicleCompanyName,
        registrationNumber,
        ownerName,
        ownerContactNumber,
        remark,
        status: 'Parked'
      });

      await vehicle.save();

      res.status(201).json(vehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getVehicleById: (req, res) => {
    const { id } = req.params;

    Vehicle.findById(id)
      .then(vehicle => {
        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Add the vehicle status to the response
        const { status, ...vehicleData } = vehicle.toObject();
        const vehicleWithStatus = {
          ...vehicleData,
          // The status will be determined dynamically based on the value in the database
          status: status === 'Checked Out' ? 'Vehicle Checked out' : status
        };

        res.json(vehicleWithStatus);
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  },

  deleteVehicle: (req, res) => {
    const { id } = req.params;

    Vehicle.findByIdAndRemove(id)
      .then(removedVehicle => {
        if (!removedVehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error' });
      });
  },

  getVehiclesByDateRange: async (req, res) => {
    try {
      const { fromDate, toDate } = req.query;

      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      toDateObj.setDate(toDateObj.getDate() + 1); // Increment toDate by 1 day to include the entire day

      const allVehicles = await Vehicle.find();

      const vehiclesInRange = filterVehiclesByDateTime(allVehicles, fromDateObj, toDateObj);

      res.json(vehiclesInRange);
    } catch (error) {
      console.error('Error in getVehiclesByDateRange:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

function filterVehiclesByDateTime(vehicles, fromDate, toDate) {
  return vehicles.filter(vehicle => {
    const inTime = new Date(vehicle.inTime);
    return inTime >= fromDate && inTime < toDate;
  });
}

module.exports = vehicleController;
