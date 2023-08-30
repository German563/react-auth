import React from "react";
import gitLogo from "../../src/images/github.svg";
import facebookLogo from "../../src/images/iconmonstr-facebook-6.svg";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${location.pathname === "/saved-news" ? "footer_saved-news" : ""}`}>
      <p className="footer__copyright">
        © {currentYear} Supersite, Powered by News API
      </p>

      <div className="footer__wrapper">
        <div className="footer__links">
          <a href="/" >
            <p className="footer__link">Home</p>
          </a>
          <a href="https://tripleten.com/" target="_blank" rel="noopener noreferrer">
            <p className="footer__link">Tripleten</p>
          </a>
        </div>
        <div className="footer__icons">
          <a href="https://github.com/German563" target="_blank" rel="noopener noreferrer">
            <img src={gitLogo} className="footer__logo" alt="gitLogo" />
          </a>
          <a href="https://www.facebook.com/unitedgerman" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} className="footer__logo" alt="facebookLogo" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;