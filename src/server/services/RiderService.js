const mongoose = require('mongoose')

const Rider = mongoose.model('Rider');

class RiderService {
	static registerRider({ name, coordinates }) {
		return Rider.create({
			name,
			coordinates
		})
	}
}

module.exports = RiderService;
