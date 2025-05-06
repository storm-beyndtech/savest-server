const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Client Details
const clientDetailsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
});

// Schema for Package Details
const packageDetailsSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  length: { type: String, required: true },
  quantity: { type: String, required: true },
  weight: { type: String, required: true },
  width: { type: String, required: true },
});

// Schema for Shipping Updates
const shippingUpdateSchema = new Schema({
  status: { type: String, required: true, enum: ['Pending', 'In Transit', 'Delivered'] },
  location: { type: String, required: true },
  message: { type: String },
  time: {type: String},
});

// Main schema that combines the above schemas
const trackingSchema = new Schema(
  {
    clientDetails: clientDetailsSchema, 
    packageDetails: [packageDetailsSchema], 
    shippingUpdate: [shippingUpdateSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tracking', trackingSchema);
