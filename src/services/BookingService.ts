import mongoose from 'mongoose';

import { IBooking } from '../models/Booking';
import { ICab } from '../models/Cab';
import { IRider } from '../models/Rider';

const Booking = mongoose.model<IBooking>('Booking');
const Cab = mongoose.model<ICab>('Cab');
const Rider = mongoose.model<IRider>('Rider');

type coordinates = { x: number, y: number };

export default class BookingService {
	static calculateDistance(coordinates1: coordinates, coordinates2: coordinates): number {
		const { x: x1, y: y1 } = coordinates1;
		const { x: x2, y: y2 } = coordinates2;
		const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		return Math.abs(distance);
	}

	static async bookCab(riderId: mongoose.ObjectId) {
		const rider = await Rider.findById(riderId);
		if (!rider) {
			// throw new Error('rider not available');
			console.log('rider not available');
			return;
    }
		const cabs = await Cab.find({ available: true });
		let booking: IBooking;
		let closestCab: {
      distance: number,
      cab: ICab | null
    } = {
			distance: Number.MAX_VALUE,
			cab: null,
		};
		for (const cab of cabs) {
			const distance = BookingService.calculateDistance(
				rider.coordinates,
				cab.coordinates,
			);

			if (distance < 100) {
				if (closestCab.distance > distance) {
					closestCab = {
						distance,
						cab,
					};
				}
			}
		}
		if (closestCab.cab) {
			booking = await Booking.create({
				cabId: closestCab.cab.id,
				riderId: rider.id,
				distance: closestCab.distance,
				amount: 10,
			});
			await closestCab.cab.updateOne({ available: false });
			return booking;
		} else {
			console.log('cab not available');
		}

	}

	static findAllBookings(riderId: mongoose.ObjectId) {
		return Booking.find({ riderId }).populate('cabId');
	}

	static async endTrip(bookingId: IBooking['_id']) {
		const booking = await Booking.findById(bookingId);
		if (!booking) {
			console.log('no booking');
			return;
		}
		const cab = await Cab.findById(booking.cabId);
		await cab!.updateOne({ available: true });
	}
}
