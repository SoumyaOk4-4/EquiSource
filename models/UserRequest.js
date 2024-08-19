const mongoose = require('mongoose');

const userRequestSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  productName: String
});

module.exports = mongoose.model('UserRequest', userRequestSchema);
