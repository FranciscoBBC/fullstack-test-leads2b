
class SkillController{

  constructor(skillRepository) {
    this.repository = skillRepository
  }

  async find (req, res) {
    try {
      const skills = await this.repository.findAll(req.user.company);
      return res.ok(skills);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async findOne (req, res) {
    try {
      const skill = await this.repository.findOne(req.user.company, req.params.id);

      return res.ok(skill);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async update (req, res) {
    try {
      const skill = this.repository.update(req.user.company, req.params.id, req.body);

      return res.ok(skill);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async create (req, res) {
    try {
      const skill = await this.repository.create(req.user.company, req.body);

      return res.ok(skill);
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
}

module.exports = SkillController;
