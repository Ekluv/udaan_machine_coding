import mongoose from "mongoose";

import BaseModel from './Base';
import { ICab } from './Cab';
import { IRider } from './Rider';

enum TripStatus {
  TRIP_REQUESTED = 'TRIP_REQUESTED',
  TRIP_ONGOING = 'TRIP_ONGOING',
  TRIP_COMPLETED = 'TRIP_COMPLETED',
}

export interface IBooking extends mongoose.Document {
  cabId: ICab['_id'],
  riderId: IRider['_id'];
  distance: number,
  amount: number,
  tripStatus?: TripStatus,
}

class Booking extends BaseModel {}

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
  	enum: Object.values(TripStatus),
  	default: TripStatus.TRIP_REQUESTED,
  }
}, {
  timestamps: true,
});

BookingSchema.loadClass(Booking);
export default mongoose.model<IBooking>('Booking', BookingSchema);
