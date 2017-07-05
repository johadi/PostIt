const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    username: 'postgres',
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_HOST,
    dialect: 'postgres',
    logging: false
  }
};
module.exports = config;
