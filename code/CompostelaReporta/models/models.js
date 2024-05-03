const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema para objeto Responder/Responsable de gestionar la incidencia
const responderSchema = new mongoose.Schema({
  name: { type: String },
  telephone: { type: String },
});

// Schema para referenciar tipo de dato geoJSON
const pointSchema = new mongoose.Schema({
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

// Schema para objeto Update/Modificación de incidencia
const updateSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  description: { type: String },
  previousStatus: { type: String },
  newStatus: { type: String },
});

// Schema para incidencia, incorpora el pointSchema para location y updateSchema como array de updates
const issueSchema = new Schema({
  description: { type: String, required: true },
  location: { type: pointSchema, required: true },
  issueType: { type: String, required: true },
  status: { type: String, default: 'new' },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  priority: { type: Number },
  reporterHash: { type: String, required: true },
  responder: { type: Schema.Types.ObjectId, ref: 'Responder' },
  parentIssue: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  updates: [updateSchema],
});

const Issue = mongoose.model('Issue', issueSchema);
const Responder = mongoose.model('Responder', responderSchema);
const Update = mongoose.model('Update', updateSchema);

module.exports = { Issue, Responder, Update };
