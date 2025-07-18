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
	const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
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

async function insertName(name, meaning, categoryIds) {
	const {rows} = await pool.query(
		'INSERT INTO names (name, meaning) VALUES ($1, $2) RETURNING *',
		[name, meaning]
	);
	const insertedId = rows[0].id;

	if (categoryIds.length > 0) {
		const values = categoryIds.map((_, i) => `($1, $${i + 2})`).join(', ');
		const params = [insertedId, ...categoryIds.map((c) => parseInt(c))];

		await pool.query(
			`INSERT INTO name_categories (name_id, category_id) VALUES ${values}`,
			params
		);
	}
}

async function editCategory(id, name) {
	await pool.query('UPDATE categories SET name = ($1) WHERE id = ($2)', [name, id])
}

async function editName(id, name, meaning, categoryIds) {
	await pool.query('UPDATE names SET name = ($1), meaning = ($2) WHERE id = ($3)', [name, meaning, id]);

	await pool.query('DELETE FROM name_categories WHERE name_id = ($1)', [id]);

	if (categoryIds.length > 0) {
		const values = categoryIds.map((_, i) => `($1, $${i + 2})`).join(', ');
		const params = [id, ...categoryIds.map(Number)];

		await pool.query(
			`INSERT INTO name_categories (name_id, category_id) VALUES ${values}`,
			params
		);
	}
}

async function deleteCategory(id) {
	await pool.query('DELETE FROM name_categories WHERE category_id = $1', [id]);
	await pool.query('DELETE FROM categories where id = ($1)', [id]);	
}

module.exports = {
	getAllCategories,
	getAllNames,
	getAllNameByCategory,
	insertCategory,
	insertName,
	editCategory,
	editName,
	deleteCategory
};
