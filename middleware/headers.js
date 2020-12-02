const CorsMiddleware = (request, response, next) => {
  response.header('access-control-allow-origin', '*');
  response.header('access-control-allow-methods', 'POST, PUT, GET, DELETE, OPTIONS');
  response.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');

  return next();
}

module.exports = CorsMiddleware;