const { ProjectSkill, Skill } = require('../models/loader');

const ProjectSkillRepository = {
  async find (companyID, skillData) {
    try {
      const projectSkill = await ProjectSkill.findAll({
        where: {
          ...skillData,
          company: companyID
        },
        include: [ { model: Skill } ]
      });
      return projectSkill;
    } catch (e) {
      throw e;
    }
  },

  async findOne (companyID, id) {
    try {
      const projectSkill = await ProjectSkill.findOne({
        where: {
          id: id,
          company: companyID
        }
      });

      return projectSkill;
    } catch (e) {
        throw e;
    }
  },

  async update (companyID, id, skillData) {
    try {
      const projectSkill = await ProjectSkill.findOne({
        where: {
          id: id,
          company: companyID
        }
      });

      projectSkill.update({
        ...skillData,
        company: companyID
      });

      return projectSkill;
    } catch (e) {
        throw e;
    }
  },

  async create (companyID, skillData) {
    try {
      const created = await ProjectSkill.create({
        ...skillData,
        company: companyID
      });

      const projectSkill = await ProjectSkill.findOne({
        where: {
          id: created.id
        },
        include: [ { model: Skill } ]
      });

      return projectSkill;
    } catch (e) {
        throw e;
    }
  },

  async destroy (companyID, id) {
    try {
      await ProjectSkill.destroy({
        where: {
          id: id,
          company: companyID
        }
      });
    } catch(e) {
        throw e;
    }
  }
};

module.exports = ProjectSkillRepository;
