const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  Módulo para creación do Schema update para usar na localización das incidencias */

const updateSchema = new Schema({
  date: { type: Date, default: Date.now }, // Automatico
  description: { type: String }, // Admin
  previousStatus: { type: String }, // Automatico
  newStatus: { type: String }, // Automatico
});

module.exports = updateSchema;
