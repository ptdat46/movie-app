import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import "../css/admin.css"
import UserCard from '../components/admin.userCard';

function Admin() {
    const img = {
        cursor: "pointer"
    }
    const [usersList, setUsersList] = useState(undefined);
    const [isUserForm, setUserForm] = useState(true);

    const toggleForm = () => {
        setUserForm(!isUserForm);
    }
    useEffect(() => {
        axios.get("/admin")
            .then(data => {
                setUsersList(data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="admin-main-div">
            <nav className="admin-header navbar navbar-dark bg-dark p-3 justify-content-start">
                <a className="navbar-brand text-danger" href="/admin">Admin</a>
                <ul className="nav nav-pills">
                    <li className={`nav-item user-comp ${isUserForm ? "active" : ""}`} onClick={toggleForm}>
                        <a className="nav-link text-light">User</a>
                    </li>
                    <li className={`nav-item movie-comp ${!isUserForm ? "active" : ""}`} onClick={toggleForm}>
                        <a className="nav-link text-light ">Movies</a>
                    </li>
                </ul>
            </nav>
            <div className="body">
                {isUserForm && <div className="user-content bg-dark">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Delete</th>
                                <th scope="col"><img src ={ require("../public/refresh.png")} onClick={() => window.location.reload()} style={img}/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!usersList && usersList.map((user, index) => (
                                <UserCard user={user} key = {index}/>
                            ))}
                        </tbody>
                    </table>
                </div>}
                {!isUserForm && 
                    <div className="movie-content bg-dark">
                        
                    </div>
                }
            </div>
        </div>
    )
}

export default Admin;