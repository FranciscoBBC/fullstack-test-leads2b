/**
 * isAuthenticated
 *
 * @description :: Policy to check if user is authenticated with JSON web token
**/

const JwtService = require('../services/JWT');
const { User } = require('../models/loader');

function isAuthenticated(req, res, next) {
  let token;

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const [scheme, credentials] = parts;

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.badRequest('Formato de autorização inválido');
    }
  } else if(req.query.token) {
    token = req.query.token;
    // delete req.query.token;
  } else {
    return res.status(401).send('Credenciais de autorização não informadas (401)');
  }

  JwtService.verify(token, async (err, token) => {
    console.log('token', token);
    if (err) { return res.unauthorized('Token inválido'); }

    req.token = token;

    const user = await User.findOne({
      attributes: [
        'id',
        'company',
        'admin'
      ],
      where: { id: token.user }
    });

    if(!user) { return res.unauthorized('Usuário não existe'); }

    const objUser = user.get({ plain: true });
    req.user = objUser;

    return next(null, objUser);
  });
}

module.exports = isAuthenticated;
