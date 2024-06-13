const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

/** Módulo middleware para o control de acceso ás funcionalidades de administrador */

// Función para generar un token JWT
function generarToken(user) {
  const jwtSecret = process.env.JWT_SECRET || 'default_secret';
  return jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
    expiresIn: '1h',
  });
}

// Función para comprobar o login
async function comprobarLogin(username, password) {
  try {
    // Buscámo-lo usuario
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Usuario non atopado');
    }
    // Comprobamos se o password pasado por parámetros é correcto
    const esValida = await bcrypt.compare(password, user.password);
    if (!esValida) {
      throw new Error('Contrasinal incorrecto');
    }
    /* Xeramos token para devolver ao front e poder utilizalo para 
    autenticar ao usuario á hora de utilizar as funcionalidades de admin */
    const token = generarToken(user);
    return { token, user };
  } catch (error) {
    console.error('Error na autenticación:', error.message);
    throw new Error('Error na autenticación');
  }
}

// Función para comprobar se o token que nos pasan dende front é correcto
async function adminAuth(req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    throw new Error('Token de autorización non presente');
  }
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .send({ error: 'Acceso denegado: Non se proporcionou un token' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret'
    );
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .send({ error: 'Acceso denegado: Usuario non atopado' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Acceso denegado: Token non válido' });
  }
}

module.exports = {
  comprobarLogin,
  adminAuth,
};
