const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pointSchema = require('./point');
const updateSchema = require('./update');

/**
 *  Módulo para creación do Schema da colección Issues para a nosa BBDD
 *  Incluimos pointSchema (para a localización) e updateSchema (array de distintas actualizacións)
 */
const issueSchema = new Schema({
  description: { type: String, required: true },
  location: { type: pointSchema, required: true },
  address: { type: String },
  issueType: { type: String, required: true },
  status: { type: String, default: 'new' }, //  Admin - Para cambiar dun estado a outro
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }, //  Actualiza cando admin cambia un estado
  priority: { type: Number }, // Admin
  reporterHash: { type: String, required: true },
  responder: { type: Schema.Types.ObjectId, ref: 'Responder' }, // Admin
  parentIssue: { type: Schema.Types.ObjectId, ref: 'Issue' }, // Admin
  updates: [updateSchema],
});

module.exports = mongoose.model('Issue', issueSchema);
