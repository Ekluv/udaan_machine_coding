const mongoose = require('mongoose')

const Cab = mongoose.model('Cab');

class CabService {
	static registerCab({ driverName, coordinates, available = true }) {
		return Cab.create({
			driverName,
			coordinates,
			available,
		})
	}

	static async setAttributes(cabId, attributes = {}) {
		const cab = await Cab.findById(cabId);
		if (!cab) {
			throw new Error('Cab not found');
		}
		await cab.update(attributes);
		return cab;
	}

	static updateCabLocation(cabId, coordinates) {
		return this.setAttributes(cabId, { coordinates })
	}

	static setAvailability(cabId, available) {
		return this.setAttributes(cabId, { available })
	}
}

module.exports = CabService;
