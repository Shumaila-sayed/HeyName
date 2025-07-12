const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getAllNames() {
    const { rows } = await pool.query('SELECT * FROM names');
    return rows;
}

module.exports = {
    getAllCategories, getAllNames
}