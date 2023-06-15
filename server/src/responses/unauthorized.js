/**
 * 401 (Unauthorized) Response
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(data);
 *
 * @param  {String|Object} data
**/

module.exports = function sendUnauthorized(data) {
  return this.res.status(401).send(data);
};
