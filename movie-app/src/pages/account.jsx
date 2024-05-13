import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import { Link, useParams } from "react-router-dom";
import { history } from "../config/history";
import Auth from "../components/auth";
import Navbar from "../components/navbar";
import MoviesList from "../components/moviesList";
import '../css/account.css';

function Account() {
    const [favourite, setFavourite] = useState([]);
    const user_id = localStorage.getItem("user_id");
    useEffect(() => {
        axios.post('/account', { user_id })
            .then(res => {
                console.log(res.data);
                setFavourite(res.data);
                console.log(favourite);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="account-main-div">
            <Auth />
            <Navbar />
            <div className="account-content">
                <h4>{`Hello, ${localStorage.getItem("user")}`}</h4>
                <h3 className="text-danger overflow-hidden">Favourite</h3>
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Movie Name</th>
                            <th scope="col">Movie ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!favourite &&
                            favourite.map((movie, index) => (
                                <tr>
                                    <th scope="row"><a className="text-decoration-none"href={`/movie/${movie.movie_id}`}>{movie.movie_name}</a></th>
                                    <td>{movie.movie_id}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="btn btn-danger my-2">Log out</button>
            </div>
        </div>
    )
}

export default Account;