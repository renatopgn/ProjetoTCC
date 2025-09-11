const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getUsuarios);
router.post('/tipo/:id', usuariosController.alterarTipo);
router.post('/delete/:id', usuariosController.deleteUsuario);

module.exports = router;
