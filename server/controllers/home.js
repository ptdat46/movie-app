const mysql = require('mysql')
const connection = require('../connect');
const md5 = require('md5');

const auth = (req, res) => {
    const user = req.body;
    if(user.isLoginForm == true) {
        const query = `select * from users where email = ? and password = ?`;
        connection.query(query, [user.email, md5(user.password)], (err, data) => {
            if(err) {
                return res.json("query error");
            }
            if(data.length > 0) {
                return res.json(data)               
            } else {
                return res.json("Incorrect email or password. Try again!")
            }
        })
    } else {
        const values = [
            user.email,
            md5(user.password),
        ]
      const query = `insert into users (email, password) values (?);`;
      connection.query(query, [values], (err, data) => {
        if(err) { 
            return res.json("Error when insert data in dtb");
        }
        return res.json("Sign up successfully");
      })
    }
}

module.exports = auth;