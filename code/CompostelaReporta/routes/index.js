const express = require('express');
const router = express.Router();

/*  Módulo para establecer a ruta inicial pola que vamos a entrar a nosa aplicación */

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
