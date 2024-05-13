import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { Link } from "react-router-dom";
import { history } from "../config/history";
import Auth from "../components/auth";
import Navbar from "../components/navbar";
import '../css/genres.css'

function Genres() {
    const [isActive, setActive] = useState({
        active: '',
    });
    const handleGenre = (event) => {
        const clicked = event.target.id;
        if(isActive.active === clicked) {
            setActive({active: ''})
        } else {
            setActive({active: clicked});
        }
    }
    
    return (
        <div className="genres-main-div">
            <Auth/>
            <Navbar/>
            <div className="genres-list text-white">
                <div className="genres-group">
                <div className="genre-item"><button id="1" className={isActive.active === '1' ? "active" : ""} onClick={(event) => handleGenre(event)}>Action</button></div>
                <div className="genre-item"><button id="2" className={isActive.active === "2" ? "active" : ""} onClick={handleGenre}>Adventure</button></div>
                <div className="genre-item"><button id="3" className={isActive.active === "3" ? "active" : ""} onClick={handleGenre}>Animation</button></div>
                <div className="genre-item"><button id="4" className={isActive.active === "4" ? "active" : ""} onClick={handleGenre}>Comedy</button></div>
                <div className="genre-item"><button id="5" className={isActive.active === "5" ? "active" : ""} onClick={handleGenre}>Crime</button></div>
                <div className="genre-item"><button id="6" className={isActive.active === "6" ? "active" : ""} onClick={handleGenre}>Documentary</button></div>
                <div className="genre-item"><button id="7" className={isActive.active === "7" ? "active" : ""} onClick={handleGenre}>Drama</button></div>
                <div className="genre-item"><button id="8" className={isActive.active === "8" ? "active" : ""} onClick={handleGenre}>Family</button></div>
                <div className="genre-item"><button id="9" className={isActive.active === "9" ? "active" : ""} onClick={handleGenre}>Fantasy</button></div>
                </div>
                <div className="genres-group">
                <div className="genre-item"><button id="10" className={isActive.active === "10" ? "active" : ""} onClick={handleGenre}>History</button></div>
                <div className="genre-item"><button id="11" className={isActive.active === "11" ? "active" : ""} onClick={handleGenre}>Horror</button></div>
                <div className="genre-item"><button id="12" className={isActive.active === "12" ? "active" : ""} onClick={handleGenre}>Music</button></div>
                <div className="genre-item"><button id="13" className={isActive.active === "13" ? "active" : ""} onClick={handleGenre}>Mystery</button></div>
                <div className="genre-item"><button id="14" className={isActive.active === "14" ? "active" : ""} onClick={handleGenre}>Romance</button></div>
                <div className="genre-item"><button id="15" className={isActive.active === "15" ? "active" : ""} onClick={handleGenre}>Science Fiction</button></div>
                </div>
                <div className="genres-group">
                <div className="genre-item"><button id="16" className={isActive.active === "16" ? "active" : ""} onClick={handleGenre}>TV Movie</button></div>
                <div className="genre-item"><button id="17" className={isActive.active === "17" ? "active" : ""} onClick={handleGenre}>Thriller</button></div>
                <div className="genre-item"><button id="18" className={isActive.active === "18" ? "active" : ""} onClick={handleGenre}>War</button></div>
                <div className="genre-item"><button id="19" className={isActive.active === "19" ? "active" : ""} onClick={handleGenre}>Western</button></div>
                </div>
            </div>
        </div>
    )
}

export default Genres;