const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

router.get('/', perfilController.renderPerfil);
router.post('/atualizar', perfilController.updatePerfil);

module.exports = router;
