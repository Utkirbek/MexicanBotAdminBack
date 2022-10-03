const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: false,
    },
    ID: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    chatid: {
      type: Number,
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
    isChecked: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Done"],
    },
    status: {
      type: String,
      required: true,
      default: "blocked",
      enum: ["verified", "blocked"],
    },
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        sender: {
          type: String,
          enum: ["user", "admin"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.methods.addMessage = function (message, sender) {
  this.messages.push({ message, sender });
  return this.save();
};


const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
