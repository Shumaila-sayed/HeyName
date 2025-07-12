require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const categoriesRouter = require('./routes/categoriesRouter');
const namesRouter = require('./routes/namesRouter');
const indexRouter = require('./routes/indexRouter');

// for html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// for form
app.use(express.urlencoded({ extended: true }));

// for css - static assets
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use("/categories", categoriesRouter);
app.use("/names", namesRouter);
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`My first Express app - listening on port ${PORT}!`);
});
