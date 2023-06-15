/**
 * 403 (Forbidden) Response
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(data);
 *
 * @param  {String|Object} data
**/

module.exports = function sendForbidden(data) {
  return this.res.status(403).send(data);
};
