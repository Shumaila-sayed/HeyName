const { Router } = require('express');
const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => res.send('Category route!'));


module.exports = categoriesRouter;