const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET;

// quickly see what this file exports
module.exports = {
  authenticate,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decodedToken) => {
      if (err) return res.status(401).json(err);

      req.decoded = decodedToken;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
