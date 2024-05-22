const express = require("express");
const router = express.Router();
const axios = require('axios');
const connection = require('../connect')

const getPopularMovies = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1");
  const movies = await response.json();
  return movies;
}

getPopularMovies()
  .then(data =>
    router.get("/popular", function (req, res) {
      res.json(data.results);
    })
  );

router.get('/top-rated', async (req, res) => {
  const data = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`)
  res.json(data.data);
})

let movieid = ""
router.post("/:id", async function (req, res) {
  movieid = req.body.id;
  let user_id = req.body.user_id;
  const [res1, res2, res3] = await Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos`),
    axios.get(`http://api.themoviedb.org/3/movie/${movieid}/casts?api_key=e9e9d8da18ae29fc430845952232787c`),
    axios.get(`https://api.themoviedb.org/3/movie/${movieid}/similar?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`)
  ])
  let res4 = {};
  getFavouriteInfo = function () {
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM movie_app.favourite WHERE movie_id = "${movieid}" and user_id = "${user_id}"`;
      connection.query(query, (err, data) => {
        if (err) reject(new Error("Error when get favourite infor"))
        else resolve(data);
      })
    })
  }

  getFavouriteInfo()
    .then(result => {
      const combinedData = {
        detail: res1.data,
        actors: res2.data,
        similar: res3.data,
        liked: result[0],
      };
      res.json(combinedData);
    })
    .catch(err => console.log(err));
})



module.exports = router;