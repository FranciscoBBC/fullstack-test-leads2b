class ProjectController {
  constructor(projectRepository) {
    this.repository = projectRepository
  }

  async find (req, res) {
    try {
      const projects = await this.repository.findAll(req.user.company);
      return res.ok(projects);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async findOne (req, res) {
    try {
      const project = await this.repository.findOne(req.user.company, req.params.id);

      return res.ok(project);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async update (req, res) {
    try {
      const project = await this.repository.findOne(req.user.company, req.params.id, req.body);

      return res.ok(project);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async create (req, res) {
    try {
      const project = await this.repository.create(req.user.company, req.body);

      return res.ok(project);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async destroy (req, res) {
    const { id } = req.params;
    const { company } = req.user;

    try {
      await this.repository.destroy(company, id)

      return res.noContent();
    } catch(e) {
      return res.badRequest(e);
    }
  }

  async addEmployee (req, res) {
    try {
      let participantOnProject = await this.repository.addEmployee(req.body);
      return res.ok(participantOnProject);
    } catch(e) {
      return res.badRequest(e);
    }
  }

  async removeEmployee (req, res) {
    try {
      let participantOnProject = await this.repository.destroy(req.body.employeeId, req.params.id);
      return res.ok(participantOnProject);
    } catch(e) {
      return res.badRequest(e);
    }
  }

  async participants (req, res) {
    try {
      let participants = await this.repository.participants(req.params.id);
      return res.ok(participants);
    } catch(e) {
      console.log(e);
      return res.badRequest(e);
    }
  }

  async suggestions (req, res) {
    try {
      const { bests, others, all } = await this.repository.suggestions(req.user.company, req.params.id);

      return res.ok({ bests, others, all });
    } catch(e) {
      console.log(e);
      return res.badRequest(e);
    }
  }
};

module.exports = ProjectController;
