const mongoose = require('mongoose');
const Model = require('./base');

class Rider extends Model {}

const RiderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  coordinates: {
    x: Number,
    y: Number,
  },
}, {
  timestamps: true,
});

RiderSchema.loadClass(Rider);
module.exports = mongoose.model('Rider', RiderSchema);
