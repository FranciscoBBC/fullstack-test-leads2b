const { ProjectSkill, Skill } = require('../models/loader');

class ProjectSkillController {
  constructor(ProjectSkillRepository) {
    this.repository = ProjectSkillRepository
  }

  async find (req, res) {
    try {
      const projectSkill = await this.repository.findAll(req.user.company, req.query);
      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async findOne (req, res) {
    try {
      const projectSkill = await this.repository.findOne(req.user.company, req.params.id);

      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async update (req, res) {
    try {
      const projectSkill = this.repository.update(req.user.company, req.params.id, req.body);

      return res.ok(projectSkill);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async create (req, res) {
    try {
      const created = await this.repository.create(req.user.company, req.body);

      return res.ok(created);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async destroy (req, res) {
    try {
      await this.repository.destroy(req.user.company, req.params.id);

      return res.noContent();
    } catch(e) {
      return res.badRequest(e);
    }
  }
};

module.exports = ProjectSkillController;
