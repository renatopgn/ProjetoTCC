const express = require('express');
const router = express.Router();
const planosController = require('../controllers/planosController');

router.get('/', planosController.renderPlanos);

module.exports = router;
