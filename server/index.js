const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const connection = require('./connect.js')
const home = require('./routes/home.js')
const movie = require('./routes/movie.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


// connection.connect((err) => {
// 	if (err) {
// 		console.log(err)
// 		throw err
// 	}
// 	console.log('Connected to sql server.')
// })
app.use('/', home);
app.use('/', movie);

app.listen(5000, () => {
    console.log("server is listening on port 5000")
})