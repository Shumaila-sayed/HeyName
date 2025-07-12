const { Client } = require('pg');
const { argv } = require('node:process');

const SQL = `
-- Create tables
CREATE TABLE IF NOT EXISTS names (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  meaning TEXT
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS name_categories (
  id SERIAL PRIMARY KEY,
  name_id INTEGER REFERENCES names(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE(name_id, category_id)
);

-- Insert categories
INSERT INTO categories (name)
VALUES 
  ('Animals'),
  ('Fictional'),
  ('Modern'),
  ('Arabic'),
  ('Nature'),
  ('Japanese')
ON CONFLICT (name) DO NOTHING;

-- Insert names
INSERT INTO names (name, meaning)
VALUES 
  ('Simba', 'Lion'),
  ('Ayaan', 'Gift of God'),
  ('Sakura', 'Cherry Blossom');

-- Insert name-category relationships
-- Simba (id=1): Animals (id=1), Fictional (id=2)
-- Ayaan (id=2): Modern (id=3), Arabic (id=4)
-- Sakura (id=3): Nature (id=5), Japanese (id=6)

INSERT INTO name_categories (name_id, category_id)
VALUES 
  (1, 1), (1, 2),
  (2, 3), (2, 4),
  (3, 5), (3, 6)
ON CONFLICT DO NOTHING;
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: argv[2],
		
	});

	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('✅ Done seeding!');
}

main();
