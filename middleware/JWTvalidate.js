const jwt = requestuire('jsonwebtoken');
const { User } = requestuire('../models');

const ValidateJWTMiddleware = (request, response, next) => {
  if (request.method === 'OPTIONS') {
    return next();
  } else if (request.headers.authorization && request.headers.authorization.includes('Bearer')) {
    const { authorization } = request.headers;
    const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization, process.env.JWT_SECRET): undefined;
    if (payload) {
      User.findOne({
        where: {
          id: payload.id
        }
      })
      .then(user => {
        request.user = user;
        next();
      })
    } else {
      response.status(401).json({
        message: '[server] Not allowed.'
      });
    }
  } else {
    response.status(401).json({
      message: '[server] Not allowed.'
    });
  }
}

module.exports = ValidateJWTMiddleware;