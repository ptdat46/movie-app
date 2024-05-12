const connection = require('../connect');

const usersList = (req, res) => {
    const query = `Select * from users where email <> "admin@admin.com" `;
    connection.query(query, (err, data) => {
        if (err) return res.json(err);
        else {
            res.json(data);
        }
    })
}

const Delete = (req, res) => {
    const user = req.body;
    const query = `DELETE FROM users WHERE id='${user.id}';`;
    connection.query(query, (err, data) => {
        if(err) return res.json(err);
        else {
            res.json("Delete user successfully");
        }
    })
}
module.exports = {usersList, Delete}