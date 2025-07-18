const db = require('../db/queries');

const getCategories = async (req, res) => {
	try {
		const categories = await db.getAllCategories();
		res.render('categories', { categories: categories });
	} catch (error) {
		console.log(`error fetching categories: `, error);
		res.status(500).send('error fetching categories');
	}
};

const getNamesByCategory = async (req, res) => {
	const id = parseInt(req.params.id);
	try {
		const [names, category_name] = await db.getAllNameByCategory(id);
		const categories = await db.getAllCategories();
		res.render('names', {
			names: names,
			category_name: category_name,
			categories: categories,
			category_id: id,
		});
	} catch (error) {
		console.log(`error fetching names: `, error);
		res.status(500).send('error fetching names');
	}
};

const newCategoryPost = async (req, res) => {
	try {
		const { category_name } = req.body;
		if (!category_name) {
			res.status(404).send('Category Name Not Found');
			return;
		}
		await db.insertCategory(category_name);
		res.redirect('/categories');
	} catch (error) {
		console.log('Error creating category: ', error);
		res.status(500).send('Internal Server Error');		
	}
};

const updateCategory = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { editCategory_name } = req.body;
		
		await db.editCategory(id, editCategory_name);
		res.redirect('/categories');
	} catch (error) {
		console.log('Error updating category: ', error);
		res.status(500).send('Internal Server Error');	
	}
};

const deleteCategory = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		await db.deleteCategory(id);
		res.redirect('/categories');
	} catch (error) {
		console.log('Error deleting category: ', error);
		res.status(500).send('Internal server error');
		
	}
};

module.exports = {
	getCategories,
	getNamesByCategory,
	newCategoryPost,
	updateCategory,
	deleteCategory,
};
