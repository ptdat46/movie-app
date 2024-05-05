import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import '../css/movie.css'
import MoviesList from "../components/moviesList";

function Movie() {
    const [popularMovieList, setPopularMovieList] = useState(undefined);

    useEffect(() => {
        axios.get('/movie')
            .then(data => {
                setPopularMovieList(data.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="main-div">
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
            <div className="content">
            <h3 className="text-danger p-3">Popular</h3>
            {!!popularMovieList && 
                <MoviesList list = {popularMovieList.slice(0,12)}/>
            }
            <a href="/popular-movie" style={{alignContent: "flex-end"}}>More</a>
            </div>
        </div>
    )

}

export default Movie;