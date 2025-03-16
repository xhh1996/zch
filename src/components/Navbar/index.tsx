import React, { useState, useEffect } from "react";
import "./style.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-logo">
          ZCH
        </a>
        <button
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <a
              href="#hero"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              关于
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              技能
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              经验
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              联系
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
