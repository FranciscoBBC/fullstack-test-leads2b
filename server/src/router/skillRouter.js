const express = require('express');
const { SkillController } = require('../controllers/loader');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const skillRepository = require("../repository/skillRepository")

const controller = new SkillController(skillRepository)
const router = express.Router();

router.use(isAuthenticated)

router
    .get('/skill', (req, res) => controller.find(req, res))
    .post('/skill',[isAdmin], (req, res) => controller.create(req, res))
    .get('/skill/:id', (req, res) => controller.findOne(req, res))
    .put('/skill/:id',[isAdmin], (req, res) => controller.update(req, res))
    .delete('/skill/:id',[isAdmin], (req, res) => controller.destroy(req, res))

module.exports = router