const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
});

const Category = mongoose.model("Option", optionSchema);

module.exports = Category;
