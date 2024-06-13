const mongoose = require('mongoose');

/*  Módulo para creación do Schema user para crear a nosa colección Users na BBDD */

// Definir o esquema do usuario
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Crear o modelo de usuario basado no esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
