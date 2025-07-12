const { Router } = require('express');
const namesRouter = Router();
const namesController = require("../controllers/namesController")

// namesRouter.get('/', (req, res) => res.send('name route!'));

// all names and by category and search
namesRouter.get('/', namesController.getNames);

namesRouter.post('/', namesController.newNamePost);
namesRouter.put('/:id', namesController.updateName);
namesRouter.delete('/:id', namesController.deleteName);


module.exports = namesRouter;