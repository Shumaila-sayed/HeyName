const db = require('../db/queries');

const getNames = async (req, res) => {
	try {
		const names = await db.getAllNames();
		res.send(names);
	} catch (error) {
		console.log(`error fetching names: `, error);
		res.status(500).send('error fetching names');
	}
};

const newNamePost = () => {};

const updateName = () => {};

const deleteName = () => {};

module.exports = {
	getNames,
	newNamePost,
	updateName,
	deleteName,
};
