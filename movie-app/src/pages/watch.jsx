import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import YouTube from 'react-youtube'
import '../css/watch.css'
import CommentCard from "../components/commentCard";

function Watch() {
    const { id } = useParams();
    const [trailerId, setTrailerId] = useState('');
    useEffect(() => {
        axios.post(`/watch/${id}`, { id })
            .then(res => setTrailerId(res.data.results[0].key))
            .catch(error => console.log(error))
    }, [])
    return (
        <div className="movie-watch">
            <nav className="header navbar navbar-dark bg-dark p-3 justify-content-start">
                <a className="navbar-brand text-danger" href="/movie">FilmNew</a>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/movie">Hot</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/setting">Account</a>
                    </li>
                </ul>
            </nav>
            <iframe className='video'
                title='Youtube player'
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                src={`https://youtube.com/embed/${trailerId}?autoplay=0`}>
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
                        <input type="submit" name="send" value="send"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch;