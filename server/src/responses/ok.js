/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 *
 * @param  {Object} data
**/

module.exports = function sendOk(data) {
  return this.res.status(200).json(data);
};
