const express = require('express');

/*  Módulo xestión das rutas para xestionar as chamadas dos métodos de userController */

const router = express.Router();
const { login } = require('../controller/userController.js');
/**
 * Métodos post
 */
router.post('/login', login);

module.exports = router;
