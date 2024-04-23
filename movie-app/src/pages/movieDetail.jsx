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
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`, top: "0",
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
                <div className="content-area">
                    <div className="poster-area">
                        <img className="movie-poster w-100 h-100" src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`} alt='movie'></img>
                        <button className="play-btn bg-danger">Xem phim</button>
                    </div>
                    <div className="detail-area">
                        <h3 className="detail-name text-white">{movieDetail.title}</h3>
                        <p className="detail-duration">{movieDetail.runtime} phút</p>
                        <div className="detail-information">
                            <span className="infor"><h6>Quốc gia:</h6>{movieDetail.origin_country}</span>
                            <span className="infor"><h6>Ngôn ngữ:</h6>{movieDetail.spoken_languages[0].english_name}</span>
                            <span className="infor"><h6>Ngày phát hành:</h6>{movieDetail.release_date}</span>
                            <span className="infor"></span>
                        </div>
                        <div className="overview"><h6>Overview</h6>{movieDetail.overview}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetail;