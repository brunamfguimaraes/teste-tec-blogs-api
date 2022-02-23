require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = 'meusecretdetoken';

const jwtValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
    try {
      const decoded = jwt.verify(token, secret);
      const { user } = decoded;
      req.user = user;
      return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { jwtValidation };
