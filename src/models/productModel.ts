import mongoose from 'mongoose';
import validator from 'validator';

const locationSchema = new mongoose.Schema({
  description: String,
  type: String,
  coordinates: [Number],
  day: Number,
});
const tourSchema = new mongoose.Schema({
  startLocation: {
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    coordinates: [Number],
    address: String,
  },
  ratingsAverage: Number,
  ratingsQuantity: Number,
  images: [String],
  startDates: [Date],
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
  duration: {
    type: Number,
  },
  maxGroupSize: Number,
  difficulty: String,
  guides: [String],
  price: Number,
  summary: String,
  description: String,
  imageCover: String,
  locations: [locationSchema],
});

const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
