const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require("../connect");

router.post('/', (req, res) => {
    const value = req.body.user_id;
    const query = `SELECT user_id, movie_id, movie_name FROM favourite join movies WHERE movies.id = favourite.movie_id and user_id = "${value}"`;
    connection.query(query, (err, data) => {
        if(err) console.log(err);
        else res.json(data);
    })
})

router.post('/delete-fav', (req, res) => {
    const user_id = req.body.user_id;
    const movie_id = req.body.id;
    const query = `DELETE FROM movie_app.favourite WHERE user_id = "${user_id}" AND movie_id = "${movie_id}"`
    connection.query(query, (err, data) => {
        if(err) res.json(err);
        else res.json("Remove succesfully");
    })
})

module.exports = router;