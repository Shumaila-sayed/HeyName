const { Router } = require('express');
const indexRouter = Router();
const indexController = require("../controllers/indexControllers");


indexRouter.get('/', indexController.getIndexPage);

module.exports = indexRouter;