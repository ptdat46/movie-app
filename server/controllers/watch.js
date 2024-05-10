const mysql = require('mysql')
const connection = require('../connect');
const axios = require('axios');

const loadSource = async (req, res) => {
    let movieId = req.params.id;
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



module.exports = { loadSource }