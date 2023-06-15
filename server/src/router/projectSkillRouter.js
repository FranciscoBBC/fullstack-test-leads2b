const express = require('express');
const { ProjectSkillController } = require('../controllers/loader');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const projectSkillRepository = require("../repository/projectSkillRepository")

const controller = new ProjectSkillController(projectSkillRepository)

const router = express.Router();

router.use(isAuthenticated)

router
    .get('/projectSkill', (req, res) => controller.find(req, res))
    .post('/projectSkill',[isAdmin], (req, res) => controller.create(req, res))
    .get('/projectSkill/:id', (req, res) => controller.findOne(req, res))
    .put('/projectSkill/:id',[isAdmin], (req, res) => controller.update(req, res))
    .delete('/projectSkill/:id',[isAdmin], (req, res) => controller.destroy(req, res))


module.exports = router