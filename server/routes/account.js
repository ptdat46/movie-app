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

module.exports = router;