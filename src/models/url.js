const mongoose = require('mongoose');

const URLSchema = mongoose.Schema({
  urlOrigin: String,
  shortenUrl: String,
});

module.exports = mongoose.model('Url', URLSchema);
