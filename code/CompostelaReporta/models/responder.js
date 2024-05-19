const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responderSchema = new Schema({
  name: { type: String },
  telephone: { type: String },
});

module.exports = mongoose.model('Responder', responderSchema);
