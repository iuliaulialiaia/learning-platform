const {query} = require('./index');

async function add(token, user_id) {
  const sql_query = 'INSERT INTO password_reset (token, user_id) VALUES ($1, $2)';
  await query(sql_query, [token, user_id]);
}

async function deleteByUserId(userId) {
  const sql_query = 'DELETE FROM password_reset WHERE user_id = $1';
  await query(sql_query, [userId]);
}

module.exports = {
  add,
  deleteByUserId
}