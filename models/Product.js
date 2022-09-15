const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    options: [],
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Show",
      enum: ["Show", "Hide"],
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
