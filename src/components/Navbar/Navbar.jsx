import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      (!buttonRef.current || !buttonRef.current.contains(event.target))
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>
          <Link to="/" className="link-react">
            Platzi
          </Link>
        </h1>
      </div>

      <ul ref={menuRef} className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <Link to="/profile" className="link-react">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link-react">
            Cart
          </Link>
        </li>
        <li>
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
        </li>
      </ul>

      <button
        ref={buttonRef}
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
};

export default Navbar;
