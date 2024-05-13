import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import "../css/admin.css"
import UserCard from '../components/admin.userCard';
import Navbar from "../components/navbar";
import Search from "./search";

function Admin() {
    const img = {
        cursor: "pointer"
    }
    const [usersList, setUsersList] = useState(undefined);
    useEffect(() => {
        axios.get("/admin")
            .then(data => {
                setUsersList(data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="admin-main-div">
            <Navbar/>
            <div className="body">
                <div className="user-content bg-dark">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Delete</th>
                                <th scope="col"><img src={require("../public/refresh.png")} onClick={() => window.location.reload()} style={img} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!usersList && usersList.map((user, index) => (
                                <UserCard user={user} key={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Admin;