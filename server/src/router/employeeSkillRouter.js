const express = require('express');
const { EmployeeSkillController } = require('../controllers/loader');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const employeeSkillRepository = require("../repository/employeeSkillRepository")

const controller = new EmployeeSkillController(employeeSkillRepository)

const router = express.Router();

router.use(isAuthenticated)

router
    .get('/employeeSkill', (req, res) => controller.find(req, res))
    .post('/employeeSkill',[isAdmin], (req, res) => controller.create(req, res))
    .get('/employeeSkill/:id', (req, res) => controller.findOne(req, res))
    .put('/employeeSkill/:id',[isAdmin], (req, res) => controller.update(req, res))
    .delete('/employeeSkill/:id',[isAdmin], (req, res) => controller.destroy(req, res));

module.exports = router