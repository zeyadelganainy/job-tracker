const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => crypto.randomUUID()
  },
  userId: {
    type: String,
    required: true,
    ref: 'User' // connects to the User model (UUID string)
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Offer', 'Rejected', 'Accepted'],
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
