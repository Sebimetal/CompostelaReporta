const express = require('express');
const router = express.Router();

/*  Módulo xestión das rutas para xestionar as chamadas dos métodos de issueController */

const {
  findOneIssue,
  createIssue,
  findAllIssues,
  assignUpdate,
  deleteIssue,
  findLastFiveIssues,
  findIssuesByDate,
  findIssuesByReporterHash,
  findIssuesByType,
  findIssues,
} = require('../controller/issueController.js');

const { adminAuth } = require('../middleware/adminAuth.js');
/**
 * Rutas get
 */
router.get('/', findAllIssues);
router.get('/getLastIssues', findLastFiveIssues);
router.get('/:id', findOneIssue);

/**
 * Rutas post
 */
router.post('/findByDate', findIssuesByDate);
// Incluimos o middleware adminAuth para control de logueo de administrador
router.post('/assignUpdate', adminAuth, assignUpdate);
router.post('/new', createIssue);
router.post('/findByUser', findIssuesByReporterHash);
router.post('/findByType', findIssuesByType);
router.post('/find', findIssues);

/**
 * Rutas delete
 */
// Incluimos o middleware adminAuth para control de logueo de administrador
router.delete('/:id', adminAuth, deleteIssue);

module.exports = router;
