const { EmployeeSkill, Skill } = require('../models/loader');

const employeeSkillRepository = {
  async find (companyID, skillData) {
    try {
      const employeeSkills = await EmployeeSkill.findAll({
        where: {
          ...skillData,
          company: companyID
        },
        include: [ { model: Skill } ]
      });
      return employeeSkills;
    } catch (e) {
      throw e
    }
  },

  async findOne (companyID, id) {
    try {
      const employeeSkill = await EmployeeSkill.findOne({
        where: {
          id: id,
          company: companyID
        }
      });

      return employeeSkill
    } catch (e) {
        throw e
    }
  },

  async update (companyID, id, skillData) {
    try {
      const employeeSkill = await EmployeeSkill.findOne({
        where: {
          id: id,
          company: companyID
        }
      });

      employeeSkill.update({
        ...skillData,
        company: companyID
      });

      return employeeSkill
    } catch (e) {
      throw e
    }
  },

  async create (companyID, skillData) {
    try {
      const created = await EmployeeSkill.create({
        ...skillData,
        company: companyID
      });

      const employeeSkills = await EmployeeSkill.findOne({
        where: {
          id: created.id
        },
        include: [ { model: Skill } ]
      });

      return employeeSkills
    } catch (e) {
      throw e
    }
  },

  async destroy (companyID, id) {
    try {
      await EmployeeSkill.destroy({
        where: {
          id: id,
          company: companyID
        }
      });
    } catch(e) {
        throw e
    }
  }
}

module.exports = employeeSkillRepository