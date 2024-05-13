const Navbar = () => {
    const is_admin = localStorage.getItem("is_admin");

    return (
        <nav className="header navbar navbar-dark bg-dark p-3 justify-content-start">
                <a className="navbar-brand text-danger" href="/movie">{is_admin == "1" ? "Admin site" : "Filmnew"}</a>
                <ul className="nav nav-pills">
                    {is_admin && <li className={`nav-item user-comp`}>
                        <a className="nav-link text-light" href="/admin">User</a>
                    </li>}
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/genres">Genres</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/account">Account</a>
                    </li>
                </ul>
            </nav>
    )
}

export default Navbar;