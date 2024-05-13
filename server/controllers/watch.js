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
    let name = req.body.name;
    const values = [
        movieId,
        "completed",
        URL,
        name
    ]
    const query = `insert into movie_app.movies (id, status, source_url, movie_name) values (?);`;
    connection.query(query, [values], (err, data) => {
        if (err) {
            return res.json("Error when insert data in dtb");
        }
        return res.json("Update source movie successfully");
    })
}

const loadComments = (req, res) => {
    let movieId = req.params.id;
    const query = `SELECT comments.id, user_id, content, created, email FROM movie_app.comments join movie_app.users where user_id = users.id and movie_id = "${movieId}"`;
    connection.query(query, (err, data) => {
        if (err) console.log(err);
        else {
            res.json(data);
        }
    })
}

const updateComment = (req, res) => {
    let values = req.body;
    const query = `insert into movie_app.comments (user_id, movie_id, content) values ("${values.user_id}", "${values.movie_id}", "${values.content}");`;
    connection.query(query, (err, data) => {
        if (err) {
            return console.log("Error when insert data in dtb");
        }
    })
    const query2 = `SELECT user_id, content, created, email FROM movie_app.comments join movie_app.users where user_id = users.id 
    and movie_id = "${values.movie_id}" and content = "${values.content}" and user_id = "${values.user_id}" order by comments.created limit 1`;
    connection.query(query2, (err, data) => {
        if (err) {
            return console.log("Error when load comment")
        }
        else return res.json(data);
    })
}

const deleteComment = (req, res) => {
    let values = req.body.commentId;
    const query = `DELETE FROM comments WHERE id = '${values}';`;
    connection.query(query, (err, data) => {
        if (err) {
            return console.log(err);
        }
        return res.json("deleted")
    })
}

const addFavourite = (req, res) => {
    let values = req.body;
    let checked = false;
    const checkQuery = `Select id from movies where id = "${values.movie_id}"`;
    connection.query(checkQuery, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data.length > 0) {
            checked = true;
            if (checked) {
                const query = `INSERT INTO favourite (user_id, movie_id) values ("${values.user_id}", "${values.movie_id}")`;
                connection.query(query, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    return res.json("Successfully add this movie to your favourite")
                })
            } else res.json("Trailer video can not be added to favourite list")
        }
    })

}

module.exports = { loadSource, updateSource, loadComments, updateComment, deleteComment, addFavourite }