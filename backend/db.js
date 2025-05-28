const { Pool } = require('pg');
require('dotenv').config();

// console.log(process.env.DATABASE_URL_SESSION_POOLER);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_SESSION_POOLER,
  ssl: {
    rejectUnauthorized: false,  // required for Supabase
  },
});

module.exports = pool;
