const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.getLogin);
router.get('/cadastro', authController.getCadastro);
router.post('/cadastro', authController.postCadastro);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;
