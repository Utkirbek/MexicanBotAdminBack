const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },
  
  status: {
    type: String,
    enum: ['Show', 'Hide'],
    default: 'Show',
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
