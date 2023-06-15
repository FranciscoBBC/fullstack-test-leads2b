/**
 * 400 (Bad Request) Response
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 *
 * @param  {String|Object} data
**/

module.exports = function sendBadRequest(data) {
  return this.res.status(400).send(data);
};
