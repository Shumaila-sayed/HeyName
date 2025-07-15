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
		res.render('names', { names: names, category_name: category_name });
	} catch (error) {
		console.log(`error fetching names: `, error);
		res.status(500).send('error fetching names');
	}
};

const newCategoryPost = () => {};

const updateCategory = () => {};

const deleteCategory = () => {};

module.exports = {
	getCategories,
	getNamesByCategory,
	newCategoryPost,
	updateCategory,
	deleteCategory,
};
