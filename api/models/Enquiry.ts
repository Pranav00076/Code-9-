import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Enquiry = mongoose.model('Enquiry', EnquirySchema);
