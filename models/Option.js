const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
});

const Category = mongoose.model("Option", optionSchema);

module.exports = Category;
