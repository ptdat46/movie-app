require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const connection = require('./connect.js')
const home = require('./routes/home.js')
const movie = require('./routes/movie.js')
const watch = require('./routes/watch.js')
const search = require('./routes/search.js')
const admin = require('./routes/admin.js')
const genres = require('./routes/genres.js')
const account = require('./routes/account.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


connection.connect((err) => {
	if (err) {
		console.log(err)
		throw err
	}
	console.log('Connected to sql server.')
})

app.use('/', home);
app.use('/movie', movie);
app.use('/watch', watch);
app.use('/search', search);
app.use('/', admin);
app.use('/genres', genres);
app.use('/account', account);

app.listen(5000, () => {
    console.log("server is listening on port 5000")
})