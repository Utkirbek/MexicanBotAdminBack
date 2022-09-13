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
    cart: [
      
    ],

    address_name: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Processing', 'Delivered'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
