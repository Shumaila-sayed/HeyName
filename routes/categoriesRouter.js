const { Router } = require('express');
const categoriesRouter = Router();
const categoriesController = require('../controllers/categoriesController')

//categoriesRouter.get('/', (req, res) => res.send('Category route!'));

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.get('/:id/names', categoriesController.getNamesByCategory);

categoriesRouter.post('/', categoriesController.newCategoryPost);
categoriesRouter.put('/:id', categoriesController.updateCategory);
categoriesRouter.delete('/:id', categoriesController.deleteCategory);


module.exports = categoriesRouter;