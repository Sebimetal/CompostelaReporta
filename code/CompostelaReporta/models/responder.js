const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  Módulo para creación do Schema user para crear a nosa colección Responders na BBDD */

const responderSchema = new Schema({
  name: { type: String },
  telephone: { type: String },
});

module.exports = mongoose.model('Responder', responderSchema);
