import mongoose from 'mongoose';

const DB_HOST = 'mongodb://127.0.0.1:27017/'
const DB_NAME = 'cabbooking'

mongoose.connect(DB_HOST + DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

import './models';

const Booking = mongoose.model('Booking');
const Cab = mongoose.model('Cab');
const Rider = mongoose.model('Rider');

import CabService from './services/CabService';
import BookingService from './services/BookingService';
import RiderService from './services/RiderService'


async function cleadDb() {
  const models = [Booking, Cab, Rider];
  return Promise.all(models.map(m => m.deleteMany()));
}

async function main() {
  await cleadDb();
  // api name, coordi -
  const rider = await RiderService.registerRider({ name: 'ekluv', coordinates: { x: 10, y: 10} });
  console.log({ rider });
  const rider2 = await RiderService.registerRider({ name: 'harshit', coordinates: { x: 10, y: 10} });

  const cab = await CabService.registerCab({ driverName: 'driver', coordinates: { x: 30, y: 20 }});
  const cab2 = await CabService.registerCab({ driverName: 'driver', coordinates: { x: 30, y: 20 }});

  console.log({ cab });

  const booking = await BookingService.bookCab(rider._id);
  console.log({ booking });

  // await BookingService.endTrip(booking.id);

  const booking2 = await BookingService.bookCab(rider._id);
   console.log({ booking2 });

  const riderBookings = await BookingService.findAllBookings(rider._id);
  console.log({ riderBookings })
}

main();