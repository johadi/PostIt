// We can't use es6 import/export here as sequelize-cli we used
// for migrations only supports require which is also natively
// supported by nodejs
require('dotenv').config();

const config = {
  development: {
    username: 'jimoh',
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_HOST,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'johadi',
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.DEV_HOST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
module.exports = config[process.env.NODE_ENV || 'development'];
