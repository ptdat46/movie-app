import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import '../css/movie.css'
import MoviesList from "../components/moviesList";
import { Navigate } from "react-router-dom";
import Auth from "../components/auth";
import Navbar from "../components/navbar";

function Movie() {
    const [popularMovieList, setPopularMovieList] = useState(undefined);
    const [topratedList, setTopratedList] = useState([]);

    useEffect(() => {
        axios.get('/movie/popular')
            .then(data => {
                setPopularMovieList(data.data);
            })
            .catch(error => console.log(error))

        axios.get('/movie/top-rated')
            .then(data => {
                setTopratedList(data.data.results);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="main-div">
            <Auth/>
            <Navbar/>
            <div className="content">
            <h3 className="text-danger p-3">Popular</h3>
            {!!popularMovieList && 
                <MoviesList list = {popularMovieList.slice(0,12)}/>
            }
            <h3 className="text-danger p-3">Top rated</h3>
            {!!topratedList && 
                <MoviesList list = {topratedList.slice(0,12)}/>
            }
            </div>
        </div>
    )

}

export default Movie;