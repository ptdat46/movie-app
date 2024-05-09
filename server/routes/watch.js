const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require('../connect');

router.post('/:id', async (req, res) => {
    let movieId = req.body.id;
    const query = `select * from movies where id = '${movieId}';`;
    let queryData = {};
	connection.query(query, async (err, data) => {
		if (err) return res.json(err);
		else {
			queryData = await data; 
		}
	})
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e9e9d8da18ae29fc430845952232787c`)
    if(queryData != {} && queryData[0].status == "completed") {
        res.json(queryData[0].source_url);
    } else res.json(`https://youtube.com/embed/${data.data.results[0].key}?autoplay=0;`);
})

module.exports = router;