const express = require('express');
const router = express.Router();
const {
  findOneIssue,
  createIssue,
  findAllIssues,
  assignUpdate,
  deleteIssue,
} = require('../controller/issueController.js');

router.get('/', findAllIssues);
router.post('/assign', assignUpdate);
router.get('/:id', findOneIssue);
router.post('/new', createIssue);
router.delete('/:id', deleteIssue);
module.exports = router;
