const { Responder } = require('../models/Models.js');

/*async function createResponder(req, res) {
  try {
    let responder = await Responder.create(res);
    return responder.toJSON();
  } catch (error) {
    res.json(error.message);
  }
}*/

async function findAllResponders(req, res) {
  try {
    const responders = await Responder.find();
    res.status(200).json(responders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
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

async function createResponder(req, res) {
  try {
    const { name, telephone } = req.body;
    const newResponder = new Responder({ name, telephone });
    if (newResponder.name === null) {
      console.log(name);
    }
    await Responder.create(newResponder);
    res.status(201).json(newResponder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = { findAllResponders, createResponder, findOneResponder };
