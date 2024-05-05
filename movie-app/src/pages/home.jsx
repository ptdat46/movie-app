import React from "react";
import { useEffect, useState } from "react";
import axios from '../api/posts'
import '../css/home.css'
import { Link } from "react-router-dom";
import { history } from "../config/history";

function Home() {
    // const [data, setData] = useState({});

    // useEffect(() => {
    //     axios.get('/home')
    //         .then(data => {
    //             setData(data.data);
    //         })
    // }, []);
    // console.log(data);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isLoginForm, setLoginForm] = useState(true);
    
    const toggleLoginForm = () => {
        setLoginForm(!isLoginForm);
    }

    const handleLogin = () => {
        history.push('/movie');
    }
    return (
        <div className="main-div">
            <div className="login-form">
                <div className="form-title text-secondary">{isLoginForm ? "Sign in" : "Sign up"}</div>
                <div>
                    <form className="form text-white">
                        <div className="form-group text-white mb-2">
                            <label className="mb-1" for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group text-white mb-2">
                            <label className="mb-1" for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" 
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        {!isLoginForm && <div className="form-group text-white mb-2">
                            <label className="mb-1" for="exampleInputPassword1">Re-Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Re-Password" 
                                value={rePassword} onChange={(event) => setRePassword(event.target.value)}
                            />
                        </div>}
                        <button type="submit" className="btn btn-primary mb-2 w-100" onClick={handleLogin}><strong>{isLoginForm ? "Sign in" : "Sign up"}</strong></button>
                        <button className="toggle-btn" type="button" onClick={toggleLoginForm}>{isLoginForm ? "Sign up" : "Sign in"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home