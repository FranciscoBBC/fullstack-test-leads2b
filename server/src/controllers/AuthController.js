const { User, Company } = require('../models/loader');
const bcrypt = require('bcryptjs');
const JwtService = require('../services/JWT');
const SetupService = require('../services/Setup');

const AuthController = {
  async login (req, res) {
    try {
      const identification = req.param('identification');
      const password = req.param('password');

      if (!identification || !password) {
        return res.forbidden('Credenciais não informadas');
      }

      let user = await User.findOne({ email: identification, attributes: ['id', 'firstName', 'lastName', 'company', 'password'] });
      let company = await Company.findOne({ id: user.company });

      if (!user) { return res.forbidden('Esta conta não existe.'); }

      bcrypt.compare(password, user.password, (err, match) => {
        if (err) { return res.forbidden('Login e/ou senha inválido(s)'); }

        if (!match) {
          return res.forbidden('Login e/ou senha inválido(s)');
        } else {
          return res.ok({
            company,
            user,
            token: JwtService.issue({ user: user.id, company: company.id })
          });
        }
      });
    } catch (e) {
      return res.badRequest(e);
    }
  },

  async signup (req, res) {
    try {
      const body = req.body;
      if (!body.company || !body.user) {
        return res.badRequest('Dados incorretos');
      }

      let company = await Company.create(body.company);
      let user = await User.create({
        ...body.user,
        company: company.id
      });

      SetupService.all(company);

      return res.ok({
        company,
        user,
        token: JwtService.issue({ user: user.id, company: company.id })
      });
    } catch (e) {
      console.log(e);
      return res.badRequest(e);
    }
  }
};

module.exports = AuthController;
