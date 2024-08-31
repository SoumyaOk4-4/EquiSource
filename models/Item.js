const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  available: Boolean
});

module.exports = mongoose.model('Item', itemSchema);
