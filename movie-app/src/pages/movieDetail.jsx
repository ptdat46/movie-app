import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { useParams } from 'react-router';
import '../css/movieDetail.css'

function MovieDetail() {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState(undefined);
    useEffect(() => {
        axios.post(`/movie/${id}`, { id })
            .then(res => {
                setMovieDetail(res.data)
            })
            .catch(error => console.log(error))
    }, []);

    const overlayStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Đây là lớp phủ màu đen với độ trong suốt 50%
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
                <a className="navbar-brand text-danger" href="/movie">PhimNew</a>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/movie">Tìm kiếm</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/movie">Phim hot</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/setting">Tài khoản</a>
                    </li>
                </ul>
            </nav>
            {!!movieDetail &&
                <div className="content-detail">
                    <div className="poster-area">
                        <img className="movie-poster w-100 h-100" src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`} alt='movie'></img>
                        <button className="play-btn bg-danger">Xem phim</button>
                    </div>
                    <div className="detail-area">
                        <h1 className="detail-name text-white">{movieDetail.title}</h1>
                        <div className="detail-information mt-3">
                            <span className="infor">{movieDetail.runtime} minutes</span>
                            <span className="infor">Nation: {movieDetail.origin_country}</span>
                            <span className="infor">Language: {movieDetail.spoken_languages[0].english_name}</span>
                            <span className="infor">Release date: {movieDetail.release_date}</span>
                            <span className="infor"></span>
                        </div>
                        <div className="overview mt-2">{movieDetail.overview}</div>
                        <div className="actors">Actors
                            <span className="actor-infor">
                                <img className="actor-pic" src={``}></img>
                            </span>
                            <span className="actor-infor"></span>
                            <span className="actor-infor"></span>
                            <span className="actor-infor"></span>
                            <span className="actor-infor"></span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetail;