const { Skill } = require('../models/loader');

const skillRepository ={
    async find (companyID) {
        try {
          const skills = await Skill.findAll({
            where: { company: companyID }
          });
          return skills
        } catch (e) {
          throw e
        }
      },
    
      async findOne (companyID, id) {
        try {
          const skill = await Skill.findOne({
            where: {
              id: id,
              company: companyID
            }
          });
    
          return skill;
        } catch (e) {
            throw e
        }
      },
    
      async update (companyID, id, skillData) {
        try {
          const skill = await Skill.findOne({
            where: {
              id: id,
              company: companyID
            }
          });
    
          skill.update({
            ...skillData,
            company: companyID
          });
    
          return skill;
        } catch (e) {
            throw e
        }
      },
    
      async create (companyID, skillData) {
        try {
          const skill = await Skill.create({
            ...skillData,
            company: companyID
          });
    
          return skill;
        } catch (e) {
            throw e
        }
      },
    
      async destroy (companyID, id) {
        try {
          await Skill.destroy({
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

module.exports = skillRepository
