const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*  Módulo para creación do Schema  point para usar na localización das incidencias */
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

module.exports = pointSchema;
