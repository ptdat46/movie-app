import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import { Link } from "react-router-dom";
import '../css/movieDetail.css'
import ActorCard from '../components/actorCard'
import MoviesList from "../components/moviesList";
import Auth from "../components/auth";
import Navbar from "../components/navbar";

function MovieDetail() {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState(undefined);
    const [actors, setActors] = useState(undefined);
    const [similarMovies, setSimilarMovies] = useState(undefined);
    const [liked, setLiked] = useState(false);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        axios.post(`/movie/${id}`, { id, user_id })
            .then(res => {
                setMovieDetail(res.data.detail)
                setActors(res.data.actors.cast.slice(0, 5))
                setSimilarMovies(res.data.similar.results)
                if (res.data.liked.user_id == user_id && res.data.liked.movie_id == id) setLiked(true);
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

    const deleteFav = () => {
        axios.post("/account/delete-fav", { user_id, id })
            .then(res => {
                alert(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Auth />
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
            <Navbar />
            {!!movieDetail &&
                <div className="content-detail">
                    <div className="poster-area">
                        <img className="movie-poster w-100" src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`} alt='movie'></img>
                        <Link to={`/watch/${id}/${movieDetail.title}`} className="play-btn">Watch</Link>
                    </div>
                    <div className="detail-area">
                        <h1 className="detail-name text-white">{movieDetail.title}</h1>
                        {liked &&
                            <div className="dropdown-fav">
                                <button type="button" class="like-btn btn btn-secondary mt-0 dropdown-toggle d-flex align-items-center"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                >
                                    <img className="like-icon" src={require("../public/heart.png")} />
                                    Favourite Movie
                                </button>
                                <ul className="dropdown-menu bg-secondary text-white" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item text-white" href="/account">Go to Favourite List</a></li>
                                    <li><button className="dropdown-item text-white" onClick={deleteFav}>Delete this movie from Favourite List</button></li>
                                </ul>
                            </div>
                        }
                        <div className="detail-information mt-1">
                            <span className="infor">{movieDetail.runtime} minutes</span>
                            <span className="infor">Nation: {movieDetail.origin_country}</span>
                            <span className="infor">Language: {movieDetail.spoken_languages[0].english_name}</span>
                            <span className="infor">Release date: {movieDetail.release_date}</span>
                            <span className="infor">Genre:
                                {movieDetail.genres.map((genre, index) => (
                                    <a className="genre" href="/genres">{genre.name}</a>
                                ))}
                            </span>
                        </div>
                        <div className="overview mt-2">{movieDetail.overview}</div>
                        <div className="actors">
                            <span className="fw-semibold">Actors</span>
                            {!!actors && !!actors.map &&
                                <div className="actors-cards">
                                    {actors.map((actor, index) => (
                                        <ActorCard actor={actor} key={index} />
                                    ))}
                                </div>
                            }
                        </div>
                        <div className="similar">
                            <div className="fw-semibold">Similar</div>
                            <MoviesList title="similar" list={similarMovies.slice(0, 4)} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetail;