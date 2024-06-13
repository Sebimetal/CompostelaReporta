const { Responder } = require('../models/index.js');

/** Módulo encargado das funcionalidades relacionadas cos responsables */

/** Recollemos da BBDD tódolos responsables */
async function findAllResponders(req, res) {
  try {
    const responders = await Responder.find();
    res.status(200).json(responders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
/** Recollemos da BBDD o responsable por ID */
async function findOneResponder(req, res) {
  try {
    const responder = await Responder.findById(req.params.id);
    if (!responder) {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }
    res.status(200).json(responder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/** Función para crear responsable */
async function createResponder(req, res) {
  try {
    const { name, telephone } = req.body;
    const newResponder = new Responder({ name, telephone });
    await Responder.create(newResponder);
    res.status(201).json(newResponder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/** Función para asignar o responsable á incidencia á hora de creaka */
async function getResponderByIssueType(issueType) {
  try {
    const issueTypeResponsibles = {
      Alcantarillado: 'Departamento de Obras Publicas',
      'Alumeado público': 'Departamento de Servizos Publicos',
      'Limpeza Viaria': 'Departamento de Servizos Publicos',
      'Medio Ambiente': 'Departamento de Medio Ambiente',
      'Medio Viario': 'Departamento de Obras Publicas',
      'Semáforos e sinais': 'Policia Local',
      'Parques e Xardíns': 'Departamento de Medio Ambiente',
      'Incendios e Accidentes': 'Bombeiros',
      Outros: 'Concello',
    };
    const responderName = issueTypeResponsibles[issueType].trim();
    const responder = await Responder.findOne({ name: responderName });
    if (!responder) {
      throw new Error('No hay Responders disponibles.');
    }
    return responder;
  } catch (error) {
    throw new Error(`Error al obtener el Responder: ${error.message}`);
  }
}
module.exports = {
  findAllResponders,
  createResponder,
  findOneResponder,
  getResponderByIssueType,
};
