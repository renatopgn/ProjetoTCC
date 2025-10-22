const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

router.get('/', perfilController.getPerfil);
router.post('/update-info', perfilController.updateInfo); 
router.post("/verificar-senha", perfilController.verificarSenha);
router.post("/update", perfilController.updatePerfil); // ✅ adicionada

module.exports = router;
