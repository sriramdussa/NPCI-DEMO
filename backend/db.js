// db.js
const {Pool} = require('pg');

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'npci',
  user: 'postgres',
  password: '9491475287',
};
const pool = new Pool(dbConfig);

module.exports = {
    dbConfig,
    pool,
  };
