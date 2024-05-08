import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import '../css/movieDetail.css'
import ActorCard from '../components/actorCard'
import MoviesList from "../components/moviesList";

function MovieDetail() {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState(undefined);
    const [actors, setActors] = useState(undefined);
    const [similarMovies, setSimilarMovies] = useState(undefined);

    useEffect(() => {
        axios.post(`/movie/${id}`, { id })
            .then(res => {
                setMovieDetail(res.data.detail)
                setActors(res.data.actors.cast.slice(0,5))
                setSimilarMovies(res.data.similar.results)
            })
            .catch(error => console.log(error))
    }, []);

    const overlayStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Đây là lớp phủ màu đen với độ trong suốt 50%
        zIndex: "-2", // Đảm bảo lớp phủ nằm dưới nội dung
    };

    return (
        <div>
            {!!movieDetail && <div style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`,
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                position: "fixed",
                zIndex: "-1",
                backgroundSize: "cover",
            }}>
                <div style={overlayStyle}></div>
            </div>}
            <nav className="header navbar navbar-dark bg-dark p-3 justify-content-start">
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
            {!!movieDetail &&
                <div className="content-detail">
                    <div className="poster-area">
                        <img className="movie-poster w-100" src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`} alt='movie'></img>
                        <Link to={`/watch/${id}`} className="play-btn">Watch</Link>
                    </div>
                    <div className="detail-area">
                        <h1 className="detail-name text-white">{movieDetail.title}</h1>
                        <div className="detail-information mt-3">
                            <span className="infor">{movieDetail.runtime} minutes</span>
                            <span className="infor">Nation: {movieDetail.origin_country}</span>
                            <span className="infor">Language: {movieDetail.spoken_languages[0].english_name}</span>
                            <span className="infor">Release date: {movieDetail.release_date}</span>
                            <span className="infor">Genre:
                                {movieDetail.genres.map((genre, index) => (
                                    <a className="genre" href="/movie">{genre.name}</a>
                                ))}
                            </span>
                        </div>
                        <div className="overview mt-2">{movieDetail.overview}</div>
                        <div className="actors">
                            <span className="fw-semibold">Actors</span>
                            {!!actors && !!actors.map &&
                            <div className="actors-cards">
                                {actors.map((actor, index) => (
                                    <ActorCard actor = {actor} key = {index}/>
                                ))}
                            </div>
                            }
                        </div>
                        <div className="similar">
                            <div className="fw-semibold">Similar</div>
                            <MoviesList title= "similar" list = {similarMovies.slice(0,4)}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetail;