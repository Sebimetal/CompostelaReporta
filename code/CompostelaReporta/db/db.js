const mongoose = require('mongoose');
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const dbName = process.env.DBNAME;
async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb://${username}:${password}@localhost:27017/${dbName}`
    );
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
