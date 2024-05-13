import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { Link } from "react-router-dom";
import '../css/search.css'
import MoviesList from "../components/moviesList";
import Auth from "../components/auth";
import Navbar from "../components/navbar";

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
            <Auth/>
            <Navbar/>
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