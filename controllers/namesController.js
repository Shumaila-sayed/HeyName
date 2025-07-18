const db = require('../db/queries');

const getNames = async (req, res) => {
	try {
		const names = await db.getAllNames();
		const categories = await db.getAllCategories();
		res.render('names', { names: names, categories: categories, category_name: "", category_id: 0 });
	} catch (error) {
		console.log(`error fetching names: `, error);
		res.status(500).send('error fetching names');
	}
};

const newNamePost = async (req, res) => {
	try {
		const { name, meaning, selectedCategories,  } = req.body;
		if (!name || !meaning || !selectedCategories) {
			res.status(404).send('Name, Meaning or Category Not Found');
			return;
		}

		const category_id = parseInt(req.body.category_id || 0);
		await db.insertName(name, meaning, selectedCategories);
		if (category_id === 0) {
			res.redirect('/names');
		} else if (category_id > 0){
			res.redirect(`/categories/${category_id}/names`);
		}
	} catch (error) {
		console.log(`error adding name: `, error);
		res.status(500).send('error adding name');
	}	
};
 
const updateName = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { name, meaning, selectedCategories } = req.body;
		const category_id = parseInt(req.body.category_id || 0);
		if (!name || !meaning || !selectedCategories) {
			res.status(404).send('Name, Meaning or Category Not Found');
			return;
		} 
		await db.editName(id, name, meaning, selectedCategories);
		if (category_id === 0) {
			res.redirect('/names');
		} else {
			res.redirect(`/categories/${category_id}/names`);
		}
	} catch (error) {
		console.log('Error updating name: ' + error);
		res.status(500).send('Error updating name');		
	}
};

const deleteName = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const category_id = parseInt(req.body.category_id || 0);
		await db.deleteName(id);
		if (category_id === 0) {
			res.redirect('/names');
		} else {
			res.redirect(`/categories/${category_id}/names`);
		}
	} catch (error) {
		console.log('Error deleting name: ', error);
		res.status(500).send('Error deleting name');		
	}
};

module.exports = {
	getNames,
	newNamePost,
	updateName,
	deleteName,
};
