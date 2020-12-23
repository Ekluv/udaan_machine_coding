const mongoose = require('mongoose');
const Model = require('./base');

class Booking extends Model {}

const BookingSchema = new mongoose.Schema({
  cabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cab'
  },
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  },
  distance: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  tripStatus: {
  	type: String,
  	enum: ['TRIP_REQUESTED', 'TRIP_ONGOING', 'TRIP_COMPLETED'],
  	default: 'TRIP_REQUESTED',
  }
}, {
  timestamps: true,
});

BookingSchema.loadClass(Booking);
module.exports = mongoose.model('Booking', BookingSchema);
