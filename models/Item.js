const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  available: Boolean
});

module.exports = mongoose.model('Item', itemSchema);
