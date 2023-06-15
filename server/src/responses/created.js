/**
 * 201 (Created) Response
 *
 * Usage:
 * return res.created();
 * return res.created(data);
 *
 * @param  {Object} data
**/

module.exports = function sendCreated(data) {
  return this.res.status(201).json(data);
};
