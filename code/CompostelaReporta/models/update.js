const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateSchema = new Schema({
  date: { type: Date, default: Date.now }, // Automatico
  description: { type: String }, // Admin
  previousStatus: { type: String }, // Automatico
  newStatus: { type: String }, // Automatico
});

module.exports = updateSchema;
