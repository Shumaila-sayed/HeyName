const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => res.send('Hello, world!'));

module.exports = indexRouter;