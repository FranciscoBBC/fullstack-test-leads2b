const jwt = require('jsonwebtoken');
const tokenSecret = '1234567890';

const JWTService = {
  issue (payload, expiresIn = '24h') {
    return jwt.sign(payload, tokenSecret, { expiresIn });
  },

  // Verifies token on a request
  verify (token, callback) {
    return jwt.verify(
      token, // The token to be verified
      tokenSecret, // Same token we used to sign
      {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      callback //Pass errors or decoded token to callback
    );
  }
};

module.exports = JWTService;
