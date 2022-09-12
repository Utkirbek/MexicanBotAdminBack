const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      lng: {
        type: Number,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      }
    },
    comment: {
      type: String,
      required: false,
    },
    cart: [],
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order 
  
module.exports = Order;
