const { Issue, Update } = require('../models/Models.js');
const crypto = require('crypto');

// Función para convertir o e-mail do usuario que crea a incidencia a un código HASH
function hashIp(ip) {
  const hash = crypto.createHash('sha256');
  hash.update(ip.toLowerCase().trim());
  let userHash = hash.digest('hex').slice(0, 10);
  return userHash;
}

async function findAllIssues(req, res) {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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
  description, location, issueType, responder(ID)
  */
  try {
    const {
      description,
      location,
      issueType,
      creationDate,
      updateDate,
      responder,
    } = req.body;
    let reporterHash = hashIp(req.ip);
    const newIssue = new Issue({
      description,
      location,
      issueType,
      creationDate,
      updateDate,
      reporterHash,
      responder,
    });
    const requiredParams = [
      'description',
      'location',
      'issueType',
      'responder',
    ];

    // Check if all required parameters are present and not empty
    for (const param of requiredParams) {
      if (!newIssue[param] || newIssue[param] === '') {
        console.log(param);
        console.log(newIssue[param]);
        res.status(400).json({
          error: `El parámetro '${param}' no puede estar vacío.`,
        });
        return; // Exit the function if any parameter is empty
      }
    }

    await Issue.create(newIssue);

    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error al crear la incidencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

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

module.exports = { findAllIssues, findOneIssue, createIssue, assignUpdate };
