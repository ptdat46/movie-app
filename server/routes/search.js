const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post('/:query', async (req, res) => {
    const query = req.params.query;
    //console.log(query);
    const data = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=e9e9d8da18ae29fc430845952232787c&include_adult=true&language=en-US&page=1`)
    res.json(data.data)
})

module.exports = router;