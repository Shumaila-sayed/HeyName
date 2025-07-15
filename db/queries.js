const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM categories');
	return rows;
}

async function getAllNames() {
	const { rows } = await pool.query('SELECT * FROM names');
	return rows;
}

async function getAllNameByCategory(id) {
	const result = await pool.query('SELECT name FROM categories WHERE id = $1', [
		id,
	]);
	const category_name = result.rows[0].name;

	const { rows } = await pool.query(
		'SELECT n.* FROM names n JOIN name_categories nc ON n.id = nc.name_id WHERE nc.category_id = $1',
		[id]
	);
	return [rows, category_name];
}

async function insertCategory(name) {
	await pool.query('INSERT INTO categories (name) VALUES ($1)', [name]);
}

module.exports = {
	getAllCategories,
	getAllNames,
	getAllNameByCategory,
	insertCategory
};
