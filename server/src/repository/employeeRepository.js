const { Employee, EmployeeSkill, ParticipantOnProject } = require('../models/loader');
// const employeeCache = require("./redis/employeeCache")

const employeeRepository = {
    async find (companyID) {
        try { 
          const employees = await Employee.findAll({
            where: { company: companyID }
          });
          return employees
        } catch (e) {
          throw e;
        }
      },
    
      async findOne (companyID, employeeID) {
        try {
            const employee = await Employee.findOne({
                where: {
                id: employeeID,
                company: companyID
                }
            });
    
            return employee;
        } catch (e) {
            console.log(e)
            throw e;
        }
      },
    
      async update (companyID, employeeID, employeeData) {
        try {
          const employee = await Employee.findOne({
            where: {
              id: employeeID,
              company: companyID
            }
          });

          employee.update({
            ...employeeData,
            company: companyID
          });

          return employee;
        } catch (e) {
            throw e;
        }
      },
    
      async create (companyID, employeeData) {
        try {
          const employee = await Employee.create({
            ...employeeData,
            company: companyID
          });
    
          return employee;
        } catch (e) {
            throw e;
        }
      },
    
      async destroy(companyID, employeeID) {
        try {
          // get all the projects that the employee participates in
          const projects = await ParticipantOnProject.findAll({
            where: {
              employee: employeeID
            }
          }) 
    
          // revoke all projects from employee
          await projects.forEach( async ({project}) => {
            await ParticipantOnProject.destroy({
              where: {
                project:project,
                employee: employeeID
              }
            });
          });
    
          await EmployeeSkill.destroy({
            where: {
              id: employeeID,
              company: companyID
            }
          })
    
          await Employee.destroy({
            where: {
              id: employeeID,
              company: companyID
            }
          })
        } catch(e) {
            throw e;
        }
      },      
}

module.exports = employeeRepository