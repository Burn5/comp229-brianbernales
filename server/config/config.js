// server/config/config.js
const path = require('path');
// If .env is beside server.js (root): change to path.join(__dirname, '..', '..', '.env')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  // accept either name so you don’t get bitten by a mismatch
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Portfolio',
};