const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating :{
    type: Number,
    required: false,
  },

  icon: {
    type: String,
    required: false,
  },
  
  status: {
    type: String,
    enum: ['Show', 'Hide'],
    default: 'Show',
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
