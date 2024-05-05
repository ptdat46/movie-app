import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { Link } from "react-router-dom";
import '../css/search.css'
import MoviesList from "../components/moviesList";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [moviesList, setMoviesList] = useState(undefined);
    const HandleSearch = (searchQuery) => {
            axios.post(`/search/${searchQuery}`, searchQuery)
                .then(res => setMoviesList(res.data.results))
                .catch(err => console.log(err))
    }
    return (
        <div className="main-search">
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
                        <a className="nav-link text-light" href="/account">Account</a>
                    </li>
                </ul>
            </nav>
            <div className="search-box">
                <input class="search-input me-1" type="search" placeholder="Search for movie" aria-label="Search"
                    value={searchQuery} onChange = {(event) => setSearchQuery(event.target.value)}/>
                <button class="search-btn text-white btn-outline-white" type="submit" onClick={() => HandleSearch(searchQuery)}>Search</button>
            </div>
            <div className="movies-list">
            {!!moviesList && 
                <MoviesList list = {moviesList}/>
            }
            </div>
        </div>
    )
}

export default Search;