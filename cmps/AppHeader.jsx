const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header">
            <div className="logo">
                <Link to="/" className="logo-link">LOGO</Link>
            </div>
            <nav className="nav-links">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
                <NavLink to="/about" className="nav-link">
                    About
                </NavLink>
                <NavLink to="/mail" className="nav-link">
                    Mail
                </NavLink>
                <NavLink to="/note" className="nav-link">
                    Note
                </NavLink>
                <NavLink to="/book" className="nav-link">
                    Book
                </NavLink>
            </nav>
        </header>
    );
}
