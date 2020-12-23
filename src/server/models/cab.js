const mongoose = require('mongoose');
const Model = require('./base');

class Cab extends Model {}

const CabSchema = new mongoose.Schema({
  driverName: {
    type: String,
  },
  available: {
  	type: Boolean,
  	default: true,
  },
  coordinates: {
    x: Number,
    y: Number,
  },
}, {
  timestamps: true,
});

CabSchema.loadClass(Cab);
module.exports = mongoose.model('Cab', CabSchema);
