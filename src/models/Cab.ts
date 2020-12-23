import mongoose from "mongoose";

import BaseModel from './Base';

type modelAttributes<T> = {
  [P in keyof T]: T[P];
}


export interface ICab extends mongoose.Document {
  driverName: string,
  available: boolean,
  coordinates: {
    x: number,
    y: number,
  }
}

class Cab extends BaseModel {}

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
export default mongoose.model<ICab>('Cab', CabSchema);
