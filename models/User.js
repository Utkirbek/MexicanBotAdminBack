const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    ID: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    chatid: {
      type: String,
      required: true,
      
    },
    phone: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["verified","pending", "blocked"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
