import mongoose from 'mongoose';

import { IRider } from '../models/Rider';

const Rider = mongoose.model<IRider>('Rider');

interface RiderDetails {
  name: string,
  coordinates: { x: number, y: number }
}
export default class RiderService {
	static registerRider({ name, coordinates }: RiderDetails): Promise<IRider> {
		return Rider.create({
			name,
			coordinates
		})
	}
}