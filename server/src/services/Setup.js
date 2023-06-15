const { Employee, Skill, Project } = require('../models/loader');
const faker = require('faker');

module.exports = {
  all(company) {
    this.skills(company);
    this.employees(company);
    this.projects(company);
  },

  employees(company) {
    let employees = [];

    for (var i = 0; i < 10; i++) {
      employees.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        company: company.id
      })
    }

    Employee.bulkCreate(employees).then();
  },

  projects(company) {
    let projectData = [
      {
        title: 'Desenvolvimento de um E-commerce',
        description: 'Criar um E-commerce utilizando Vue.js, Nodejs e MySQL'
      },
      {
        title: 'Desenvolver um site estático para divulgar um evento',
        description: 'Neste projeto será desenvolvido um site estático e o design do template'
      }
    ];

    let projects = projectData.map(({title, description})=> {
      return {
        company: company.id,
        title,
        description
      };
    });

    Project.bulkCreate(projects).then();
  },

  skills(company) {
    let skillNames = ['Node.js', 'Vue.js', 'Java', 'SCSS', 'Photoshop', 'Desenho vetorial',
    'Animação Web', 'Linguagem C/C++', 'Ruby', 'PHP', 'AWS', 'Arquitetura Web', 'Docker', 'MySQL', 'WebSockets', 'Adobe After Effects', 'Wordpress'];

    let skills = skillNames.map((title)=> {
      return {
        company: company.id,
        title
      };
    });

    Skill.bulkCreate(skills).then();
  }
};
