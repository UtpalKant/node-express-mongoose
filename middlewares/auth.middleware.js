const jwt = require('jsonwebtoken');

module.exports = {
  // Verify Token
  verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearerToken = bearerHeader.split(' ');
      req.token = bearerToken[1];
      jwt.verify(req.token, process.env.secret, (err, authData) => {
        if (err) {
          res.status(403);
          res.send({ 'error': 'invalid auth_token.' });
        } else {
          req.user = authData;
          if ((req.baseUrl === '/admin' && req.user.role === 'admin') || req.baseUrl !== '/admin') {
            next();
          } else {
            // Unauthorized
            res.status(401);
            res.send({ 'error': 'Unauthorized' });
          }
        }
      });
    } else {
      // Forbidden
      res.status(403);
      res.send({ 'error': 'invalid auth_token.' });
    }

  }
}