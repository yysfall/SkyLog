import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark" />

          <span>
            <span className="brand-name">SkyLog</span>
            <span className="brand-subtitle">
              Personal Sky Journal
            </span>
          </span>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            to="/observations"
            className={
              location.pathname.startsWith("/observations")
                ? "active"
                : ""
            }
          >
            Observations
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;