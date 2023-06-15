class EmployeeController {
  constructor(employeeRepository) {
    this.repository = employeeRepository
  }
  
  async find (req, res) {
    try {
      const employees = await this.repository.find(req.user.company)

      return res.ok(employees);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async findOne (req, res) {
    try {
      const employee = await this.repository.findOne(req.user.company, req.params.id);

      return res.ok(employee);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async update (req, res) {
    try {
      const employee = await this.repository.update(req.user.company, req.params.id, req.body);

      return res.ok(employee);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async create (req, res) {
    try {
      const employee = await this.repository.create(req.user.company, req.body);

      return res.ok(employee);
    } catch (e) {
      return res.badRequest(e);
    }
  }

  async destroy(req, res) {
    try {
      const employeeId = parseInt(req.params.id)
      if (isNaN(employeeId)) return res.badRequest(e);

      this.repository.destroy(req.user.company, employeeId)

      return res.ok();
    } catch(e) {
      return res.badRequest(e);
    }
  }
}

module.exports = EmployeeController;
