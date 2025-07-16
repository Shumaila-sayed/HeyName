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

const newNamePost = async (req, res) => {
	try {
		const { name, meaning, selectedCategories } = req.body;
		if (!name || !meaning || !selectedCategories) {
			res.status(404).send('Name, Meaning or Category Not Found');
			return;
		}
		await db.insertName(name, meaning, selectedCategories);
		res.redirect('/categories');
	} catch (error) {
		console.log(`error adding name: `, error);
		res.status(500).send('error adding name');
	}	
};

const updateName = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { name, meaning, selectedCategories } = req.body;
		if (!name || !meaning || !selectedCategories) {
			res.status(404).send('Name, Meaning or Category Not Found');
			return;
		} 
		await db.editName(id, name, meaning, selectedCategories);
		res.redirect('/categories');
	} catch (error) {
		console.log('Error updating name: ' + error);
		res.status(500).send('Error updating name');		
	}
};

const deleteName = () => {};

module.exports = {
	getNames,
	newNamePost,
	updateName,
	deleteName,
};
