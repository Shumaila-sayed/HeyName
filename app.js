require('dotenv').config();
const express = require('express');
const app = express();

// for html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello, world!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`My first Express app - listening on port ${PORT}!`);
});
