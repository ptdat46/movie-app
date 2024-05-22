const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get('/:genreId/:page', async (req, res) => {
    const genreId = req.params.genreId
    const page = req.params.page;
    const data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e9e9d8da18ae29fc430845952232787c&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`)
    res.json(data.data);
})

module.exports = router;