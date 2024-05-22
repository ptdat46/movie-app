import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { Link, useParams } from "react-router-dom";
import { history } from "../config/history";
import Auth from "../components/auth";
import Navbar from "../components/navbar";
import MoviesList from "../components/moviesList";
import '../css/genres.css'


function Genres() {
    const [isActive, setActive] = useState({
        active: '28',
    });
    const [moviesList, setMoviesList] = useState([]);
    const [page, setPage] = useState(1);
    const handleGenre = (event) => {
        const clicked = event.target.id;
        if (isActive.active === clicked) {
            setActive({ active: '' })
        } else {
            setPage(1);
            setActive({ active: clicked });
        }
    }

    const handlePage = (page) => {
        setPage(page);
    }

    useEffect(() => {
        axios.get(`/genres/${isActive.active}/${page}`)
            .then(res => {
                setMoviesList(res.data.results)
            })
            .catch(err => console.log(err))
    }, [isActive, page])

    return (
        <div className="genres-main-div">
            <Auth />
            <Navbar />
            <div className="genres-list text-white">
                <div className="genres-group">
                    <div className="genre-item"><button id="28" className={isActive.active === '28' ? "active" : ""} onClick={(event) => handleGenre(event)}>Action</button></div>
                    <div className="genre-item"><button id="12" className={isActive.active === "12" ? "active" : ""} onClick={handleGenre}>Adventure</button></div>
                    <div className="genre-item"><button id="16" className={isActive.active === "16" ? "active" : ""} onClick={handleGenre}>Animation</button></div>
                    <div className="genre-item"><button id="35" className={isActive.active === "35" ? "active" : ""} onClick={handleGenre}>Comedy</button></div>
                    <div className="genre-item"><button id="80" className={isActive.active === "80" ? "active" : ""} onClick={handleGenre}>Crime</button></div>
                    <div className="genre-item"><button id="99" className={isActive.active === "99" ? "active" : ""} onClick={handleGenre}>Documentary</button></div>
                    <div className="genre-item"><button id="18" className={isActive.active === "18" ? "active" : ""} onClick={handleGenre}>Drama</button></div>
                    <div className="genre-item"><button id="10751" className={isActive.active === "10751" ? "active" : ""} onClick={handleGenre}>Family</button></div>
                    <div className="genre-item"><button id="14" className={isActive.active === "14" ? "active" : ""} onClick={handleGenre}>Fantasy</button></div>
                </div>
                <div className="genres-group">
                    <div className="genre-item"><button id="36" className={isActive.active === "36" ? "active" : ""} onClick={handleGenre}>History</button></div>
                    <div className="genre-item"><button id="27" className={isActive.active === "27" ? "active" : ""} onClick={handleGenre}>Horror</button></div>
                    <div className="genre-item"><button id="10402" className={isActive.active === "10402" ? "active" : ""} onClick={handleGenre}>Music</button></div>
                    <div className="genre-item"><button id="9648" className={isActive.active === "9648" ? "active" : ""} onClick={handleGenre}>Mystery</button></div>
                    <div className="genre-item"><button id="10749" className={isActive.active === "10749" ? "active" : ""} onClick={handleGenre}>Romance</button></div>
                    <div className="genre-item"><button id="878" className={isActive.active === "878" ? "active" : ""} onClick={handleGenre}>Science Fiction</button></div>
                </div>
                <div className="genres-group">
                    <div className="genre-item"><button id="10770" className={isActive.active === "10770" ? "active" : ""} onClick={handleGenre}>TV Movie</button></div>
                    <div className="genre-item"><button id="53" className={isActive.active === "53" ? "active" : ""} onClick={handleGenre}>Thriller</button></div>
                    <div className="genre-item"><button id="10752" className={isActive.active === "10752" ? "active" : ""} onClick={handleGenre}>War</button></div>
                    <div className="genre-item"><button id="37" className={isActive.active === "37" ? "active" : ""} onClick={handleGenre}>Western</button></div>
                </div>
            </div>
            {!!moviesList &&
                <MoviesList list={moviesList.slice(0, 40)} />
            }
            <nav>
                <ul class="pagination">
                    <li className={page == 1 ? "page-item active" : "page-item"}><a className="page-link" href="#" onClick={() => handlePage(1)}>1</a></li>
                    <li className={page == 2 ? "page-item active" : "page-item"}><a className="page-link" href="#" onClick={() => handlePage(2)}>2</a></li>
                    <li className={page == 3 ? "page-item active" : "page-item"}><a className="page-link" href="#" onClick={() => handlePage(3)}>3</a></li>
                    <li className={page == 4 ? "page-item active" : "page-item"}><a className="page-link" href="#" onClick={() => handlePage(4)}>4</a></li>
                    <li className={page == 5 ? "page-item active" : "page-item"}><a className="page-link" href="#" onClick={() => handlePage(5)}>5</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Genres;