const mongoose = require('mongoose');

const userRequestSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  itemName: String
});

module.exports = mongoose.model('UserRequest', userRequestSchema);
