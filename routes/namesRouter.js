const { Router } = require('express');
const namesRouter = Router();

namesRouter.get('/', (req, res) => res.send('name route!'));


module.exports = namesRouter;