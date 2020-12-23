const mongoose = require('mongoose');

const Booking = mongoose.model('Booking');
const Cab = mongoose.model('Cab');
const Rider = mongoose.model('Rider');

const CabService = require('./CabService');

class BookingService {
	static calculateDistance(coordinates1, coordinates2) {
		// sqrt((x1-x2)^2 + (y1-y2)^2)
		const { x: x1, y: y1 } = coordinates1;
		const { x: x2, y: y2 } = coordinates2;
		const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		return Math.abs(distance);
	}

	static async bookCab(riderId) {
		const rider = await Rider.findById(riderId);
		if (!rider) {
			// throw new Error('rider not available');
			console.log('rider not available');
			return;
		}
		const cabs = await Cab.find({ available: true });
		let booking;
		let closestCab = {
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
				cabId: cab.id,
				riderId: rider.id,
				distance,
				amount: 10,
			});
			await cab.updateOne({ available: false });
			return booking;
		} else {
			console.log('cab not available');
		}

	}

	static findAllBookings(riderId) {
		return Booking.find({ riderId }).populate('cabId');
	}

	static async endTrip(bookingId) {
		const booking = await Booking.findById(bookingId);
		if (!booking) {
			console.log('no booking');
			return;
		}
		const cab = await Cab.findById(booking.cabId);
		await cab.updateOne({ available: true });
	}
}

module.exports = BookingService;
