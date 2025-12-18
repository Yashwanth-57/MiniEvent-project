import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false); //  ADDED

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(logout());
    setMenuOpen(false); //  close menu on logout
    navigate("/");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Eventify
        </Link>
      </div>

      {/* Hamburger (Mobile) */}
      <div
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className={`navbar-link ${isActive("/login")}`}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={`navbar-link ${isActive("/register")}`}
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className={`navbar-link ${isActive("/dashboard")}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/my-events"
              className={`navbar-link ${isActive("/my-events")}`}
              onClick={() => setMenuOpen(false)}
            >
              My Events
            </Link>

            <Link
              to="/joined-events"
              className={`navbar-link ${isActive("/joined-events")}`}
              onClick={() => setMenuOpen(false)}
            >
              Joined Events
            </Link>

            <Link
              to="/profile"
              className={`navbar-link ${isActive("/profile")}`}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
