const express = require('express');
const { AuthController } = require('../controllers/loader');

const router = express.Router();

router
    .post('/signup', AuthController.signup)
    .post('/login', AuthController.login)

module.exports = router;