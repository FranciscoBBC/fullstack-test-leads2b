/**
 * 404 (Not Found) Response
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(data);
 *
 * @param  {String|Object} data
**/

module.exports = function sendNotFound(data) {
  return this.res.status(404).send(data);
};
