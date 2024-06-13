const mongoose = require('mongoose');

/** Módulo encargado da conexión coa BBDD a través da dependencia mongoose */

// Recollemo-la uri do noso arquivo .env
const uri = process.env.MONGODB_URI;
// Conectamos coa nosa BBDD a través da dependencia mongoose
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}
module.exports = { connectDB };
