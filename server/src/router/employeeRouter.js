const express = require('express');
const { EmployeeController } = require('../controllers/loader');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const employeeCache = require("../repository/redis/employeeCache")

const controller = new EmployeeController(employeeCache)

const router = express.Router();

router.use(isAuthenticated)

router
    .get('/employee', (req, res) => controller.find(req, res))
    .post('/employee', [isAdmin], (req, res) => controller.create(req, res))
    .get('/employee/:id', (req, res) => controller.findOne(req, res))
    .put('/employee/:id', [isAdmin], (req, res) => controller.update(req, res))
    .delete("/employee/:id", [isAdmin], (req, res) => controller.destroy(req, res))

module.exports = router;