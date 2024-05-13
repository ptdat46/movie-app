const Navbar = () => {
    return (
        <nav className="header navbar navbar-dark bg-dark p-3 justify-content-start">
                <a className="navbar-brand text-danger" href="/movie">FilmNew</a>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/genres">Genres</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-light" href="/setting">Account</a>
                    </li>
                </ul>
            </nav>
    )
}

export default Navbar;