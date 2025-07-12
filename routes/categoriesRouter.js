const { Router } = require('express');
const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => res.send('Category route!'));

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.post('/', categoriesController.newCategoryPost);
categoriesRouter.put('/:id', categoriesController.updateCategory);
categoriesRouter.post('/:id', categoriesController.deleteCategory);


module.exports = categoriesRouter;