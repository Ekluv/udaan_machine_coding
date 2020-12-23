import mongoose from 'mongoose';
import BaseModel from './Base';

export interface IRider extends mongoose.Document {
  name: string,
  coordinates: {
    x: number,
    y: number,
  }
}

class Rider extends BaseModel {}

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
export default mongoose.model<IRider>('Rider', RiderSchema);
