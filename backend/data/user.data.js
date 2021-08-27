const {query} = require('./index');

async function get(id) {
  const sql_query = 'SELECT * FROM _user WHERE id = $1';
  return await query(sql_query, [id]);
}

async function getByUsernameOrEmail(usernameOrEmail) {
  const sql_query = 'SELECT * FROM _user WHERE email = $1 OR username = $1';
  return await query(sql_query, [usernameOrEmail]);
}

async function getIdByEmail(email) {
  const sql_query = 'SELECT id FROM _user WHERE email = $1';
  return await query(sql_query, [email]);
}

async function getIdByUsername(username) {
  const sql_query = 'SELECT id FROM _user WHERE username = $1';
  return await query(sql_query, [username]);
}

async function add(username, email, password) {
  const sql_query = 'INSERT INTO _user (username, email, password) VALUES ($1, $2, $3)';
  await query(sql_query, [username, email, password]);
}

async function updatePassword(id, password) {
  const sql_query = 'UPDATE _user SET password = $2 WHERE id = $1';
  await query(sql_query, [id, password]);
}

async function updateConfirmed(id) {
  const sql_query = 'UPDATE _user SET confirmed = true WHERE id = $1';
  await query(sql_query, [id]);
}

async function updateImageType(id, type) {
  const sql_query = 'UPDATE _user SET image_type = $2 WHERE id = $1';
  await query(sql_query, [id, type]);
}

async function _delete(id) {
  const sql_query = 'DELETE FROM _user WHERE id = $1';
  await query(sql_query, [id]);
}

module.exports = {
  get,
  getByUsernameOrEmail,
  getIdByEmail,
  getIdByUsername,
  add,
  updatePassword,
  updateConfirmed,
  updateImageType,
  _delete
};