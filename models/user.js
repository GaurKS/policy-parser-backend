const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    objectId: {
      type: String,
      required: true
    },
    name: {
        type: String,
        trim: true,
        max: 40
    },
    policyUrl: {
      type: String,
      required: true
    },
    policyNo: {
      type: String
    },
    review: {
      type: String,
      required: true,
      default: "PENDING"
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String
    },
  },
  { timestamps: true },
  { strict: false },
);

module.exports = mongoose.model('User', userSchema);