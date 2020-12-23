import mongoose from 'mongoose';

import { ICab } from '../models/Cab';

const Cab = mongoose.model<ICab>('Cab');

interface CabDetails {
  driverName: string,
  coordinates: {
    x: number,
    y: number,
  },
  available?: boolean
}

export default class CabService {
	static registerCab({ driverName, coordinates, available = true }: CabDetails): Promise<ICab> {
		return Cab.create({
			driverName,
			coordinates,
			available,
		})
	}

	static async setAttributes(cabId: mongoose.ObjectId, attributes: Partial<ICab> = {}): Promise<ICab> {
		const cab = await Cab.findById(cabId);
		if (!cab) {
			throw new Error('Cab not found');
		}
		await cab.update({...attributes});
		return cab;
	}

	static updateCabLocation(cabId: mongoose.ObjectId, coordinates: { x: number, y: number }) {
		return this.setAttributes(cabId, { coordinates })
	}

	static setAvailability(cabId: mongoose.ObjectId, available: boolean) {
		return this.setAttributes(cabId, { available })
	}
}
