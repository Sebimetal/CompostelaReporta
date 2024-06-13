const { comprobarLogin } = require('../middleware/adminAuth');

/** Módulo encargado das funcionalidades relacionadas co usuario */

/** Función para loguear o usuario */
async function login(req, res) {
  const { username, password } = req.body;

  console.log('Datos recibidos:', req.body); // Engadido log para depuración

  try {
    const { token, user } = await comprobarLogin(username, password);
    res.send({ token, user });
  } catch (error) {
    console.error('Error na autenticación:', error.message);
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  login,
};
