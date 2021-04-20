const {query} = require('./index');
const {hash, compare} = require('../password');
const {createToken} = require('../jwt');

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

async function add(username, email, plainPassword, role) {
  const sql_query = '                         \
		INSERT INTO                                \
		lp_user (username, email, password, role)   \
		VALUES ($1, $2, $3, $4)                      \
	';
  const hashedPassword = await hash(plainPassword);
  await query(sql_query, [username, email, hashedPassword, role]);
}

async function login(email, password) {
  const sql_query = 'SELECT * FROM lp_user WHERE email = $1';
  const users = await query(sql_query, [email]);

  if (users.length === 0 ) {
    throw new Error(`Email not found.`);
  }
  const user = users[0];

  const matched = await compare(password, user.password);
  if(!matched) {
    throw new Error(`Wrong password.`);
  }

  const payload = {
    id: user.id,
    role: user.role
  };
  return createToken(payload);
}

async function updateById(id, username, email, password, role, confirmed) {
  const sql_query = ' \
		UPDATE lp_user \
		SET username = $2, email = $3, password = $4, role = $5, confirmed = $6 \
		WHERE id = $1 \
	';
  await query(sql_query, [id, username, email, password, role, confirmed]);
}

async function resetPassword(id, plainPassword) {
  const sql_query = 'UPDATE lp_user SET password = $2 WHERE id = $1';
  const hashedPassword = await hash(plainPassword);
  await query(sql_query, [id, hashedPassword]);
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
  add,
  login,
  updateById,  // unused
  resetPassword,
  confirmEmail,
  deleteById
};