const express = require("express");
const router = express.Router();
const axios = require('axios');

const getPopularMovies = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1");
  const movies = await response.json();
  return movies;
}

getPopularMovies()
  .then(data => 
    router.get("/movie", function (req, res) {
    res.json(data.results);
    })
    );

let movieid = ""
router.post("/movie/:id", async function(req, res) {
    movieid = req.body.id;
    //console.log(movieid)
    await axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos
    `)
      .then(
        data => res.json(data.data)
      )
      .catch(error => console.log(error))
    await axios.get(`http://api.themoviedb.org/3/movie/${movieid}/casts?api_key=e9e9d8da18ae29fc430845952232787c`)
      .then(
        data => 
      )
})

module.exports = router;