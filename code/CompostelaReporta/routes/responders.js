const express = require('express');
const {
  findAllResponders,
  createResponder,
  findOneResponder,
} = require('../controller/responderController');
const router = express.Router();

router.get('/', findAllResponders);
router.get('/:id', findOneResponder);
router.post('/new', createResponder);
module.exports = router;
