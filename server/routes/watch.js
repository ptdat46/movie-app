const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post('/:id', async (req, res) => {
    let movieId = req.body.id;
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e9e9d8da18ae29fc430845952232787c`)
    res.json(data.data);
})

module.exports = router;