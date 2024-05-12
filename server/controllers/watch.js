const mysql = require('mysql')
const connection = require('../connect');
const axios = require('axios');

const loadSource = async (req, res) => {
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
    if (queryData.length > 0 && queryData[0].status == "completed") {
        res.json(queryData[0].source_url);
    } else if (data != undefined) res.json(`https://youtube.com/embed/${data.data.results[0].key}?autoplay=0;`);
}

const updateSource = (req, res) => {
    let movieId = req.body.id;
    let URL = req.body.sourceURL;
    const values = [
        movieId,
        "completed",
        URL
    ]
    const query = `insert into movies (id, status, source_url) values (?);`;
    connection.query(query, [values], (err, data) => {
        if(err) { 
            return res.json("Error when insert data in dtb");
        }
        return res.json("Update source movie successfully");
      })
}

const loadComments = (req, res) => {
    let movieId = req.params.id;
    const query = `SELECT user_id, content, created, email FROM movie_app.comments join movie_app.users where user_id = users.id and movie_id = "${movieId}"`;
    connection.query(query, (err, data) => {
        if(err) console.log(err);
        else {
            res.json(data);
        }
    })
}

const updateComment = (req, res) => {
    let values = req.body;

}

module.exports = { loadSource, updateSource, loadComments, updateComment }