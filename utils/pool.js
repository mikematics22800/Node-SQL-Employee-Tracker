const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool to access employee database
const pool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  database: 'employee_db',
});

module.exports = pool;