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
    router.get("/", function (req, res) {
      res.json(data.results);
    })
  );

let movieid = ""
router.post("/:id", async function (req, res) {
  movieid = req.body.id;
  const [res1, res2, res3] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos`),
    axios.get(`http://api.themoviedb.org/3/movie/${movieid}/casts?api_key=e9e9d8da18ae29fc430845952232787c`),
    axios.get(`https://api.themoviedb.org/3/movie/${movieid}/similar?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`)
  ])
  const combinedData = {
    detail: res1.data,
    actors: res2.data,
    similar: res3.data,
  };

  res.json(combinedData);
})

module.exports = router;