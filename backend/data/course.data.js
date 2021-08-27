const {query} = require('./index');

async function getAll() {
  const sql_query = 'SELECT * FROM course';
  return await query(sql_query);
}

async function getBySearch(search) {
  const sql_query = 'SELECT * FROM course WHERE (title ~* $1 OR subtitle ~* $1)';
  return await query(sql_query, [search]);
}

async function getCategories() {
  const sql_query = 'SELECT unnest(enum_range(NULL::category))::text';
  return await query(sql_query);
}

async function getByCategory(category) {
  const sql_query = 'SELECT * FROM course WHERE category = $1';
  return await query(sql_query, [category]);
}

async function add(title, subtitle, category, description) {
  const sql_query = 'INSERT INTO course (title, subtitle, category, description) VALUES ($1, $2, $3, $4)';
  await query(sql_query, [title, subtitle, category, description]);
}

module.exports = {
  getAll,
  getBySearch,
  getByCategory,
  getCategories,
  add
};