const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.loginPage);
router.get('/cadastro', authController.cadastroPage);
router.post('/login', authController.loginUser);
router.post('/cadastro', authController.registerUser);
router.get('/logout', authController.logout);

module.exports = router;
