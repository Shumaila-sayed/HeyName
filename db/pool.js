const { pool } = require("pg");

module.exports = new Pool({
	connectionString: process.env.DATABASE_URL
});