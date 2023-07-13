// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   ID: { type: Number, required: false },
//   VehicleCat: { type: String, default: null },
//   CreationDate: { type: Date, default: Date.now }
// });
// module.exports = mongoose.model('Category', categorySchema);
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  serialNumber: { type: Number},
  VehicleCat: { type: String, default: null },
  CreationDate: { type: Date, default: Date.now }
});

// Add a pre 'save' middleware to generate the serial number
categorySchema.pre('save', function (next) {
  const model = this.constructor;
  model.findOne({}, {}, { sort: { serialNumber: -1 } })
    .then((lastDocument) => {
      if (lastDocument) {
        this.serialNumber = lastDocument.serialNumber + 1;
      } else {
        this.serialNumber = 1; // Set the serial number to 1 for the first document
      }
      next();
    })
    .catch(next);
});
categorySchema.set('toJSON', {
  transform: function (doc, ret, options) {
    return {
      serialNumber: ret.serialNumber,
      VehicleCat: ret.VehicleCat,
      _id: ret._id,
      CreationDate: ret.CreationDate,
      __v: ret.__v
    };
  }
});
// Add a post 'remove' middleware to adjust the serial numbers after deletion
categorySchema.post('remove', function (doc, next) {
  const model = this.constructor;
  model.updateMany({ serialNumber: { $gt: doc.serialNumber } }, { $inc: { serialNumber: -1 } })
    .then(() => next())
    .catch(next);
});

module.exports = mongoose.model('Category', categorySchema);
