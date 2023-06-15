const express = require('express');
const authRouter = require('./authRouter')
const employeeRouter = require('./employeeRouter')
const employeeSkillRouter = require('./employeeSkillRouter')
const projectRouter = require('./projectRouter')
const projectSkillRouter = require('./projectSkillRouter')
const skillRouter = require('./skillRouter')

const router = (app) => {
    app.use(
        express.json(),
        authRouter,
        employeeRouter,
        employeeSkillRouter,
        projectRouter,
        projectSkillRouter,
        skillRouter
    )
}

module.exports = router

