const {query} = require('./index');

async function getAll() {
  const sql_query = 'SELECT * FROM lp_user';
  return await query(sql_query);
}

async function getById(id) {
  const sql_query = 'SELECT * FROM lp_user WHERE id = $1';
  return await query(sql_query, [id]);
}

async function getIdByEmail(email) {
  const sql_query = 'SELECT id FROM lp_user WHERE email = $1';
  return await query(sql_query, [email]);
}

async function getIdByUsername(username) {
  const sql_query = 'SELECT id FROM lp_user WHERE username = $1';
  return await query(sql_query, [username]);
}

async function getByEmailOrUsername(usernameOrEmail) {
  const sql_query = 'SELECT * FROM lp_user WHERE email = $1 OR username = $1';
  return await query(sql_query, [usernameOrEmail]);
}

async function add(username, email, password, role) {
  const sql_query = '                         \
		INSERT INTO                                \
		lp_user (username, email, password, role)   \
		VALUES ($1, $2, $3, $4)                      \
	';

  await query(sql_query, [username, email, password, role]);
}

async function updateById(id, username, email, password, role, confirmed) {
  const sql_query = ' \
		UPDATE lp_user \
		SET username = $2, email = $3, password = $4, role = $5, confirmed = $6 \
		WHERE id = $1 \
	';
  await query(sql_query, [id, username, email, password, role, confirmed]);
}

async function addPhoto(id, photo) {
  const sql_query = 'UPDATE lp_user SET photo = $2 WHERE id = $1';
  await query(sql_query, [id, photo]);
}

async function getPhoto(id) {
  const sql_query = 'SELECT photo FROM lp_user WHERE id = $1';
  return await query(sql_query, [id]);
}

async function resetPassword(id, password) {
  const sql_query = 'UPDATE lp_user SET password = $2 WHERE id = $1';
  await query(sql_query, [id, password]);
}

async function confirmEmail(id) {
  const sql_query = 'UPDATE lp_user SET confirmed = true WHERE id = $1';
  await query(sql_query, [id]);
}

async function deleteById(id) {
  const sql_query = 'DELETE FROM lp_user WHERE id = $1';
  await query(sql_query, [id]);
}

module.exports = {
  getAll,  // unused
  getById,
  getIdByEmail,
  getIdByUsername,
  getByEmailOrUsername,
  add,
  addPhoto,
  getPhoto,
  updateById,  // unused
  resetPassword,
  confirmEmail,
  deleteById
};