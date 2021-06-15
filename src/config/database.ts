// This database.js is called with the CLI, so the dotenv load is required here since the app bootstrap won't be called
require('dotenv').config();

const credentials = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT ?? 'mysql',
};

module.exports = {
  development: {
    ...credentials,
  },
  test: {
    ...credentials,
  },
  production: {
    ...credentials,
  },
};
