const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const upload = require('../middlewares/upload');

router.get('/', perfilController.getPerfil);
router.post('/update', upload.single('exameFoto'), perfilController.updatePerfil);
router.post('/update-info', perfilController.updateInfo); // NOVA ROTA
router.post("/verificar-senha", perfilController.verificarSenha);

module.exports = router;