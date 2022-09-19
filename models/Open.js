const mongoose = require("mongoose");

const openSchema = new mongoose.Schema({
  monday_open_time: {
    type: String,
    required: true,
  },
  monday_close_time: {
    type: String,
    required: true,
  },
  tuesday_open_time: {
    type: String,
    required: true,
  },
  tuesday_close_time: {
    type: String,
    required: true,
  },
  wednesday_open_time: {
    type: String,
    required: true,
  },
  wednesday_close_time: {
    type: String,
    required: true,
  },
  thursday_open_time: {
    type: String,
    required: true,
  },
  thursday_close_time: {
    type: String,
    required: true,
  },
  friday_open_time: {
    type: String,
    required: true,
  },
  friday_close_time: {
    type: String,
    required: true,
  },
  saturday_open_time: {
    type: String,
    required: false,
  },
  saturday_close_time: {
    type: String,
    required: false,
  },
  sunday_open_time: {
    type: String,
    required: false,
  },
  sunday_close_time: {
    type: String,
    required: false,
  },
});

const Open = mongoose.model("Open", openSchema);

module.exports = Open;
