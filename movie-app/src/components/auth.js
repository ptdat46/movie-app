import { Outlet, Link, Navigate } from "react-router-dom";

const Auth = () => {
    var isLogged = false;
    if(localStorage.getItem("user") != null) isLogged=true;
    if(isLogged == false) return <Navigate to="/"/>
    return (
        <Outlet/>
    )
}

export default Auth;