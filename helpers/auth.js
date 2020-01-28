const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const createToken = payload => {
  if (payload === undefined) {
    return;
  }
  const userDetails = {
    id: payload.id,
    isAdmin: payload.is_admin
  }
  const token = jwt.sign(userDetails, process.env.JWT_KEY, {
    expiresIn: '24h'
  });
  return token;
}

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    jwt.verify(token, process.env.JWT_KEY, (err, result) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          error: 'Forbidden'
        });
      } 
      req.user = result
    })
    next();
  } else {
    // If header is undefined
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized'
    });
  }
};

module.exports = {
  createToken,
  verifyToken
};