const { Issue, Update } = require('../models/index.js');
const crypto = require('crypto');

// Función para convertir o e-mail do usuario que crea a incidencia a un código HASH
function hashIp(ip) {
  const hash = crypto.createHash('sha256');
  hash.update(ip.toLowerCase().trim());
  let userHash = hash.digest('hex').slice(0, 10);
  return userHash;
}

/**
 * Recollendo tódalas incidencias da base de datos
 * @param {object} req Non usado
 * @param {object} res Express.js obxecto esponse
 * @throws {Error} Lanza erro se encontra fallos ao facer o fetch das incidencias
 */
async function findAllIssues(req, res) {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Recollendo a incidencia da base de datos
 * @param {object} req Mandamos no obxecto request como parámetro o string do ID da incidencia
 * @param {object} res Express.js obxecto response
 * @returns {Issue} Devolvemos incidencia en formato JSON
 * @throws {Error} Lanza erro se encontra fallos ao facer o fetch das incidencias
 */
async function findOneIssue(req, res) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Recollendo da base de datos a incidencia en forma de obxecto
 *
 * @param {object} req Mandamos no obxecto request como parámetro o string do ID da incidencia
 * @param {object} res Express.js obxecto response
 * @returns {Issue} Devolvemos a incidencia como obxecto en vez de formato JSON
 * @throws {Error} Lanza erro se encontra fallos ao facer o fetch das incidencias
 */
async function findOneIssueObject(id) {
  try {
    const issue = await Issue.findById(id);
    return issue;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Usuario anónimo crea unha incidencia
async function createIssue(req, res) {
  /*Necesitan pasarse mínimo os seguintes parámetros
  description, location, issueType (caso de usuario anónimo)
  */
  try {
    const {
      description,
      location,
      address,
      issueType,
      creationDate,
      updateDate,
      responder,
    } = req.body;
    let reporterHash = hashIp(req.ip);
    const newIssue = new Issue({
      description,
      location,
      address,
      issueType,
      creationDate,
      updateDate,
      reporterHash,
      responder,
    });
    const requiredParams = ['description', 'location', 'issueType'];
    // Comprobando se os parámetros requeridos están cubertos
    for (const param of requiredParams) {
      if (!newIssue[param] || newIssue[param] === '') {
        console.log(param);
        console.log(newIssue[param]);
        res.status(400).json({
          error: `El parámetro '${param}' no puede estar vacío.`,
        });
        return; // Saindo da función en caso de que algún parámetro non esté cuberto
      }
    }
    // Recollemos ca API nominatim a dirección usando as coordenadas.
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newIssue.location.coordinates[0]}&lon=${newIssue.location.coordinates[1]}`
      );
      const data = await response.json();
      let address = data.address;
      newIssue.address = `${address.road}, ${address.city}`;
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      throw error; // Lanzar el error para manejarlo fuera de la función si es necesario
    }
    // Creando Issue na BBDD
    await Issue.create(newIssue);

    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error al crear la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/**
 * Engadir actualización á incidencia
 *
 * @param {object} req Pasamos como parámetros o ID da incidencia mais os
 *                     datos para crear a actualización (date, description e newStatus)
 * @returns {object}
 */
async function assignUpdate(req, res) {
  try {
    const { issueId, date, description, newStatus } = req.body;
    let issueData = await findOneIssueObject(issueId);
    if (issueData) {
      let previousStatus = issueData.status;
      let update = new Update({
        date: date || undefined,
        description: description,
        previousStatus: previousStatus,
        newStatus: newStatus,
      });
      issueData.updates.push(update);
      issueData.save();
      res.status(201).json({ issueData });
    }
  } catch (error) {
    if (error.message === 'Incidencia no encontrada') {
      return res.status(404).json({ message: 'Incidencia no encontrada' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

/**
 * Eliminar unha incidencia da base de datos
 *
 * @param {object} req Express.js objeto request, contiene el ID de la incidencia en req.params.id
 * @param {object} res Express.js objeto response
 * @returns {object} Mensaje de éxito o error
 * @throws {Error} Lanza error si encuentra fallos al eliminar la incidencia
 */
async function deleteIssue(req, res) {
  try {
    const issueId = req.params.id;
    const issue = await Issue.findByIdAndDelete(issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Incidencia non atopada' });
    }
    res.status(200).json({ message: 'Incidencia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  findAllIssues,
  findOneIssue,
  createIssue,
  assignUpdate,
  deleteIssue,
};
