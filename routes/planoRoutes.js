const express = require('express');
const router = express.Router();
const planoController = require('../controllers/planoController');

router.get('/', planoController.getPlanos);

module.exports = router;
