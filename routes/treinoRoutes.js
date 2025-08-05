const express = require('express');
const router = express.Router();
const treinosController = require('../controllers/treinoController');

// Página de treinos (listar todos do usuário)
router.get('/', treinosController.renderTreinos);

// Adicionar novo treino
router.post('/add', treinosController.addTreino);

// Excluir treino
router.post('/delete/:id', treinosController.deleteTreino);

// Editar treino
router.post('/edit/:id', treinosController.editTreino);

module.exports = router;
