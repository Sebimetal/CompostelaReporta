const express = require('express');

/*  Módulo xestión das rutas para xestionar as chamadas dos métodos de responderController */

const {
  findAllResponders,
  createResponder,
  findOneResponder,
} = require('../controller/responderController');
const router = express.Router();

/**
 * Métodos get
 */
router.get('/', findAllResponders);
router.get('/:id', findOneResponder);
/**
 * Métodos post
 */
router.post('/new', createResponder);
module.exports = router;
