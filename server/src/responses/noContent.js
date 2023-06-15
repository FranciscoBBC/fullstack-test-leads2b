/**
 * 204 (No Content) Response
 *
 * Usage:
 * return res.noContent();
 *
**/

module.exports = function sendNoContent() {
  return this.res.status(204).send();
};
