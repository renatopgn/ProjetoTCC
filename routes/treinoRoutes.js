const express = require('express');
const router = express.Router();
const treinoController = require('../controllers/treinoController');
const { isAuthenticated, isOwnerOrProfessor } = require('../middlewares/authMiddleware');

router.get('/', isAuthenticated, treinoController.renderTreinos);
router.post('/add', isAuthenticated, treinoController.addTreino);
router.post('/update/:id', isAuthenticated, isOwnerOrProfessor, treinoController.editTreino);
router.post('/delete/:id', isAuthenticated, isOwnerOrProfessor, treinoController.deleteTreino);

module.exports = router;

