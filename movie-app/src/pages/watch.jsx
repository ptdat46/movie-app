import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import YouTube from 'react-youtube'
import '../css/watch.css'
import CommentCard from "../components/commentCard";
import Auth from "../components/auth";

function Watch() {
    const { id } = useParams();
    const [source, setSourceId] = useState('');
    const [sourceURL, setSourceURL] = useState('');
    var isAdmin = false;

    if (localStorage.getItem("user") === "admin@admin.com") {isAdmin = true}
    useEffect(() => {
        axios.post(`/watch/${id}`, { id })
            .then(res => setSourceId(res.data))
            //res.data.results[0].key
            .catch(error => console.log(error))
    }, [])

    const handleUpdate = () => {
        axios.post(`/watch/${id}/update`, {id, sourceURL})
            .then(res => {
                alert(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="movie-watch">
            <Auth />
            <nav className="header navbar navbar-dark bg-dark p-3 justify-content-start mb-3">
                <a className="navbar-brand text-danger" href="/movie">FilmNew</a>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/movie">Genres</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/setting">Account</a>
                    </li>
                </ul>
            </nav>
            <iframe className="video"
                title='Youtube player'
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                src={`${source}`}>
            </iframe>
            <div className="comment">
                <hr />
                <div className="comment-title text-white fw-semibold p-2">Comment</div>
                <div className="comment-area d-flex align-items-center m-3 flex-column">
                    <div className="comments-list">
                        <CommentCard user="Ptdat" content="Phim hay xuất sắc lmao lmao bruh bruh" />
                    </div>
                    <div className="comment-input">
                        <textarea placeholder="Comment here" maxLength="400" rows="4"></textarea>
                        <input type="submit" name="send" value="send" />
                    </div>
                </div>
            </div>
            {isAdmin && <form className="text-white p-2">
                    <h5>Add source video for movie</h5>
                    <div class="mb-2 d-flex">
                        <label class="form-label">Movie Id</label>
                        <input type="text" class="form-control" value={id} />
                    </div>
                    <div class="mb-2 d-flex">
                        <label class="form-label">Movie Source URL</label>
                        <input type="text" class="form-control" placeholder="Fill the URL here" 
                            onChange={(event) => setSourceURL(event.target.value)}/>
                    </div>
                    <button type="button" class="btn btn-danger" onClick={handleUpdate}>Save</button>
                </form>
            }
        </div>
    )
}

export default Watch;