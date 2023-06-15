const {
    Employee,
    Project,
    ParticipantOnProject,
    ProjectSkill,
    sequelize
  } = require('../models/loader');
  
  const ProjectRepository = {
    async find (companyID) {
      try {
        const projects = await Project.findAll({
          where: { company: companyID }
        });
        return projects;
      } catch (e) {
        throw e
      }
    },
  
    async findOne (companyID, id) {
      try {
        const project = await Project.findOne({
          where: {
            id: id,
            company: companyID
          }
        });
  
        return project;
      } catch (e) {
        throw e
      }
    },
  
    async update (companyID, id, projectData) {
      try {
        const project = await Project.findOne({
          where: {
            id: id,
            company: companyID
          }
        });
  
        project.update({
          ...projectData,
          company: companyID
        });
  
        return project;
      } catch (e) {
        throw e
      }
    },
  
    async create (companyID, projectData) {
      try {
        const project = await Project.create({
          ...projectData,
          company: companyID
        });
  
        return project;
      } catch (e) {
        throw e
      }
    },
  
    async destroy (companyID, projectID) {
      try {
        // Remove as dependências
        await Promise.all([
          ProjectSkill.destroy({
            where: {
              project: projectID,
              company: companyID
            }
          }),
          ParticipantOnProject.destroy({
            where: { project: projectID }
          })
        ]);
  
        // Remove o projeto
        await Project.destroy({
          where: {
            id: projectID,
            company: companyID
          }
        });
      } catch(e) {
        throw e
      }
    },
  
    async addEmployee (participantData) {
      try {
        let participantOnProject = await ParticipantOnProject.create(participantData);
        return participantOnProject;
      } catch(e) {
        throw e
      }
    },
  
    async removeEmployee (employeeID, projectID) {
      try {
        let participantOnProject = await ParticipantOnProject.destroy({
          where: {
            project: projectID,
            employee: employeeID
          }
        });
        return participantOnProject;
      } catch(e) {
        throw e
      }
    },
  
    async participants (projectID) {
      try {
        let participants = await ParticipantOnProject.findAll({
          where: {
            project: projectID
          },
          include: [ { model: Employee } ]
        });
        return participants;
      } catch(e) {
        throw e
      }
    },
  
    async suggestions (companyID, projectID) {
      try {
        let participants = await ParticipantOnProject.findAll({
          where: {
            project: projectID
          }
        });
  
        let participantsIDs = participants.map(o => o.employee);
  
        const [bests] = await sequelize.query(`
          select employee.id, employee.firstName, employee.lastName, employee.email, SUM(employeeskill.stars) as stars from projectskill
          inner join employeeskill ON employeeskill.skill = projectskill.skill AND employeeskill.stars >= projectskill.stars
          inner join employee ON employee.id = employeeskill.employee
          where projectskill.project = ${projectID} and employee.id in (${participantsIDs}) and employee.company = ${companyID}
          group By employee.id
          order by stars DESC;
        `);
  
        const [others] = await sequelize.query(`
          select employee.id, employee.firstName, employee.lastName, employee.email, SUM(employeeskill.stars) as stars from projectskill
          inner join employeeskill ON employeeskill.skill = projectskill.skill
          inner join employee ON employee.id = employeeskill.employee
          where projectskill.project = ${projectID} AND employee.company = ${companyID} and employee.id in (${participantsIDs})
          group By employee.id
          order by stars DESC;
        `);
  
        const [all] = await sequelize.query(`
          select employee.id, employee.firstName, employee.lastName, employee.email from employee
          where employee.id in (${participantsIDs}) and employee.company = ${companyID} 
        `);
  
        return { bests, others, all };
      } catch(e) {
        throw e
      }
    }
};
  
module.exports = ProjectRepository;
  