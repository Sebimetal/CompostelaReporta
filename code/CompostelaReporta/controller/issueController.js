const { Issue } = require('../models/index.js');
const { getResponderByIssueType } = require('./responderController.js');
const crypto = require('crypto');

/** Módulo encargado das funcionalidades relacionadas coas incidencias */

// Función para convertir a ip do usuario que crea a incidencia a un código HASH
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
    const issues = await Issue.find().sort({ updateDate: -1 }); // Ordena por updateDate en orde descendente
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Encuontra incidencias polo seu tipo.
 * @param {Object} req - Obxecto de solicitud de Express.
 * @param {Object} res - Obxecto de respuesta de Express.
 */
async function findIssuesByType(req, res) {
  try {
    const { issueType } = req.body;
    console.log(issueType);
    const issues = await Issue.find({ issueType: issueType });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Recollendo as últimas 5 incidencias actualizadas da base de datos
 * @param {object} req Non usado
 * @param {object} res Express.js obxecto esponse
 * @throws {Error} Lanza erro se encontra fallos ao facer o fetch das incidencias
 */
async function findLastFiveIssues(req, res) {
  try {
    // Recollendo as últimas 5 incidencias ordenadas por fecha de update con orde descendente
    const issues = await Issue.find().sort({ updateDate: -1 }).limit(5);
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Recollemos as incidencias entre un rango de fechas
 * @param {*} req Paso rango de fechas (fecha inicio e fecha fin)
 * @param {*} res Devolve as incidencias entre esas fechas
 */
async function findIssuesByDate(req, res) {
  try {
    // Obtemos os parámetros de data de inicio e fin do request
    const { startDate, endDate } = req.body;

    // Convertimos as datas de inicio e fin a obxectos Date
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    // Verificamos se startDate é posterior ou igual a endDate
    if (startDateTime > endDateTime) {
      return res
        .status(400)
        .json({ message: 'startDate debe ser anterior a endDate' });
    }

    // Engadimos un día á data de fin para que a consulta inclúa o día de endDate
    endDateTime.setDate(endDateTime.getDate() + 1);

    // Realizamos-la consulta para encontra-las incidencias dentro do rango de datas
    const issues = await Issue.find({
      updateDate: { $gte: startDateTime, $lt: endDateTime },
    });

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
 * Recollendo as incidencias que teñan o código de usuario reporterHash
 * @param {Object} req enviamos reporterHash desde front
 * @param {Object} res devolvemos issues
 * @returns
 */
async function findIssuesByReporterHash(req, res) {
  try {
    const { reporterHash } = req.body;
    const issues = await Issue.find({ reporterHash });
    res.status(200).json(issues);
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

/**
 * Creación de unha incidencia na BBD
 * @param {*} req Recollendo os parámetros description, location, e issueType
 * @param {*} res Devolve unha incidencia
 * @returns
 */
async function createIssue(req, res) {
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
    let ip = req.ip;
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(',').shift();
    }
    // Creamos un código xerado por hash do ip do usuario para que poda filtrar as súas incidencias máis tarde
    let reporterHash = hashIp(ip);
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
        res.status(400).json({
          error: `O parámetro '${param}' non pode estar vacío.`,
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
      console.error('Error ao obter a dirección:', error);
      throw error; // Lanzar el error para manejarlo fuera de la función si es necesario
    }
    // Creando Issue na BBDD
    await Issue.create(newIssue);

    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error ao crear a incidencia:', error);
    res.status(500).json({ error: 'Error interno do servidor' });
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
    const { issueId, description, priority, parentIssue, issueType } = req.body;

    // Buscamo-la incidencia
    let issueData = await findOneIssueObject(issueId);
    if (!issueData) {
      return res.status(404).json({ message: 'Incidencia non atopada' });
    }
    // Buscamo-lo responsable
    const responder = await getResponderByIssueType(issueType);
    // Definindo os posibles estados
    const states = ['new', 'accepted', 'ongoing', 'finished'];

    // Obtendo o índice do estado actual
    const currentStateIndex = states.indexOf(issueData.status);
    const nextStatus = states[currentStateIndex + 1] || 'finished'; // Asegura que no exceda el estado 'Finished'
    // Crear la actualización
    const actualDate = new Date();

    const update = {
      date: actualDate,
      description: description,
      previousStatus: issueData.status,
      newStatus: nextStatus,
    };
    // Agrega-la actualización á incidencia e cambiar o estado
    issueData.updates.push(update);
    issueData.status = nextStatus;
    issueData.priority = priority;
    issueData.updateDate = actualDate;

    issueData.responder = responder._id;
    // Garda-la incidencia actualizada
    await issueData.save();

    // Envia-la resposta coa incidencia actualizada
    res.status(201).json({ issueData });
  } catch (error) {
    if (error.message === 'Incidencia non atopada') {
      return res.status(404).json({ message: 'Incidencia non atopada' });
    }
    res.status(500).json({ error: 'Error interno do servidor' });
  }
}

/**
 * Método de filtrado conxunto, filtra por tipo de usuario, datas ou userHash
 * @param {*} req Filtros pasados
 * @param {*} res Incidencias recollidas da BBDD que coincidan co filtro
 * @returns
 */

async function findIssues(req, res) {
  try {
    const { issueType, startDate, endDate, reporterHash } = req.body;
    const filter = {};

    if (issueType) {
      filter.issueType = issueType;
    }

    if (reporterHash) {
      filter.reporterHash = reporterHash;
    }

    if (startDate && endDate) {
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
      endDateTime.setDate(endDateTime.getDate() + 1);

      if (startDateTime > endDateTime) {
        return res
          .status(400)
          .json({ message: 'startDate debe ser anterior a endDate' });
      }

      filter.updateDate = { $gte: startDateTime, $lt: endDateTime };
    }

    const issues = await Issue.find(filter).sort({ updateDate: -1 });
    console.log(issues);
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * Eliminar unha incidencia da base de datos
 *
 * @param {Object} req Obxeto request, conten o ID da incidencia en req.params.id
 * @param {Object} res Obxecto response
 * @returns {Object} Mensaxe de éxito ou erro
 * @throws {Error} Lanza erro se atopa fallos ao elimina-la incidencia
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
  findLastFiveIssues,
  findIssuesByDate,
  findIssuesByReporterHash,
  findIssuesByType,
  findIssues,
};
