import React from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  return (
    <div
      className={`header__wrapper ${
        location.pathname === "/saved-news" ? "header__black" : ""
      }`}
    >
      <div
        className={`header__logo ${
          location.pathname === "/saved-news" && !props.isMenuOpen
            ? "header__black"
            : ""
        }`}
      >
        NewsExplorer
      </div>
      <div className={`${props.isMenuOpen ? "header__container" : ""} ${props.loggedIn && props.isMenuOpen ? "header__container_full" : ""}`}>
        <Navigation
        isBackPopupOpen={props.isBackPopupOpen}
          isMenuOpen={props.isMenuOpen}
          prepareHamburger={props.prepareHamburger}
          isMobile={props.isMobile}
          onLogin={props.onLogin}
          loggedIn={props.loggedIn}
          setLoggedIn={props.setLoggedIn}
          onSignIn={props.onSignIn}
          username={props.username}
          setUsername={props.setUsername}
        />
      </div>
    </div>
  );
}
export default Header;
