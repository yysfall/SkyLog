import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        SkyLog
      </Link>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/observations">Observations</Link>
      </div>
    </nav>
  );
}

export default Navbar;