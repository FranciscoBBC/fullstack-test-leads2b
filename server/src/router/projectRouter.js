const express = require('express');
const { ProjectController } = require('../controllers/loader');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const projectRepository = require("../repository/projectRepository")

const controller = new ProjectController(projectRepository)

const router = express.Router();

router.use(isAuthenticated)

router
    .get('/project', (req, res) => controller.find(req, res))
    .post('/project', [isAdmin], (req, res) => controller.create(req, res))
    .get('/project/:id/participants', (req, res) => controller.participants(req, res))
    .get('/project/:id/suggestions', (req, res) => controller.suggestions(req, res))
    .post('/project/addEmployee',[isAdmin], (req, res) => controller.addEmployee(req, res))
    .delete('/project/:id/employee',[isAdmin], (req, res) => controller.removeEmployee(req, res))
    .get('/project/:id', (req, res) => controller.findOne(req, res))
    .put('/project/:id',[isAdmin], (req, res) => controller.update(req, res))
    .delete('/project/:id',[isAdmin], (req, res) => controller.destroy(req, res))

module.exports = router