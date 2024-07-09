require('dotenv').config();
const express = require('express');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

console.log(process.env.PG_PASSWORD);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool({
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  database: 'employee_db',
});

pool.connect();

// Hardcoded query: DELETE FROM employee_db WHERE id = 3;
pool.query(`DELETE FROM employee_db WHERE id = $1`, [3], (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
pool.query('SELECT * FROM employee_db', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
