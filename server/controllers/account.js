const mysql = require('mysql')
const connection = require('../connect');

const UserData = (req, res) => {
	const query = `SELECT ...;`
	connection.query(query, (err, data) => {
		if (err) return res.json(err);
		else {
			return res.json(data);
		}
	})
}

module.exports = {UserData}