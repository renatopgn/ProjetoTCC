const express = require('express');
const router = express.Router();
const treinosController = require('../controllers/treinosController');

router.get('/', treinosController.renderTreinos);
router.post('/add', treinosController.addTreino);
router.post('/delete/:id', treinosController.deleteTreino);
router.post('/edit/:id', treinosController.editTreino);

module.exports = router;
