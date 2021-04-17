const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB
});

async function query(sql, params) {
  const start = Date.now();
  const {rows} = await pool.query(sql, params);
  const duration = Date.now() - start;
  const statement = sql.split(' ')[0].toUpperCase();
  console.log(`${statement} Query took ${duration} and returned ${rows.length} rows.`);
  return rows;
}

module.exports = {
  query
};